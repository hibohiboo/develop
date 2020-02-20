## 安全なウェブアプリケーションの作り方


## セキュリティガイドライン

[安全なウェブサイトの作り方](https://www.ipa.go.jp/security/vuln/websecurity.html)
[日本語版 OWASP Top 10 2017](https://www.owasp.org/images/2/23/OWASP_Top_10-2017%28ja%29.pdf)
[OWASP Top 10](https://owasp.org/www-project-top-ten/)

## 実習環境

### ダウンロード先
[実習用仮想マシン](https://wasbook.org/download/)

### hostsファイルの編集

C:\Windows\System32\drivers\etc\hostsファイルを、右クリックから管理者権限で実行したメモ帳で開いて以下を追記。

```
192.168.56.101 example.jp api.example.net trap.example.com
```

|||
|:--|:--|
|example.jp      |脆弱性のあるサイト（アプリケーション）|
|api.example.net |脆弱性のあるサイト（別ドメインのAPI)|
|trap.example.com|攻撃者が管理する罠のサイト|

* 疎通確認
```
ping example.jp
ping api.example.ne
ping trap.example.com
```

### OWASP ZAPのインストール

[ZAP](https://owasp.org/www-project-zap/)
[ZAP Download](https://www.zaproxy.org/download/)

## Webセキュリティの基礎

### 秘密情報のやり取りにGETを使わない理由
* URL上に指定されたパラメータがReferer経由で外部に漏れる
* URL上に指定されたパラメータがアクセスログに残る
* URL上に指定されたパラメータがブラウザのアドレスバーに表示され、他人に除かれる
* パラメータつきのURLを利用者がSNSなどで共有してしまう

### セッションIDをクッキーに保存する際に、注意すべき属性
* Domain
  * 使用しない場合、クッキーを生成したサーバにのみクッキーが送信される。これが最も安全。
* secure
  * HTTPS通信のみサーバに送信
* HttpOnly
  * JavaScriptからアクセスできない。
  * クロスサイト・スクリプティングへの対応となるが、完全に阻止はできない。
  * php.iniに`session.cookie_httponly=On`を追加。

### ブラウザのセキュリティ ～サンドボックス～ Javascriptで制限されていること
* ローカルファイルへのアクセスの禁止
* プリンタなどの資源の利用禁止
* ネットワークアクセスの制限（同一オリジンポリシー）
### JavaScript以外のクロスドメインアクセス
* JSONPでは公開情報のみを提供する。

### CORS (Cross-Oeigin-Resource Sharing)
#### シンプルなリクエスト
* 「シンプルなリクエスト」の場合、相手側の許可なしに異なるオリジンにリクエスト可能
##### シンプルなリクエストの条件
* メソッドは以下のいずれか
  * GET
  * HEAD
  * POST
* `XMLHttpRequest`オブジェクトの`setRequestHeader`メソッドで設定するリクエストヘッダは以下に限る
  * Accept
  * Accept-Language
  * Content-Language
  * Content-Type
    * application/x-www-form-urlencoded
    * multipart/form-data
    * text/plain

#### プリフライトリクエスト
* 「シンプルなリクエスト」でない場合、プリフライトが必要
  * 例えばリクエストに`Content-Type: application/json`を送りたいとき

##### プリフライトとは
* 「シンプルなリクエスト」でない場合、ブラウザがリクエストに、以下を含める

```diff
Accept-Language: ja,en-US;q=0.7,en;q=0.3
+ Access-Control-Request-Method: POST
+ Access-Control-Request-Headers: content-type
Referer: http://example.jp/33/33-003.html
+ Origin: http://example.jp
```

* これを受け取ったAPIは、`Access-Control-Request-Method`と`Access-Control-Request-Headers`に返事をする必要がある

|要求の種類|リクエスト|レスポンス|
|:--|:--|:--|
|メソッドに対する許可|Access-Control-Request-Method|Access-Control-Allow-Methods|
|ヘッダに対する許可|Access-Control-Request-Headers|Access-Control-Allow-Headers|
|オリジンに対する許可|ORIGIN|Access-Control-Allow-Origin|

```php
<?php
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if($_SERVER['HTTP_ORIGIN'] === 'http://example.jp') {
      header('Access-Control-Allow-Origin: http://example.jp');
      header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
      header('Access-Control-Allow-Headers: Content-Type');
      header('Access-Control-Max-Age: 1728000');
      header('Content-Length: 0');
      header('Content-Type: text/plain');
    } else {
      header('HTTP/1.1 403 Access Forbidden');
      header('Content-Type: text/plain');
      echo "このリクエストは継続できません";
    }
  } else {
  die('Invalid Request');
}

```

#### 認証情報を含むリクエスト
* HTTP認証やクッキーなどのリクエストヘッダは、デフォルトではクロスオリジンに対するリクエストでは含まれない
* 呼び出すときに`withCredentials`が必要

```diff
  var req = new XMLHttpRequest();
  req.open('GET', 'http://api.example.net/33/33-006.php');
+  req.withCredentials = true;
```

* これを受け取るAPIでもwithCredentialsの対応が必要

```diff
<?php
  session_start();
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: http://example.jp');
+  header('Access-Control-Allow-Credentials: true');
```

## Webアプリケーションの機能別にみるセキュリティバグ
### ヌルバイト攻撃
* `http://wxample.jp/test.php?p=1%00<script>alert('XSS')</script>`
* `%00`がヌルバイト。数字のみのバリデーションを潜り抜ける

```php
<?php
  $p = $_GET['p'];
  if (ereg('^[0-9]+$', $p) === FALSE) {
    die('整数値を入力してください');
  }
```

### 正規表現

```php
<?php
  $p = filter_input(INPUT_GET, 'p');
  if (preg_match('/\A{a-z0-9}{1,5}\z/ui', $p) !== 1) {
```

* u修飾子
  * 日本語環境でpreg_match関数を用いる場合は、UTF-8エンコーディングであることを表すu修飾子を指定する
* i修飾子
  * 大文字小文字を区別しないでマッチングするときに便利
* 全体一致は\Aと\zで示す
  * \Aはデータの戦闘
  * \zはデータの末尾
  * 以下は全体一致なら誤り
    * ^ は行頭
    * $ は行末

### script要素のXSS

* 以下のソースは、最初の`</script>`でscript要素は終了してしまう。
  * script要素の終端は、JavaScriptの文脈を一切考慮しないため。

```html
  <script>
    foo('</script>');
  </script>
```

* `</script>`が以下の入力だった場合、XSS攻撃が可能となる

```html
<script>
  foo('</script><script>alert(document.cookie)//');
</script>
```

### 参考
[教科書に載らないwebアプリケーションセキュリティ](https://www.atmarkit.co.jp/fcoding/index/webapp.html)
[キヌガワマサト氏のブログ](https://masatokinugawa.l0.cm/2018/01/regex-domxss.html)

## SQLインジェクション

### 静的プレースホルダと動的プレースホルダでは静的プレースホルダのほうが安全
* 静的プレースホルダはＤＢ内でバインドする
* 動的プレースホルダはライブラリ内でバインドする


### LIKEによるあいまい検索のワイルドカードのエスケープ
* SQLインジェクションと混同されやすいが別物
* _や%を文字として検査する場合は、ワイルドカードのエスケープをする必要がある
  * 例えば、%を含むnameを検索したい場合は、`WHERE name LIKE '%#%%' ESCAPE '#'`
* DBによって、エスケープする文字は違う

## クロスサイトリクエストフォージェリ（CSRF）
* ログインした利用者のアカウントによる「重要な処理」を実行させられる脆弱性
  * クレジットカードでの決済
  * メール送信
  * パスワード変更
* CSRF脆弱性の影響は、アプリケーションの「重要な処理」の悪用に限られる
  * 被害者の個人情報を盗むことはできない※
    * ※パスワードを変更させられた結果盗まれることはある
### 発生個所
* クッキーのみでセッション管理が行われている
* HTTP認証、TLSクライアント認証のみで利用者の識別が行われている


### 対策

|    |トークン埋め込み|パスワード再入力|Referer確認|
|:--|:--|:--|:--|
|開発工数|中（重要な処理の前のページに埋込、セッションで保存した値と比較）|中|小（重要な処理のページのみ|
|利用者への影響|なし|パスワード入力の手間|Refererをオフにしている利用者が使えなくなる(Firewall設定など）|
|推奨する利用シーン|一般的であらゆる場面で推奨|成りすまし対策、確認を強く求める要件があるとき|利用者の環境を限定できる既存アプリのCSRF対策|

## クリックジャッキング
* 透明なフォームを被せる方法

### 対策
`X-Frame-Options`をレスポンスヘッダに指定する。
`DENY`(拒否)
`SAMEORIGIN`(同一生成元に限り許可) frameを使っている場合

* 必ず指定すべきページは「重要な処理」の１つ手前の入力フォームだが、全てのページで`X-Frame-Options`を出力しても問題ない。

## セッションID固定攻撃

* セッションIDを外部から固定する
* 攻撃者は、ある程度時間が経った頃を見計らい、セッションに保存された情報を盗み見るなどできる
* 成りすましではないため、攻撃の影響は利用者が入力した情報の漏洩に限定される

#### セッションアダプション
* 未知のセッションIDを受け入れる特性。勝手に作成したセッションIDも受け入れる。
  * PHP
  * ASP.NET
* セッションアダプションがないアプリケーションでも、攻撃者は自分でログインすることにより、有効なセッションIDを手に入れることができる
  * ID固定攻撃は行える

#### 脆弱性の原因
* 多くの攻撃手法があり、全てへの対応は困難

#### 対策
* 1. 認証後にセッションIDを変更する
* 2. 1がでいない場合、ログイン時にトークンを生成し、クッキーとセッションに記憶させる
* ログイン前にセッション変数を使わないようにする

## オープンリダイレクト
* 任意のドメインにリダイレクトできる脆弱性
* 利用者が知らないうちに別ドメインに移動させられ、フィッシング詐欺にあう可能性

### 原因
* リダイレクト先のURLを外部から指定できる
* リダイレクト先のドメイン名のチェックがない

### オープンリダイレクトが差支えない場合
* もともと外部のドメインに遷移する仕様であること
* 利用者にとって外部ドメインに遷移することが自明であること

バナー広告など。

### 対策
* リダイレクト先のURLを固定にする
* リダイレクト先のURLを直接指定せず、番号指定にする
* リダイレクト先のドメインをチェックする
  * 正規表現はバグを含める可能性が大きいので、これは最後の手段

## クッキーとセッション

* 一般にクッキーに情報を保存しないほうがよい
* セキュア属性は基本的につけるべき。
   * これをつけていると、HTTPSの場合のみブラウザからサーバに送信される。

### クッキーとセッション変数の比較

|          |クッキー|セッション|
|:--       |:--     |:--       |
|使いやすさ|APIにより設定、取得|変数とほぼ同じように扱える|
|配列やオブジェクトの格納|アプリケーション側で文字列に変換する必要あり|通常の変数同様に代入可能な場合が多い|
|サイズの制限|厳しい制限あり|実用上は無制限|
|利用者による格納情報の直接参照|容易|不可能|
|脆弱性などでクッキー漏洩した際の情報漏洩しやすさ|データ漏洩|漏洩のしにくさを制御可能|
|利用者によるデータ改変|容易|不可能|
|第三者によるデータ改変|XSSやHTTPヘッダ・インジェクションなどの脆弱性があれば可能|クッキーを改変できる脆弱性があってもセッション変数は改変不可|
|情報の寿命の制御|容易|セッション限り|
|異なるサーバとの情報共有|ドメインが同じであれば可能|基本的に不可能|

### HTTPSのときのクッキーにセキュア属性がつけられない場合の対応
* トークンを付与する
#### トークンにより安全性が確保できる理由
* トークンは認証成功時に一度だけサーバーから出力される
* トークンはHTTPSのページで生成される（サーバーからブラウザ）
* トークンは確実に暗号化されてブラウザから送信される（ブラウザ→サーバ）
* HTTPSのページを閲覧するにはトークンが必要

トークンがサーバとブラウザの双方向で確実に暗号化されること、HTTPSのページを閲覧するには
第三者の知りえないトークンが必要であることから、安全性が確保される。






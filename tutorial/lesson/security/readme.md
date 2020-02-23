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

## ファイルアップロードにまつわる問題

### 脆弱性が生まれる原因
以下の両方を満たす
* アップロードしたファイルが公開ディレクトリに保存される
* アップロード後のファイル名として、.php, .asp, .jsp など、サーバスクリプトを示す拡張子が指定できる。

### 対策
* 非公開ディレクトリに保存し、ダウンロードスクリプト経由で表示


## ファイルダウンロードによるクロスサイトスクリプティング

### 脆弱性が生まれる原因
* 間違ったContent-Typeは、ブラウザがコンテンツをHTMLとして解釈してしまう可能性がある
  * IEは拡張子で判断する
  * 例えば、ダウンロードスクリプトのPATH_INFO(※)にa.htmlなどを指定されるとIEでは脆弱性となる

PATH_INFO： 「リクエストされたスクリプトファイル名」と「クエリ文字列」の間にあるパスの情報

### 対策
* ファイルのContent-Typeを正しく設定する
* レスポンスヘッダ `X-ContentType-Options: nosniff` を指定する
  * サーバ側の共通設定で行える
* ダウンロードを想定したファイルには、レスポンスヘッダとして`Content-Disposition:attachment`を指定する
  * `Content-Type: application/octet-stream`にすると、ファイルタイプが「ダウンロードすべきファイル」と明示できる
  * `Content-Disposition:attachment; filename="hogehoge.pdf"` ： `Content-Disposition`ヘッダのオプション属性filenameはファイルを保存する際のデフォルトのファイル名を指示
* PDFを扱う場合は、後述の対策を合わせて実施

## PDFのFormCalcによるコンテンツハイジャック
* PDFはFormCalcと呼ばれるスクリプト言語が使用できる
  * URL関数という機能があり、HTTPリクエストを呼び出し、結果を受け取ることができる

### 脆弱性
* 罠に埋め込まれたPDFのFormCalcスクリプトから、exmaple.jpにHTTPリクエストが送信
* この際、ブラウザが保持しているexample.jpのクッキーをAdobe Readerが引き継ぐ形で、罠ページに秘密情報を送信する

* 罠に用いるHTMLとPDFは以下のサイトでPoC(Proof of Concent: [概念実証コード](https://securityblog.jp/words/4306.html))としてAGPLライセンスで公開されている
  * https://github.com/nccgroup/CrossSiteContentHijacking

### 対策
* PDFファイルはブラウザ内で開かずダウンロードを強制する
  * `X-Download-Options: noopen`
* PDFをobject要素やembed要素では開けない仕組みを実装する
  * ファイルダウンロードをPOSTに限定する

## ファイルインクルード攻撃
* 非公開ファイルの漏洩
* 外部から指定したスクリプトの実行
  * RFI(Remote File Inclusion)が有効になっている場合
  * ファイルのアップロードが可能なサイト
  * セッション変数の保存先としてファイルを使用しているサイト


## キャッシュに関する問題

### Cache-Control
* 脆弱性のあるレスポンスヘッダ

```
Date: Tue, 17 Apr 2018 01:51:07 GMT
Cache-Control: public ,max-age=60
Expires: Tue, 17 Apr 2018 04:22:05 GMT
 ```

Cache-Controlヘッダのキャッシュ方法の種類（ディレクティブ）

|ディレクティブ|意味|
|:--|:--|
|no-store|まったくキャッシュしない|
|no-cache|キャッシュの有効性を毎回サーバに確認する|
|private|1人のユーザのためのキャッシュを許可する。典型的にはブラウザのキャッシュは許可するが、キャッシュサーバのキャッシュは許可しない|
|public|すべてのキャッシュを保存してよい|
|must-revalidate|リソースを使う前にキャッシュが陳腐化していないことを確認する|
|max-age|リソースが陳腐化していないと考えられる最長時間（秒）|

#### キャッシュサーバの設定不備
nginxの設定

```diff
location /4f3/ {
  proxy_cache zonei;
  proxy_cache_valid 200 302 180s;
+  proxy_ignore_headers Cache-Control Expires Set-Cookie;
  proxy_set_header Host $host;
  proxy_pass http://localhost:88/4f/;
}
```

* キャッシュ制御の際に、レスポンスヘッダ`Cache-Control Expires Set-Cookie`を無視する。
  * アプリケーション側で正しく設定しても、キャッシュサーバ(nginx)は無視してキャッシュの内容を表示する

### 対応

* アプリケーション側でキャッシュ制御用の適切なレスポンスヘッダを設定する
* キャッシュサーバ側で、キャッシュ制御の適切な設定を行う

#### アプリケーション側

```
Cache-Control: private, no-store, no-cache, must-revalidate
Pragma: no-cache
```

* `Pragma: no-cache`はHTTP/1.1に非対応の古いソフトウェア向けの伝統的な手法

#### キャッシュサーバ側
* nginxの場合、`proxy_ignore_headers`を削除

#### URLに乱数値を付与する
* ブラウザやキャッシュサーバ、CDNのキャッシュ実装に差異があり、予想外の事故が発生する場合がある
これを防ぐ方法として、クエリ文字列に乱数値を付与する方法がある

```
http://example.jp/mypage.php?rnd=34413940
```

ただし、以下の問題点がある。

* キャッシュ自体はされてしまうのでキャッシュ用ストレージの無駄遣いとなる
* なんらかの理由でURLを知られるとキャッシュを閲覧されるリスクがある

## Web API実装における脆弱性

### JSONとは
* JavaScriptのオブジェクトリテラルの形式をデータ交換形式に発展させたもの
* 基本的にはJavaScriptの式として解釈できる

### JSONPとは
* JavaScriptのXMLHttpRequestはもともと同一オリジンポリシーの制約があり、異なるオリジンからのデータを取得できない問題があった。
* この問題を解決するために、CORSが規定された
* JSONPはCORS制定前に、同一オリジンポリシーの枠内で、異なるオリジンのサーバからデータを取得するために考案された方法の１つ
* XMLHttpRequestを使わず、script要素を用いて、外部のJavaScriptを直接実行する
  * そのために、JSONO文字列そのままではscript要素で受け取れないため、関数呼び出しの形でデータを生成する

#### JSONPの例

* サーバ側

```php
<?php
  $callback = $_GET['callback'];
  $json = json_encode(array('time'=>date('G:i')));
  header('Content-Type: text/javascript; charset=utf-8');
  echo "$callback($json);";

```

* クライアント側

* プレーンな呼び出し
```html
<body>
  <script>
    function display_time(obj) {
      var txt = document.createTextNode('時刻は' + obj.time + 'です');
      var p = document.getElementById('time');
      p.appendChild(txt);
    }
  </script>
  <p id="time"></p>
  <script src="http://api.exmaple.net/test.php?callback=display_time"></script>
</body>
```

* jqueryでの呼び出し
  * jqueryの内部でscript要素が動的に生成される

```html
<body>
  <script src="../js/jquery-3.2.1.min.js"></script>
  <p id="time"></p>
  <script>
    function display_time(obj) {
      $('time').text('時刻は' + obj.time + 'です');
    }
    $.ajax({
      url: 'http://api.exmaple.net/test.php?callback=display_time',
      dataType: 'jsonp',
      jsonpCallback: 'display_time'
    });
  </script>
</body>
```

### JSONエスケープの不備

#### 攻撃手法と影響

* サーバ

```php
<?php
  $zip = $_GET['zip'];
  // 郵便番号が見つからなかったとき
  $json = '{"message": "郵便番号が見つかりません:' . $zip . '"}';
  header('Content-Type: text/javascript; charset=utf-8');
  echo "callback_zip($json);";

```

* クライアント

```html
<body>
  <script src="../js/jquery-3.2.1.min.js"></script>
  <p id="message"></p>
  <script>
    $.ajax({
      url: 'http://api.exmaple.net/test2.php?zip=' + location.hash.slice(1),
      dataType: 'jsonp',
      jsonpCallback: 'callback_zip'
    }).done(function(data){
      $('#message').text(data.message);
    });
  </script>
</body>
```

* 攻撃例
```
http://example.jp/test2.html#1"%2balert(document.domain)%2b"
```

#### 脆弱性がうまれる原因
以下の2つの条件がそろうこと

* JSON文字列の生成時に適切なエスケープ処理などが行われていない
* JSONの評価にeval関数などを用いているか、JSONPを用いている


#### 対策

* 文字列連結によるJSONデータ生成をやめ、信頼できるライブラリを用いてJSONを生成する
* eval関数ではなくJSON.parseなどの安全なAPIでJSONOを解釈する

### JSON直接閲覧によるXSS

#### 攻撃手法と影響
* サーバ側
  * 本来、MIMEタイプは`application/json`であるべきだが、その指定を怠っている
  * 実際のMIMEタイプはPHPがデフォルトとして`text/html`を返す

```php
<?php 
  $zip=$_GET['zip'];
  // 以下は郵便番号が見つからなかったときの処理
  echo json_encode(array("message"=>"郵便番号が見つかりません:" . $zip));

```

以下のURLでアクセス

```
http://exmaple.jp/test3.php?zip=<img+src=1+onerror=alert(document.domain)>
```

#### 脆弱性が生まれる原因
* このレスポンスをHTMLとして解釈しようとする
* img要素により、画像を表示しようとする
* src=1は存在せずにエラーとなり、onerrorイベントとしてJavaScriptが実行される

#### 対策
* MIMEタイプをしっかり指定する
```php
  header('Content-Type: text/javascript; charset=utf-8');
```
* レスポンスヘッダX-Content-Options: nosniffを出力
  * MIMEタイプを厳密に判定するという指令
```php
header('X-Content-Type-Options: nosniff');
```

* IE7以前では、PATH_INFOに`a.html`を入れることによってjs実行可能。古いブラウザの対応をするかはポリシーしだい。
  * 簡単にある程度の対応ができ、副作用のない方法としてエスケープが考えられる.PHPではjson_encodeのオプションパラメータで設定可能。
```php
<?php 
  $zip=$_GET['zip'];
  // 以下は郵便番号が見つからなかったときの処理
  header('Content-Type: text/javascript; charset=utf-8');
  header('X-Content-Type-Options: nosniff');
  echo json_encode(array("message"=>"郵便番号が見つかりません:" . $zip), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);

```

json_encodeのオプションパラメータ

|オプション|エスケープ対象文字|エスケープ結果
|:--           |:-- |:--|
| JSON_HEX_TAG | < | \u003C |
| JSON_HEX_TAG | > | \u003E |
| JSON_HEX_AMP | & | \u0026 |
| JSON_HEX_APOS| ' | \u0029 |
| JSON_HEX_QUOT| " | \u0022 |

* XMLHttpRequestなどCORS対応の機能だけから呼び出せるようにする
  * JQueryなどの著名なライブラリは、XMLHttpRequestによるHttpリクエストに、以下のリクエストヘッダを自動的に付与する
```
X-Requested-With: XMLHttpRequest
```

```html
<body>
  <script src="../js/jquery-3.2.1.min.js"></script>
  <p id="message"></p>
  <script>
    $.ajax({
      url: 'http://api.exmaple.net/test2.php?zip=' + location.hash.slice(1),
      dataType: 'json',
    }).done(function(data){
      $('#message').text(data.message);
    });
  </script>
</body>
```

この`X-Requested-With`ヘッダを積極的に活用する方法がある。
* このヘッダはXMLHttpRequestから送信されるリクエストには付与され、script要素などXMLHttpRequest経由以外からのアクセスには付与されない。
* その違いにより、不正なリクエストをチェックする
* JSONハイジャックの対策にもなるので実施を勧める

```php
if (empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
  header('HTTP/1.1 403 Forbidden');
  die ("不正な呼び出しです");
}
```

### JSONPのコールバック関数名によるXSS

#### 脆弱性が生まれる原因
* 外部から指定されたコールバック関数名を検証しないでそのまま表示している
* MIMEタイプをtext/javascriptとするところをtext/htmlとしている

#### 対策
* コールバック関数の文字種と文字数を制限する

```php
$callback = $_GET['callback'];
if ( preg_match('/\A[_a-z][_a-z0-9]{1,64}\z/i', $callback) !== 1)) {
  header('HTTP/1.1 403 Forbidden');
  die ("コールバック関数名が不正です");
}
```

### Web APIのクロスサイトリクエストフォージェリ

#### 対策
* CSRFトークン（セッション変数にトークンを保持)
* 二重送信クッキー
* カスタムリクエストヘッダによる対策
* 入力データのMIMEタイプ(application/jsonなど)を検証
* CORSを適切に実装

##### CSRFトークン
* 乱数によるトークンをセッション変数に保存
* hiddenパラメータなどで送信し、受取側でセッション変数と比較

API呼出のjavascriptにトークンを渡す方法が問題になる。
* Webページにhiddenパラメータやカスタム属性で保持し、JavaScriptから参照する
* CSRFトークンを返すAPIを用意する
  * トークンを返すAPIはCORSに対応せず、同一オリジンポリシーの制約がある状態とする

###### 実装例
* サーバ側: トークンを返すAPI

```php
<?php
  session_start();
  if (empty($_SESSION['mail'])) {
    $_SESSION['mail']   = 'secret@example.jp';
  }
  if (empty($_SESSION['token'])) { // トークンがなければ生成する
    $token = bin2hex(openssl_random_pseudo_bytes(24));
    $_SESSION['token'] = $token;
  }
  // メールアドレス、トークンをJSONで返す
  header('Content-Type: application/json; charset=UTF-8');
  $json = json_encode(array(
    'mail'   => $_SESSION['mail'],
    'token'  => $_SESSION['token']));
  echo $json;

```

* サーバ側： メールアドレスを変更するAPI

```php
<?php
  session_start();
  if (empty($_SESSION['mail'])) {
    header('HTTP/1.1 403 Forbidden');
    die('ログインが必要です');
  }
  $json = file_get_contents('php://input');
  $array = json_decode($json, true);
  $token = $_SERVER['HTTP_X_CSRF_TOKEN'];
  if (empty($token) || $token !== $_SESSION['token']) {
    header('HTTP/1.1 403 Forbidden');
    // セキュリティ上の問題なのでログを生成する
    error_log('** CSRF detected **');
    die('正規の経路から使用ください');
  }
  // 更新処理
  $_SESSION['mail'] = $array['mail'];
  $result = array('result' => 'ok');
  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode($result);

```
* クライアント側： 呼び出し

```diff
<body onload="mailcheck()">
<script>
+ var token = null;
function mailcheck() {
  var req = new XMLHttpRequest();
  req.open("GET", "4g-020a.php");
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      var obj = JSON.parse(req.responseText);
      var p_mail = document.getElementById("p_mail");
      p_mail.textContent = "メールアドレス:" + obj.mail;
+      token = obj.token;
    }
  };
  req.send(null);
}

function chgmail() {
  var req = new XMLHttpRequest();
  req.open("POST", "4g-021a.php");
+  req.setRequestHeader('X-CSRF-TOKEN', token);
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      var obj = JSON.parse(req.responseText);
      var result = document.getElementById("result");
      result.textContent = "アドレス変更: " + obj.result;
      mailcheck();
    }
  };
  var mail = document.getElementById('mail').value;
  json = JSON.stringify({"mail": mail});
  req.send(json);
}
</script>
<input id="mail">
<input type="button" value="メールアドレス変更" onclick="chgmail()">
<p id="p_mail"></p>
<p id="result"></p>
<body>
```

攻撃側がCSRFを行おうとしても、プリフライトリクエストにはクッキーが含まれないので、現状のスクリプトはログインしていないという理由で403を返す。
仮に、プリフライトリクエストのチェック処理に脆弱性があり、すべての要求に対して肯定的に応答した場合でも、トークンの検査でエラーとなる。
リクエストのチェックが多重になされているので、開発者の不注意があってもカバーされる可能性が高い状態となっている。


##### 二重送信クッキー (Souble-submit Cookie)
* 乱数によるトークンをクッキーとして保存しておく
* 同じ値をリクエストヘッダのパラメータとしてクッキーとは別に送信する
* 結果として、クッキーともう一つのヘッダで同じ値が送信されることから、二重送信クッキーと呼ばれる。
* OWASP発行のCrossSite Request Forgery(CSRF) Prevention Cheat Sheetでも推奨されている

##### 実装例
```diff
  if (empty($_SESSION['token'])) { // トークンがなければ生成する
    $token = bin2hex(openssl_random_pseudo_bytes(24));
+   setcookie('CSRF_TOKEN', $token);
  }
```

```diff
   $token = $_SERVER['HTTP_X_CSRF_TOKEN'];
+  if (empty($token) || $token !== $_COOKIE['CSRF_TOKEN']) {
    header('HTTP/1.1 403 Forbidden');
    // セキュリティ上の問題なのでログを生成する
    error_log('** CSRF detected **');
    die('正規の経路から使用ください');
  }
```

```diff
<body onload="mailcheck()">
+ <!-- クッキーを簡便に扱うためにライブラリを使用 -->
+ <script src="../js/js.cookie.js"></script>
<script>
function mailcheck() {
  var req = new XMLHttpRequest();
  req.open("GET", "4g-020b.php");
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      var obj = JSON.parse(req.responseText);
      var p_mail = document.getElementById("p_mail");
      p_mail.textContent = "メールアドレス:" + obj.mail;
    }
  };
  req.send(null);
}

function chgmail() {
  var req = new XMLHttpRequest();
  req.open("POST", "4g-021b.php");
  req.withCredentials = true;
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      var obj = JSON.parse(req.responseText);
      var result = document.getElementById("result");
      result.textContent = "アドレス変更: " + obj.result;
      mailcheck();
    }
  };
+  var token = Cookies.get('CSRF_TOKEN');  // クッキーからトークンを取得
+  req.setRequestHeader('X-CSRF-Token', token);
  var mail = document.getElementById('mail').value;
  json = JSON.stringify({"mail": mail});
  req.send(json);
}
</script>
<input id="mail">
<input type="button" value="メールアドレス変更" onclick="chgmail()">
<p id="p_mail"></p>
<p id="result"></p>
<body>
```

##### 二重送信クッキーの問題点
* cookieは第三者から強制される可能性がある

主たる経路
* クッキーモンスターバグ
* 対象サイトおよび対象サイトのサブドメインにXSS脆弱性がある
* 通信路上からHTTPで強制

* この問題の緩和のためにも、トークンパラメータの送信にHTTPリクエストヘッダを使う方法を勧める
  * クロスオリジン通信でカスタムリクエストヘッダを付与するためには、プリフライトリクエストで許可される必要がある
  * API側のプリフライトリクエストの処理にバグがなければ、CSRF攻撃は成立しない

##### カスタムリクエストヘッダによる対策
* jQUeryの付与する`X-Requested-With`ヘッダをCSRF対策に利用する

```diff
<?php
  session_start();
  if (empty($_SESSION['mail'])) {
    header('HTTP/1.1 403 Forbidden');
    die('ログインが必要です');
  }
+  if (empty($_SERVER['HTTP_X_REQUESTED_WITH'])
+     || $_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest') {
    header('HTTP/1.1 403 Forbidden');
    // セキュリティ上の問題なのでログを生成する
    error_log('** CSRF detected **');
    die('正規の経路から使用ください');
  }
  $json = file_get_contents('php://input');
  $array = json_decode($json, true);
  // 更新処理
  $_SESSION['mail'] = $array['mail'];
  $result = array('result' => 'ok');
  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode($result);

```

##### 結局どの方法を採用すればよいか

CSRFトークン > 二重送信クッキー > HTTP リクエストヘッダ

### JSONハイジャック

#### 攻撃手法と影響

すでにブラウザ側で対策がとられているサンプル

```html
<body onload="alert(x)">
  罠サイト
  <script>
    var x="";
    Object.prototype.__defineSetter__("mail", function(v) {
      x += v + " ";
    })
  </script>
  <script src="http://exmaple.jp/api/test.json"></script>
</body>
```


#### 対策
ブラウザの脆弱性と考えられるが、アプリケーション側でも対策することを勧める
* `X-Content-Type-Options: nosniff`ヘッダの付与
* リクエストヘッダ`X-Requested-With: XMLHttpRequest`の確認


### JSONPの不適切な利用

* JSONPはCORSのようなアクセス制御の仕組みがない
  * 情報公開は、公開情報の提供にとどめるべき
  * 秘密情報の提供は避けるべき

### 信頼できないJSONP APIの使用

* JSONPは異なるオリジンのAPIをscript要素で呼び出すため、API側に悪意があった場合にその悪意を緩和する手立てがない。
* 仮に悪意があった場合、任意のJavaScriptwがアプリケーションのオリジンで実行されるため、XSSと同等のリスクとなる

#### まとめ
* JSONPはできるだけ使用せず、CORS＋JSONに移行する
* JSONPは公開情報の提供のみに用いる
* JSONPは信頼できる提供元のみを使用する

### CORSの検証不備

#### オリジンとして`*`を指定する

```
Access-Control-Allow-Origin: *
```

* 公開情報を提供するなどでオリジンの制限がない場合はこれでよい
* 非公開情報を扱う場合は、*指定だと情報漏洩の危険がある
* オリジンの制限がある場合
  * 原則、HTTPリクエストのOriginヘッダを検証
  * レスポンスヘッダとして以下のようにオリジンを明示する
  * 連携先が非常に多い場合、あえてオリジンとして*を記述し、他の方法で情報漏洩を防ぐ実装もある

```
Access-Control-Allow-Origin: https://example.jp
```

#### オリジンのチェックをわざと緩和してしまう
* CORSの規定では、XMLHttpRequestのwithCredentialsプロパティを指定した場合、`Access-Control-Allow-Origin`ヘッダに指定するオリジンは明示しなければならない
  * 手抜きをする開発者がいる。「まずは何でも動く状況にしてここから制限を加えていくとよい」→「CORSは理解していなくてもこれをコピペすればとりあえず動く」
  * 開発に関しては個々のヘッダの意味を理解したうえで、本当に必要な許可だけを与えるべき
  * 原則としてオリジンの確認はすべき

### セキュリティを強化するレスポンスヘッダ

* X-Frame-Options
  * frameやiframeの内部に表示することができなくなる
  * クリックジャッキングやiframeを用いた攻撃の防止

* X-Content-Type-Options
  * `X-Content-Type-Options: nosniff`の形で使用
  * ブラウザはMINEタイプの解釈を厳密にするようになる
  * MIMEタイプを誤認させる攻撃・JSONハイジャックの緩和

* X-XSS-Protection
  * モダンブラウザではXSSフィルタと呼ばれるセキュリティ機能が実装されている
    * 利用者がXSSフィルタの有効化・無効化設定をしていても、当該ページについてXSSフィルタの設定を上書きする
    * XSSフィルタの動作モードを指定する
  * 通常は次を決め打ちで出力すればよい。`X-XSS-Protection: 1; mode=block`

* Content-Security-Policy (CSP)
  * XSS攻撃を緩和するためのセキュリティ機能
  * CSPの最も基本的、かつ、厳しい設定は次。 `Xontent-Security-Policy: default-src 'self'`
  * スクリプト、画像、CSSなどの全てのメディアをサイト自身のオリジンからのみ読み込むようになる
  * HTMLページ内に読み込むJavaScript（インラインスクリプト）も禁止する
  * 利用するJavaScriptでCSPに対応していることが求められる
  * 実装されつつあるが、仕様が流動的で注視すべき機能
  * [MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP)
  * [Content Security Policy でユーザーを守ろう](https://tech.bitbank.cc/content-security-policy/)

* Strict-Transport-Security (HTTPS Strict Transport Security; HSTS)
  * HTTPSでの接続を強制するための指令
  * 背景に、スマートフォンの普及に伴う公衆無線LANの利用が一般化したことから、通信路上の盗聴・改ざんのリスクが現実的になったことがある
    * 常時TLSと呼ばれることもある
    * HTTPアクセスをHTTPSにリダイレクトすることが行われる
      * 中間者攻撃により、HTTPにダウングレードされるリスクが残る
  * HSTSのレスポンスヘッダが設定されていると、ブラウザは当該ホストへの接続を一定期間HTTPSアクセスに強制する
    * 上記ダウングレードのリスクを緩和
  * 自己署名証明書など信頼できない証明書が使えなくなるデメリットがあるため、計画的な利用を推奨

以下はHTTPSへの強制を1年間継続する設定
```
Strinct-Transport-Security: max-age=31536000
```

## JavaScriptの脆弱性

### DOM Based XSS 脆弱性

#### 攻撃例
```js
function go() {
  var url = location.hash.slice(1);
  location.href=url;
}
```

上記に対して、攻撃するXSS攻撃

```
https://example.jp/test.html#javascript:alert(doument.domain)
```

#### 脆弱性が生まれる原因
* DOM操作の際に外部から指定されたHTMLタグが有効になってしまう
* 外部から指定されたJSがうごく`eval`などの機能を用いている
* location.hrefやsrc属性、href属性のURLが未検証である

* HTMLタグなどが有効になってしまう機能
  * `document.write() / document.writeln()`
  * `innerHTML/outerHTML`
  * jQueryの`html() / jQuery() / $()`

* evalインジェクション
  * `eval() / setTimeout() / setInterval() / Fuctionコンストラクタ`
* JavaScriptが実行される機能
  * JavaScriptの`location.href`
  * a要素の`href属性`, iframe要素の`src`属性など

#### 対策

* 適切なDOM操作、あるいは記号のエスケープ
* `eval() / setTimeout() / setInterval() / Fuctionコンストラクタ`などの引数に文字列形式で外部からの値を渡さない
* URLのスキームをhttpかhttpsに限定する
* jQueryのセレクタは動的生成しない
* 最新のライブラリを用いる
* XMLHttpRequesetのURLを検証する

### Webストレージの不適切な使用

#### 特徴

|                        | クッキー | localStorage      | sessionStorage|
|:--                     | :--      |:--                |:--            |
|データの区分け          |ブラウザ内共通|ブラウザ内共通 |タブごと|
|アクセス制限            |ドメイン名とパス|同一オリジンポリシー|同一オリジンポリシー|
|有効期間                |expiresで指定 |無期限|タブを閉じるまで|
|サーバへの送信          |自動的に送信 |送信されない|送信されない|
|JavaScriptからのアクセス|httpOnlyで制御可|常にアクセス可|常にアクセス可|
|利用者から参照できるか  |参照可|参照可|参照可|
|利用者から変更できるか  |変更可|変更可|変更可|

#### Webストレージに何を保存してよいか
* 重要な情報はWebストレージには保存しない。
* パスワード・個人情報などは直接Webストレージには保存しない

#### Webストレージの不適切な利用例
Webストレージ自体は同一オリジンポリシーの制限があり緩める手段もないので、単体では脆弱性が入り込む余地は少ない。
Webストレージに問題が生じるシナリオは他の機能との組み合わせ。
例えば、下記。

* Webストレージに秘密情報を保存していた
* Webストレージに保存した情報が、XSSやportMessageにより漏洩する
* WebストレージがXSSやpostMessage経由で改ざんされる
* Webストレージを経由したDOM Based XSS

### postMessage呼出の不備

#### postMessageとは
iframeやwindow.openで開いたウィンドウなど、複数のウィンドウが異なるオリジンを協調して動作する環境で、
メッセージやデータのやり取りを行う汎用的な仕組み

#### 対策
* 送信先の確認
  * postMessageメソッドの第2引数に送信先のオリジンを指定することで、送信先オリジンが正しいことを確認できる
* 送信元の確認
  * `onmessage`イベントハンドラで、`event.origin`プロパティを確認する

```js
function receiveMessage(event) {
  if (event.origin !== 'http://example.jp') {
    // オリジンが正しくない場合のエラー処理
    alert('オリジン違反');
    return;
  }
}
```

## 認証
* 認証(Authentication)とは、利用者が確かに本人であることをなんらかの手段で確認すること

### ログイン機能
* 本書では、本人確認処理をログイン機能とする

#### ログイン機能に対する攻撃
* SQLインジェクションによるログイン機能のバイパス
* SQLインジェクション攻撃によるパスワードの入手
* ログイン画面に対するパスワード試行
* ソーシャルエンジニアリングによるパスワード入手
* フィッシングによるパスワード入手

#### 不正ログインを防ぐためには

* SQLインジェクションなどのセキュリティバグをなくす
* パスワードを予測困難なものにする

##### SQLインジェクションなどのセキュリティバグをなくす
発生しやすい脆弱性は以下

* SQLインジェクション
* セッションIDの固定化
* クッキーのセキュア属性不備
* オープンリダイレクト脆弱性
* HTTPヘッダ・インジェクション

##### パスワードを予測困難なものにする

* 十分な強度と使いやすさを兼ね備えたパスワードを決めてもらう必要がある

##### パスワードの文字種と桁数の要件

パスワードの組み合わせ総数 = 文字種の数 ^ 桁数

|文字種の数      |4桁       |6桁     |8桁     |
|:--             |:--       |:--     |:--     |
|10種(数字のみ)  |       1万|   100万|     1億|
|26種（英小文字）|    約46万|   約3億|約2000億|
|62種（英数字）  |  約1500万|  約57億| 約220兆|
|94種（英数記号）|  約7800万|約6900億|約6100兆|

##### パスワード利用の現状

* [2017年の最悪なパスワードは？ あの大ヒット映画もランクイン](https://jp.techcrunch.com/2017/12/20/huffpost-password_a_23312524/)
* [最悪なパスワードは？　SplashDataが2019年版を公開](https://www.atmarkit.co.jp/ait/articles/1912/26/news108.html)

利用者はパスワードの制限の範囲でもっとも楽なパスワードを使う傾向がある

##### パスワードに関するアプリケーション要件
アプリケーション側では大きな入れ物を用意しておいて、利用者には自己責任で自由にパスワードを決めてもらう方法

* 文字種 : US-ASCII文字すべて(0x20～0x7E)
* 桁数： 128桁以下

##### 積極的なパスワードポリシーのチェック

* 桁数に関するもの
* 文字種に関するもの
* ユーザIDと同じパスワード（いれゆるジョーアカウント）の禁止
* パスワード辞書に載っているありがちな単語の禁止

やりすぎるとかえって安全なパスワードをつけようという利用者のモチベーションを下げる。
米国標準技術研究所(NIST)発行のガイドライン「SP800-63-3」では2017年の改定で、
**「異なる文字種を組み合わせる規則や定期変更の強制は推奨しない」**という内容に変更されている。

#### パスワード認証を狙った攻撃への対処
* アカウントロック

##### 基本的なアカウントロック
* ユーザIDごとにパスワード間違いの回数を数える
* パスワード間違いの回数が上限値を超えると、アカウントをロックする。ロックされたアカウントはログインできなくなる
* アカウントロックが発生した場合は、メールなどで対象利用者と管理者に通知する
* 正常にログインした場合は、パスワード間違いのカウンタをクリアする

間違いの回数が少なすぎると、正規利用者がロックされる頻度が高まるので、10回程度に設定するとよい。[参考：クレジットカードの基準は6回](https://ja-pci.onelink-translations.com/_onelink_/pcisecurity/en2ja/minisite/en/docs/Prioritized-Approach-for-PCI_DSS-v3_2.pdf)

ロックされたカウントの再有効化について
* アカウントロックから30分経過した場合、自動的に再有効化される（※クレジットカードの基準も30分）
  * 正当な利用者が締め出される可能性を少なくするため
* 管理者が、なんらかの方法で本人確認した後に再有効化する

###### 30分は短すぎるのでは？
10回のパスワード試行後に、30分ロックする場合、攻撃者が100個のパスワードを試すのに4時間半以上かかり、10回のアカウントロック通知が発生する。
この間に管理者は、アカウントロックの発生状況を調べた腕、必要に応じて攻撃が来ているIPアドレスからの通信を遮断するなどの対応ができる。

##### パスワード認証に対する攻撃のバリエーションと対策

* 辞書攻撃
  * 使用頻度の高いパスワード候補から試す
  * アカウントロックが有効

* ジョーアカウント探索
  * ユーザIDと同じパスワードに設定しているアカウントへの攻撃

* リバースブルートフォース攻撃
  * パスワードを固定して、ユーザIDを取り替えながらログインを実行する

* パスワードスプレー攻撃
  * IDもパスワードも固定せずに、少数のパスワード候補をIDを変えながら試していく

* パスワードリスト攻撃
   * 攻撃対象サイトとは別のサイトから漏洩したIDとパスワードの一覧を用いてログイン試行する攻撃
   * 同じID/パスワードを使いまわしている人が被害にあう

###### パスワード認証に対する攻撃のバリエーションと対策

◇ 二段階認証の実装

* メールやSMSで送られる6桁程度の数字
* スマホアプリなどで生成される6桁程度の数字

ログインごとではなく、以下の場合に二段階認証を要求する方法もある

* 初回ログイン時のみ、二段階認証を行い、その後は一定期間一段階の認証とする
* 利用者の通常の使い方から外れたログイン（地域、時間帯、ブラウザなど）
* 決済やパスワード変更など「重要な処理」の時

二段階認証を要求するかどうかは、成りすましが発生した場合のリスクを基に、セキュリティ要件として検討する。

◇ 積極的なパスワードチェック

* ありがちなパスワードや、ユーザIDと同じパスワードを拒否する

### パスワードの保存方法

* パスワードリスト攻撃への影響がもっとも大きい
* SQLインジェクションによりDBの情報が漏洩しても、パスワードだけは悪用されない形で保護すべき
  * 暗号化とメッセージダイジェスト（暗号学的ハッシュ値）がある

#### 暗号化によるパスワード保護と課題

* 安全な暗号アルゴリズムの選定
* 暗号化・複合処理の安全な実装
* 鍵の生成
* 鍵の保管
* 暗号アルゴリズムが危胎化した場合の再暗号化
  * 危胎化。きたいか。暗号を破る手法が発見される、PCの性能向上で解読手法が現実的になること。

データベースを丸ごと暗号化する製品が販売されているが、「透過的データ暗号化(TDE;TranParent Data Encryption)型」のものはパスワードの保護には適さない。
SQLインジェクションでは呼び出されたデータも平文に戻るため。
TDE型のDB暗号化製品は、DBを構成するファイルやバックアップメディアの盗難に対して有効なものである。
または、クラウド事業者への情報漏洩の懸念を解消する効果もある。

#### メッセージダイジェストによるパスワード保護と課題
◇メッセージダイジェストとは
任意の長さのデータ（ビット列）を固定長のデータ（メッセージダイジェスト、あるいはハッシュ値）に圧縮する関数をハッシュ関数といい、
セキュリティ上の要件を満たすハッシュ関数を暗号学的ハッシュ関数という。

※要件
* 一方向性（原像計算困難性）
  * ハッシュ値から元データを見つけることが現実的な時間内で出来ないこと
* 弱衝突耐性（第2原像計算困難性）
  * 元データが与えられたときに、元データと同じハッシュ値を持つ別のデータを見つけることが現実的な時間内で出来ないこと
* 強衝突耐性（衝突困難性）
  * 同じハッシュ値を持つ2つのデータを見つけることが困難であること

◇ 脅威1： オフラインブルートフォース攻撃
パスワードは短い文字列で、文字種も限られている場合が多いので、総当たり的に元データを探索できる場合がある。
ハッシュ関数は高速なものが求められるため、現実的な時間内に見つけられる場合がある。
近年では、GPUの活用がされている。 8桁94種（英数記号)の解読は、md5で14分、sha-1で39分で可能となっている。

◇ 脅威2： レインボーテーブル
パスワードのハッシュ値を総当たりで算出して表にしておき、解読の際に表を参照する方法。
現在入手できるレインボーテーブルは10文字程度までに対応のものなので、パスワードを20文字以上にすれば解読を防ぐことができる。
ただし、それでは現実的でないので、後述のsaltを使用して対策する。

◇ 脅威3: ユーザDB内にパスワード辞書をつくられる。
攻撃者がダミーのユーザを多数登録して、ユーザDB上にパスワード辞書を作ってしまう。
saltが有効。

◆ 対策1: salt(ソルト)
ハッシュの元データに追加する文字列のこと。
見かけのパスワードを長くするとともに、ユーザごとにソルトを異なるものにすることによって、パスワードが同じでも異なるハッシュ値が生成される。
ソルトの要件は以下。

* ある程度の長さを確保する
  * レインボーテーブル対策のため、パスワードを合わせた長さが最低でも20文字は必要
* ユーザごとに異なるものにする
  * 同じパスワードを持つユーザでもハッシュ値は異なるものにするため。

◆ 対策2: ストレッチング
ブルートフォース攻撃対策。
ハッシュ計算の速度をあえて遅くするために、ハッシュ計算を繰り返し行うこと。
また、ハッシュ計算の速度の遅いハッシュ関数を使って対策することも考えらえる
`BCrypt`, `PBKDF2`, `Argon2`などがある。

◆ password_hash関数の利用

```php
$hash = password_hash($password, PASSWORD_DEFAULT);
$result = password_verify($password, $hash);
```

* ソルトが自動的に乱数で付与されるので、実行結果は毎回変わる
* 例： ハッシュは`$2y$10$aR/1QBuus...`のような形となる
  * `$2y$`がハッシュの方式を表す。2yは`BCrypt`という方式
  * `$2y$10`はストレッチングの回数に関係するパラメータ（10回というわけではない）
  * `aR/1Q...`がソルトとハッシュ値となる。



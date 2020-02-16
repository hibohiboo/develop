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

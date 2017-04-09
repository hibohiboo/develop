# logについて

## log4js

loggerとしてよく使われているlog4jのjsバージョン。

### 設定

* appenders
  * ログの出力処理の指定。ログの出力方式を配列で複数指定可能。
* type
  * ログの出力タイプを指定。
* category
 * 出力するログのカテゴリ。カテゴリ毎に出力内容を分けることができる。
* filename
  * ログの出力先（ファイル名）
* pattern
  * ファイルの出力パターン

typeの設定値
|値|説明|
|:--|:--|
|file|	ファイルに書き出す。|
|datefile|	日付毎にローテーションしてファイルに書き出す。|
|console|	コンソールに書き出す。|

patterの設定値
|書式|説明|
|:--|:--|
|yyyy|西暦を4桁|
|yy|西暦2桁|
|MM|月|
|dd|日|
|hh|時間（24時間表示）|
|mm|分|
|ss|秒|
|sss|ミリ秒|
|O|	タイムゾーン|


## フォーマット

|指定する引数|説明|フォーマット|
|:--         |:-- |:--|
|combined|apache combineログ出力フォーマット|`:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`|
|common|apache common ログ出力フォーマット|`:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]`|
|dev|:statusに色がつく|`:method :url :status :response-time ms - :res[content-length]`|
|short|短いフォーマット。レスポンスタイムが出力される。|`:remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms`|
|tiny|最小限のログ出力|`:method :url :status :res[content-length] - :response-time ms`|



## 参考

[morgan][*1]
[Express middleware][*2]
[Express 4 のログ出力とフォームの処理][*3]
[apache LogFormat][*4]
[ログローテート][*5]
[log4js-nodeを使ってみた][*6]
[Node.js + Express における log4js の 使い方][*7]
[github - log4js-node][*8]
[log4jsの覚え書き - log4.jsを使ってみた ][*9]
[log4js-example][*10]

[*1]:https://expressjs.com/en/resources/middleware/morgan.html
[*2]:https://expressjs.com/en/resources/middleware.html
[*3]:http://qiita.com/hoshi-takanori/items/7f5602d7fd7ee0fa6427
[*4]:https://httpd.apache.org/docs/2.0/ja/logs.html
[*5]:https://www.npmjs.com/package/rotating-file-stream
[*6]:http://qiita.com/toshiyukihina/items/b76ee2f89402b808f736
[*7]:https://garafu.blogspot.jp/2016/07/how-to-use-log4js-on-nodejs-express.html
[*8]:https://github.com/nomiddlename/log4js-node/tree/v1.1.1
[*9]:http://qiita.com/_daisuke/items/865cf929a403cc9eec53
[*10]:https://github.com/nomiddlename/log4js-example
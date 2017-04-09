# logについて

## log4js

loggerとしてよく使われているlog4jのjsバージョン。

### 使用例

[app.js](https://github.com/hibohiboo/develop/tree/a0587c92f20e5d32dd14a9730022c648dfc7558b/tutorial/lesson/wmfw/myproject/src/wmfwapp/app.js)

`import log4js from 'log4js'; `で読み込んで使用する。

|ログレベル|説明|
|:--|:--|
|レベル|説明|
|OFF|ログファイルにログを出力しない|
|FATAL|	FATAL以上のレベルのログを出力。|
|ERROR|	ERROR以上のレベルのログを出力。|
|WARN|	WARN以上のレベルのログを出力。|
|INFO|	INFO以上のレベルのログを出力。|
|DEBUG|	DEBUG以上のレベルのログを出力。|
|TRACE|	TRACE以上のレベルのログを出力。|
|ALL|	全てのログレベルの出力|


### 設定

設定ファイルは、今回は環境変数` LOG4JS_CONFIG=/wmfw/wmfwapp/config/log4js.json`で設定。  
[log4js.json](https://github.com/hibohiboo/develop/tree/a0587c92f20e5d32dd14a9730022c648dfc7558b/tutorial/lesson/wmfw/myproject/src/wmfwapp/config/log4js.json)

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

patternの設定値
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

filenameが"app.log"でpatternが”-yyyy-MM-dd”なのでローテーションのタイミング(AM:0:00)でsystem-yyyy-MM-dd.logになる。


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
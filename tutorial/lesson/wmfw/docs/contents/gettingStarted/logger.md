# logについて

## アクセスロガー

標準とされているmorganを使用する。

## 最小限の使用例

[Program.cs](https://github.com/hibohiboo/develop/tree/c8d37776bcb0b62e2204a92fa66fe8b2d24c41b3/tutorial/lesson/wmfw/myproject/src/wmfwapp/app.js)

## 出力先の設定

`rotating-file-stream`モジュールを使い、ログローテーションの設定も合わせて行う。
[Program.cs](https://github.com/hibohiboo/develop/tree/5d69016c38940f543d2634fa210c431f68db4f04/tutorial/lesson/wmfw/myproject/src/wmfwapp/app.js)



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


[*1]:https://expressjs.com/en/resources/middleware/morgan.html
[*2]:https://expressjs.com/en/resources/middleware.html
[*3]:http://qiita.com/hoshi-takanori/items/7f5602d7fd7ee0fa6427
[*4]:https://httpd.apache.org/docs/2.0/ja/logs.html
[*5]:https://www.npmjs.com/package/rotating-file-stream
[*6]:http://qiita.com/toshiyukihina/items/b76ee2f89402b808f736
[*7]:https://garafu.blogspot.jp/2016/07/how-to-use-log4js-on-nodejs-express.html
[*8]:https://github.com/nomiddlename/log4js-node/tree/v1.1.1
[*9]:http://qiita.com/_daisuke/items/865cf929a403cc9eec53

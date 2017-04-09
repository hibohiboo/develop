# logについて

## logger

標準とされているmorganを使用する。

## 最小限の使用例

[Program.cs](https://github.com/hibohiboo/develop/tree/c8d37776bcb0b62e2204a92fa66fe8b2d24c41b3/tutorial/lesson/wmfw/myproject/src/wmfwapp/app.js)

## 出力先の設定

ログローテーションの設定も合わせて行う。


## フォーマット

|指定する引数|説明|フォーマット|
|:--         |:-- |:--|
|combined|apache combineログ出力フォーマット|`:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`|
|common|apache common ログ出力フォーマット|`:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]`|
|dev|:statusに色がつく|`:method :url :status :response-time ms - :res[content-length]`|
|short|短いフォーマット。レスポンスタイムが出力される。|`:remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms`|
|tiny|最小限のログ出力|`:method :url :status :res[content-length] - :response-time ms`|



## 参考

[moragn][*1]
[Express middleware][*2]
[Express 4 のログ出力とフォームの処理][*3]
[apache LogFormat][*4]
[ログローテート][*5]

[*1]:https://expressjs.com/en/resources/middleware/morgan.html
[*2]:https://expressjs.com/en/resources/middleware.html
[*3]:http://qiita.com/hoshi-takanori/items/7f5602d7fd7ee0fa6427
[*4]:https://httpd.apache.org/docs/2.0/ja/logs.html
[*5]:https://www.npmjs.com/package/rotating-file-stream
# ルーティングについて

## ルーティング設定を行う

### 基本的なルーティング設定

`app.js`でリクエストパスのルート`/`をルーティングミドルウェアに渡す。

[app.js](https://github.com/hibohiboo/develop/tree/26bbca7faff626da40e7e369c354b7e30e7abbc2/tutorial/lesson/wmfw/myproject/src/wmfwapp/app.js)

ルーティングミドルウェアでそれを受取り、ルーティングを行う

[routes/index.js](https://github.com/hibohiboo/develop/tree/26bbca7faff626da40e7e369c354b7e30e7abbc2/tutorial/lesson/wmfw/myproject/src/wmfwapp/routes/index.js)

## 参考

[公式ドキュメント][*1]

[*1]:https://expressjs.com/ja/guide/routing.html
# エラー

## 注意点

[エラーチュートリアル][*1]を見れば必要なことは書いてある。  
特に注意することは、next()関数はエラーが有った場合、'route'以外を指定すること。

```js
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
```

### デフォルトのエラーハンドラ

デフォルトのエラー・ハンドラー
Express には、アプリケーションで発生する可能性があるすべてのエラーを処理するエラー・ハンドラーが標準装備されています。このデフォルトのエラー処理ミドルウェア関数は、ミドルウェア関数スタックの最後に追加されます。

エラーを next() に渡して、エラー・ハンドラーで処理しない場合、そのエラーは標準装備のエラー・ハンドラーによって処理されます。エラーはスタック・トレースと共にクライアントに書き込まれます。スタック・トレースは実稼働環境には組み込まれません。

アプリケーションを実動モードで実行するには、環境変数 NODE_ENV を production に設定します。

## 参考

[エラーチュートリアル][*1]  
[error][*2]

[*1]:http://expressjs.com/ja/guide/error-handling.html
[*2]:http://expressjs.com/en/guide/error-handling.html
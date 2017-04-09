# 静的ファイルについて

## express.staticで設定

```
// 静的ファイルの設定
app.use('/public', express.static(path.join(__dirname, 'public')));
```

[app.js](https://github.com/hibohiboo/develop/tree/dfe513b4d549d1bf42c6597a0ea4d287b8726071/tutorial/lesson/wmfw/myproject/src/wmfwapp/app.js)

## 参考

[static-files][*1]

[*1]:https://expressjs.com/ja/starter/static-files.html
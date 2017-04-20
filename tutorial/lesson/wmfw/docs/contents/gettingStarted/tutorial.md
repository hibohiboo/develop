# asp.net風チュートリアル

## コントローラの追加

### HelloWorld

シンプルなテキストを返す HelloWorldコントローラを追加する

[hello.js](https://github.com/hibohiboo/develop/tree/c2f8e79621a710ac8c12b1af4806f3ef8dfb77cc/tutorial/lesson/wmfw/myproject/src/server/routes/controller/hello.js)

### get

getパラメータの取得は`req.query`で行う

[hello.js](https://github.com/hibohiboo/develop/tree/94cc0ea92497ac83c9c2865ce8820ec705a52b53/tutorial/lesson/wmfw/myproject/src/server/routes/controller/hello.js)

## Viewの追加

### render

ビューエンジンとして今回はpugを使用している。

[hello.js](https://github.com/hibohiboo/develop/tree/28f29c9c90187cc92c05f0a206f22ceef3fe2581/tutorial/lesson/wmfw/myproject/src/server/routes/controller/hello.js)

[index.pug](https://github.com/hibohiboo/develop/tree/28f29c9c90187cc92c05f0a206f22ceef3fe2581/tutorial/lesson/wmfw/myproject/src/client/views/hello/index.pug)

### 繰り返す

`each`で配列などを繰り返して使える。[*][*2]

[hello.js](https://github.com/hibohiboo/develop/tree/0e1e3b01aef93edec477d9f369f1a81cc78ee6d3/tutorial/lesson/wmfw/myproject/src/server/routes/controller/hello.js)

[index.pug](https://github.com/hibohiboo/develop/tree/0e1e3b01aef93edec477d9f369f1a81cc78ee6d3/tutorial/lesson/wmfw/myproject/src/client/views/hello/index.pug)


## 変数

`=`やes6の記法で書くことができる。


## 参考

[first mvc app][*1]

[*1]:https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/
[*2]:https://pugjs.org/language/iteration.html
[*3]:https://github.com/aspnet/MusicStore

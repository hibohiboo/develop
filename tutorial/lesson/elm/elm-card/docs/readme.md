

## メモ

### webpack.config.js

#### htmlファイルの追加
htmlファイルを増やしたいときは以下のようにプラグインを追加していく。[*][*4]

```js
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html",
            inject: "body",
            chunks:['index'] // card.jsを適用したくないのでindexのみに
        }),
        new HTMLWebpackPlugin({
          filename: "card.html",
          template: "src/html/card.html",
          inject: false // htmlのほうにjsも記述
        })
    ],
```

#### jsの追加

`entry`プロパティを増やしていく。`filename`も`entry`のプロパティ名を参照するように変更

```js
const filename = MODE == "production" ? "[name]-[hash].js" : "[name].js";
const files = {index:"./src/index.js", card:"./src/card.js"};

var common = {
    mode: MODE,
    entry: files,
    output: {
        path: path.join(__dirname, "dist"),
        filename: filename
    },
```

`allEntries:true`にすると、card.htmlでもhot-loadが有効になる。
([webpack.config.js](https://github.com/hibohiboo/develop/tree/56a1499f3a3721afb9addfffb47445528591c5d1/tutorial/lesson/elm/elm-card/app/webpack.config.js) )
```js
hotClient:{
  host: {
    client: '192.168.50.10', // 仮想環境のIPアドレス
    server: '0.0.0.0',       // Dockerのコンテナ上で動かすのでワイルドカードIPアドレスを指定
  },
  // hot-reloadで使われるポートを固定
  port:{
    server:3002,
    client: 3002
    },
  allEntries: true 
}
```

### elmを要素に適用

Html.programWithFlagsからBrowser.elementに変更されていた

```js
const {Elm} = require('./card/Main');
const mountNode = document.getElementById('cards');
const app = Elm.Main.init({flags: 6, node: mountNode});
```

### うれしいこと

エラーメッセージがとても親切。

```
elm_1  | 52|             Tuple.pair { model | handoutList = model.handoutList ++ [ newHO ], nextId = model.nextId + 1 } (toJs ("Add Handout : " ++ model.nextId ++ ":" ++ title))
elm_1  |                                                                                                                                           ^^^^^^^^^^^^
elm_1  | Try using String.fromInt to turn it into a string? Or put it in [] to make it a
```

## 履歴

[環境構築](https://github.com/hibohiboo/develop/tree/d10f2da1feb75f090d6714af7c4c73be220c7773/tutorial/lesson/elm/elm-card)  
[HTMLファイル追加](https://github.com/hibohiboo/develop/tree/95b139debb63953b660ab5ce0de78b66bec84efe/tutorial/lesson/elm/elm-card)  
[jsファイル追加](https://github.com/hibohiboo/develop/tree/e46eeb8980fa124f500081d152c6d3f9eb7ca4b2/tutorial/lesson/elm/elm-card)  
[elmを一部適用](https://github.com/hibohiboo/develop/tree/7e64462bc1acecf1a0f780c00e175b6af374069b/tutorial/lesson/elm/elm-card)  
[elmを一部適用](https://github.com/hibohiboo/develop/tree/8df449ce1520857f15b76f47eca6f27f80fdfe2b/tutorial/lesson/elm/elm-card) [*][*6]  
[ハンドアウト作成](https://github.com/hibohiboo/develop/tree/1bfcca589058e88007d2cf9f1e52dd67768a3659/tutorial/lesson/elm/elm-card)   
[ハンドアウトを別ファイルに分割](https://github.com/hibohiboo/develop/tree/266d81e5fd35f4893e230bd827a81bcbe68eff32/tutorial/lesson/elm/elm-card)   
[ハンドアウト一覧を別ファイルに分割](https://github.com/hibohiboo/develop/tree/6b8b65530d8ed5139516dd5d0fa812c9cd8d013f/tutorial/lesson/elm/elm-card)   
[入力欄表示](https://github.com/hibohiboo/develop/tree/97c609a542e2f52e19ef728a7ab72f360310edc8/tutorial/lesson/elm/elm-card)  
[処理の移譲](https://github.com/hibohiboo/develop/tree/98f97438fc3f9bc6610d684da7abed146bca3ce1/tutorial/lesson/elm/elm-card)  
[追加メソッド切り出し](https://github.com/hibohiboo/develop/tree/f5ede5a569326bed906de05515d65c7b7dda0f99/tutorial/lesson/elm/elm-card)  
[削除機能追加](https://github.com/hibohiboo/develop/tree/750d6ff8930f8323498cb8caf6da5a911bc787ae/tutorial/lesson/elm/elm-card)  
[入力分離（未連携）](https://github.com/hibohiboo/develop/tree/9839c1c1729547f04ddbcc4a5dce5f3758486ce8/tutorial/lesson/elm/elm-card)  
[入力分離（連携）](https://github.com/hibohiboo/develop/tree/fd349dfb039a3f1fe6d69397a423b474d5925c31/tutorial/lesson/elm/elm-card)  


### TODO開始
[モデルとビューを作成](https://github.com/hibohiboo/develop/tree/7726dd013e034e744ab78898e1da4eee09ad5583/tutorial/lesson/elm/elm-card) 

[updateを作成](https://github.com/hibohiboo/develop/tree/9b2f4d76b7e0959fc3c33b8eabe40297cd72b6c3/tutorial/lesson/elm/elm-card) 


## 参考

[Elm 0.18で作るTodoアプリ(1)][*1]  
[elm0.19 + webpack4 + babel7 のサンプルをdockerで試したメモ][*2]  
[webpackでhtmlファイルも出力する][*3]
[subscribe][*7]

[*1]:https://qiita.com/tomluck/items/872787cda6682834a3a1
[*2]:https://qiita.com/hibohiboo/items/b19519b4a9dbb5ec11b0
[*3]:https://ema-hiro.hatenablog.com/entry/2017/10/12/015748
[*4]:https://github.com/elm-community/elm-webpack-loader/pull/142/files
[*5]:https://github.com/jantimon/html-webpack-plugin
[*6]:https://github.com/avh4/elm-upgrade
[*7]:https://qiita.com/sand/items/eeabb2220b2ed6fc0fea
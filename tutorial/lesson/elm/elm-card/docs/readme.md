

## メモ

### webpack.config.js

#### htmlファイルの追加
htmlファイルを増やしたいときは以下のようにプラグインを追加していく。

```js
    plugins: [
        new HTMLWebpackPlugin({
            // Use this template to get basic responsive meta tags
            template: "src/index.html",
            // inject details of output file at end of body
            inject: "body"
        }),
        new HTMLWebpackPlugin({
          filename: "card.html",
          template: "src/html/card.html"
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


## 履歴

[環境構築](https://github.com/hibohiboo/develop/tree/d10f2da1feb75f090d6714af7c4c73be220c7773/tutorial/lesson/elm/elm-card)

[HTMLファイル追加](https://github.com/hibohiboo/develop/tree/95b139debb63953b660ab5ce0de78b66bec84efe/tutorial/lesson/elm/elm-card)

[jsファイル追加](https://github.com/hibohiboo/develop/tree/e46eeb8980fa124f500081d152c6d3f9eb7ca4b2/tutorial/lesson/elm/elm-card)


## 参考

[Elm 0.18で作るTodoアプリ(1)][*1]  
[elm0.19 + webpack4 + babel7 のサンプルをdockerで試したメモ][*2]  
[webpackでhtmlファイルも出力する][*3]


[*1]:https://qiita.com/tomluck/items/872787cda6682834a3a1
[*2]:https://qiita.com/hibohiboo/items/b19519b4a9dbb5ec11b0
[*3]:https://ema-hiro.hatenablog.com/entry/2017/10/12/015748
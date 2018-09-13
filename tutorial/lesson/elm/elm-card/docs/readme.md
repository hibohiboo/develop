

## メモ

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


## 履歴

[環境構築](https://github.com/hibohiboo/develop/tree/d10f2da1feb75f090d6714af7c4c73be220c7773/tutorial/lesson/elm/elm-card)
  

## 参考

[Elm 0.18で作るTodoアプリ(1)][*1]  
[elm0.19 + webpack4 + babel7 のサンプルをdockerで試したメモ][*2]  
[webpackでhtmlファイルも出力する][*3]


[*1]:https://qiita.com/tomluck/items/872787cda6682834a3a1
[*2]:https://qiita.com/hibohiboo/items/b19519b4a9dbb5ec11b0
[*3]:https://ema-hiro.hatenablog.com/entry/2017/10/12/015748
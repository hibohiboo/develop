# postcss

## 入れ子のエラー

`postcss-nested`や`postcss-nesting`を試してみようとしたら以下のエラーがでた。

```
Node#after is deprecated. Use Node#raws.after
(node:16) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): TypeError: after.after is not a function
```

解決法がわからなかったので保留。知ってらっしゃる方いればお知恵をお借りしたく。。

## 参考

[chokidar][*1]
[node.jsでファイル監視を手軽に行えるモジュール「chokidar」][*2]
[postcss][*3]
[PostCSSの基本的なプラグインについて][*4]
[PostCSSを導入してみた & PostCSSの便利プラグインと誰得プラグイン][*5]
[PostCSS まとめ][*7]
[PostCSSならCSSプリプロセッサーをもう乗り換え続けなくて済むかもよ！][*8]
[Q)「CSS プリプロセッサを導入するなら？」A)「PostCSS かな」 ~ PostCSS, Stylus, Sass, Less ザックリ比較した話][*9]
[CSS拡張メタ言語「SCSS(Sass)」と「LESS」の比較][*10]
[postcss-comment][*11]

[*1]:https://github.com/paulmillr/chokidar
[*2]:https://shimz.me/blog/node-js/4123
[*3]:https://github.com/postcss/postcss
[*4]:https://qiita.com/hbsnow/items/3193f7576cbec0a5765e
[*5]:https://blog.mismithportfolio.com/web/20160911postcss
[*6]:https://css-frameworks.unsweets.net/
[*7]:https://qiita.com/morishitter/items/4a04eb144abf49f41d7d
[*8]:https://www.webprofessional.jp/7-postcss-plugins-to-ease-you-into-postcss/
[*9]:http://codenote.net/css/3698.html
[*10]:http://dxd8.com/archives/217/
[*11]:https://www.npmjs.com/package/postcss-comment
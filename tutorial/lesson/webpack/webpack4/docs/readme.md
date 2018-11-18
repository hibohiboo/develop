# webpack4 実験場



|コマンド|ソース|出力|
|:--|:--|:--|
|bin/pug.sh|src/templates|dist/html|

## pug

htmlのテンプレートエンジン

[この時点のソース](https://github.com/hibohiboo/develop/tree/b52da33ee917a226673ce01629acc242241542e0/tutorial/lesson/webpack/webpack4)  

## js

### babel

jsのトランスパイラ

#### IE対応

[この時点のソース](https://github.com/hibohiboo/develop/tree/d18e14389602e71f79591832968e0a0722f3db80/tutorial/lesson/webpack/webpack4)  


#### chromeのみ

[この時点のソース](https://github.com/hibohiboo/develop/tree/192a01c5e15395a25d422d8105db7ebc0284e208/tutorial/lesson/webpack/webpack4)  


[参考](https://qiita.com/shibukawa/items/19ab5c381bbb2e09d0d9)
[参考：builtins](https://babeljs.io/docs/en/babel-preset-env)

### lint

eslintのairbnbを追加

[この時点のソース](https://github.com/hibohiboo/develop/tree/bd5f0809a4f0ea034a3363ba4570c23d43a1d631/tutorial/lesson/webpack/webpack4)  

## docs

esdocを追加

[この時点のソース](https://github.com/hibohiboo/develop/tree/d2e7e06489f5e52e22ce8d73b87f6912a8f76509/tutorial/lesson/webpack/webpack4)  

## typescript

[参考：ts3](https://qiita.com/vvakame/items/57a0559c45b88b2ae168)


[この時点のソース](https://github.com/hibohiboo/develop/tree/0e31ac98b46a044bfa0150089c91ccf6539299b8/tutorial/lesson/webpack/webpack4)  

### lint

[この時点のソース](https://github.com/hibohiboo/develop/tree/c350a05ad5cef36fdad93817d26bfc3a1263658e/tutorial/lesson/webpack/webpack4)  

## css

### sass
[この時点のソース](https://github.com/hibohiboo/develop/tree/b015d5d66d3c0e1f4b02970687bcfec987852ba9/tutorial/lesson/webpack/webpack4)  

[node-sassでSassファイルをコンパイルする](https://qiita.com/setouchi/items/2f7ae68764abe74934fb)
[超絶・超速のNODE-SASSでSASSコンパイルのすすめ](https://its-office.jp/blog/sass/2018/05/12/node-sass.html)

### postcss

`bin/postcss/autoprefix.sh` : sassから出力されたdist/css/*.cssを置き換える。

[この時点のソース](https://github.com/hibohiboo/develop/tree/b1a0cd64eb5f5041bac8e6ba421ba4809b24e23f/tutorial/lesson/webpack/webpack4)  

[PostCSS まとめ](https://qiita.com/morishitter/items/4a04eb144abf49f41d7d)


### sass-lint
情報が少ない。。

[sass](https://stackoverflow.com/questions/39307087/how-i-should-check-indentation-in-sass-file-with-stylelint)
[sass-lint](https://morizyun.github.io/javascript/node-js-npm-library-sass-lint.html)
[sass-lintのエラールールを日本語で分かるようにした](https://qiita.com/nezurika/items/4cc858ee9ebd6154dd44)

### stylelint

sass記法は対応していなさそう。
sassにこだわりがあるわけではないので、scss記法に直した。

[この時点のソース](https://github.com/hibohiboo/develop/tree/c750f3a4d1ce521851c2d5ad6bef02b9f6d37606/tutorial/lesson/webpack/webpack4)  


[npmのみでSassのstylelint 〜webpackとPostCSS不要編〜](https://qiita.com/pprhr/items/b61f84944e1e869161cc)
[チームで美しくメンテナブルなCSSを書くための 「Stylelint」導入のすすめ](https://www.webprofessional.jp/taking-css-linting-next-level-stylelint/)
[stylelintのorderモジュール選定](https://qiita.com/nabepon/items/4168eae542861cfd69f7)
[実務でstylelintを導入して3ヶ月ぐらいたった感想](https://qiita.com/DesignChips/items/309a8cce0d744f2dfef6)
[stylelintとBackstopJSで安全にcssを書ける環境を作った](https://devblog.thebase.in/entry/2018/06/06/110000)

## elm

最初のHTML表示時点でのソース

[この時点のソース](https://github.com/hibohiboo/develop/tree/7e83836e5b0616363f1e53f6a6d9b9d69947be33/tutorial/lesson/webpack/webpack4)  


[elm ドキュメント 日本語版](https://guide.elm-lang.jp/)

### optimized調査

100kb -> 15kb まで圧縮

[この時点のソース](https://github.com/hibohiboo/develop/tree/7e83836e5b0616363f1e53f6a6d9b9d69947be33/tutorial/lesson/webpack/webpack4)  

[How to optimize Elm code](https://elm-lang.org/0.19.0/optimize)


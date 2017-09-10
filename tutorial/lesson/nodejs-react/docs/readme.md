# nodejsとReactアプリケーション

## eslint

構文チェックツール。

### .eslintrc

設定ファイル。

```
{
  "extends": "standard"
}
```

### standard

コーディング規約。ECMAScriptの標準というわけではない。  
セミコロンつけない派。

### オプション

#### --fix

構文チェックの前に、自動で整形できる部分を整形してくれる。  
たとえば、セミコロンの有無など。

## babel

トランスパイルツール。

### オプション

#### -o

出力先のファイルを指定する。

```
babel bmi.js -o bmi.out.js
```

#### -d

ディレクトリ内のファイルを一気に変換

```
babel src -d dist
```

#### -w, --watch

更新を認識してトランスパイルを実行する

dockerで使用するときは、通常ではフォルダの更新を認識できないため、
環境変数`CHOKIDAR_USEPOLLING=true`を設定する。

#### --compact=true

余分な改行やコメントを削除する。

#### --source-maps

ソースマップを出力する。

ソースマップとは、Webブラウザが対応する機能。  
ソースマップのファイルをブラウザが自動的に認識し、エラーが出たときなどに変換前のソースコードの位置を教えてくれる。

### .babelrc

```
{"presets":["es2015"]}
```

es2015で追加された規約をそれ以前の環境でも使用できるようにトランスパイルする。

* アロー関数
* import/export

## flow

静的チェック。

数値がくるべきところに文字列などをチェックする。

## 参考

[共有設定でらくらく ESLint][*1]
[Docker cpコマンドでホスト・コンテナ間のファイルのコピーをする][*2]
[Flowによる型チェックでJavaScriptのつまらないミスを防ぐ方法][*3]
[jest][*4]


[*1]:http://qiita.com/mysticatea/items/dc35ced6bd5e782f50cd
[*2]:http://unskilled.site/docker-cp%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%A7%E3%83%9B%E3%82%B9%E3%83%88%E3%83%BB%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E9%96%93%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E3%82%B3/
[*3]:https://www.webprofessional.jp/writing-better-javascript-with-flow/
[*4]:https://facebook.github.io/jest/docs/en/getting-started.html
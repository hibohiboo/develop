
## 参考

## Creating a Single Page Application

以下を実行すると落ちてしまう。

```Dockerfile
FROM node:7.1.0
WORKDIR /my_react
RUN npm init -y
RUN npm install -g create-react-app
RUN create-react-app hello-world
WORKDIR /my_react/hello-world
```

```docker-compose.yml
react:
  build: ./react
  command: [npm, start]
```

```bash
$ docker-compose build
$ docker-compose up
```

## Hello world

webpack + express で試してみる

ディレクトリ構成は以下

```bash
webpack                     # Reactのトランスパイルを行うビルドツール
  - Dockerfile
  - package.json            # npmのモジュールを管理・スクリプトの設定
  - webpack.config.babel.js # webpackの設定ファイル。babelを利用してes6で記述可
  - .babelrc                # babelによるトランスパイルの設定ファイル
express                     # サーバー
  - Dockerfile
src
  - app.js                  # webpackのエントリポイント。このファイルをトランスパイルする。
myapp
  - views                   # ビューファイル。
    - error.jade            # express-generatorによって作成されたものを上書きする。
    - index.jade            # index.jadeがホームに表示されるhtmlファイルとなる。
    - layout.jade           # index.jadeの使用するテンプレート
dist                        # webpackによって生成されるファイル群
  - .gitignore              # gitの管理外とする
  - bundle.js               # webpackによって生成されるファイル
docker-compose.yml          # Dockerの設定ファイル
```

サーバー。express-generatorを使った構成。

```express/Dockerfile
FROM node:7.1.0
WORKDIR /my_express
RUN npm init -y
RUN npm install express-generator -g
RUN express myapp
WORKDIR /my_express/myapp
RUN npm install body-parser --save
RUN npm install cookie-parser --save
RUN npm install debug --save
RUN npm install express@5.0.0-alpha.2 --save
RUN npm install jade --save
RUN npm install morgan --save
RUN npm install serve-favicon --save
```

ビルドツール。Reactをインストール。es6を使うための設定も一緒に。  
install と iは同じ意味。

```webpack/Dockerfile
FROM node:7.1.0
WORKDIR /my_webpack
RUN npm init -y
RUN npm i --save-dev webpack@2.1.0-beta.26
RUN npm i --save babel-polyfill
RUN npm i --save-dev babel-core 
RUN npm i --save-dev babel-loader
RUN npm i --save-dev babel-preset-es2015
RUN npm i --save-dev babel-preset-stage-0
RUN npm i --save-dev babel-preset-react
RUN npm i --save react
RUN npm i --save react-dom
CMD ["npm", "run", "build"]
```

重要なのは"scripts":{"build":"webpack"}。   
package.jsonを設定したディレクトリでnpm installを行った後に
npm run build とすることでwebpackを利用してトランスパイルが可能。

```package.json
{
  "name": "my_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

トランスパイルを行うbabelの設定。

```.babelrc
{
  "presets": [
    "es2015",
    "stage-0",
    "react"
  ]
}
```

```webpack.config.babel.js
import 'babel-polyfill';

module.exports = {
  entry: './src/app.js',         // app.jsをエントリポイントにしてトランスパイルする。
  output: {
    path: 'dist',                // dist/フォルダにビルドしたファイルを出力する。
    filename: 'bundle.js'        // ビルドするファイルの名前
  },
  resolve: {
    extensions: [".js", ".jsx"]  // 省略できる拡張子。
  },                             //  import h from 'hoge.js' を import h from 'hoge'のように書ける
  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['babel-loader']}, // .js、.jsxの拡張子のファイルにbabel-loaderを利用した
    ]                                               // トランスパイルを行う
  }
};
```

```docker-compose.yml
server:
  build: ./express
  volumes:
   - ./myapp/views:/my_express/myapp/views
   - ./dist:/my_express/myapp/public/javascripts
  ports:
    - "80:3000"
  command: [node, bin/www]

webpack:
  build: ./webpack
  volumes:
   - ./src:/my_webpack/src
   - ./dist:/my_webpack/dist
   - ./webpack/package.json:/my_webpack/package.json
   - ./webpack/webpack.config.babel.js:/my_webpack/webpack.config.babel.js
   - ./webpack/.babelrc:/my_webpack/.babelrc
  command: [npm, run, build]
```

Reactを使ったjsファイル。

```app.js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

トランスパイルをしたjsファイルを読み込むhtmlテンプレート。  
ポイントは最後にjsファイルを読み込むこと。  
headで読み込んだりするとまだdomが出来ていないので実行がうまくいかない。

```index.jade
extends layout

block content
  p Welcome to #{title}
  div#root
  script(src='/javascripts/bundle.js')
```

dockerの設定ファイル。サーバーとビルドツール両方の設定を行う。

```docker-compose.yml
server:
  build: ./express
  volumes:
   - ./myapp/views:/my_express/myapp/views
   - ./dist:/my_express/myapp/public/javascripts
  ports:
    - "80:3000"
  command: [node, bin/www]

buildtool:
  build: ./webpack
  volumes:
   - ./src:/my_webpack/src
   - ./dist:/my_webpack/dist
   - ./webpack/package.json:/my_webpack/package.json
   - ./webpack/webpack.config.babel.js:/my_webpack/webpack.config.babel.js
   - ./webpack/.babelrc:/my_webpack/.babelrc
  command: [npm, run, build]
  ```

```bash
$ docker-compose build
$ docker-compose up
```

ブラウザでアクセスするとHello worldが表示される。

## 参考

[react tutorial][*1]
[Webpack + React + ES6の最小構成を考えてみる。][*2]
[webpack-dev-serverの基本的な使い方とポイント][*3]
[意訳][*4]

[*1]:https://facebook.github.io/react/docs/installation.html
[*2]:http://uraway.hatenablog.com/entry/2015/12/25/Webpack_%2B_React_%2B_ES6%E3%81%AE%E6%9C%80%E5%B0%8F%E6%A7%8B%E6%88%90%E3%82%92%E8%80%83%E3%81%88%E3%81%A6%E3%81%BF%E3%82%8B%E3%80%82
[*3]:http://dackdive.hateblo.jp/entry/2016/05/07/183335
[*4]:http://qiita.com/chuck0523/items/caacbf4137642cb175ec#webpack

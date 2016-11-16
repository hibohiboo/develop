# webpack tutorial

[step by stepで始めるwebpack][*1]のチュートリアルをdockerを使って試してみる。

## 構成

ディレクトリ構造

```
tutorial
  - webpack
    - app
      - app.js
      - cats.js
    - webpack
      - Dockerfile
      - package.json
    - docker-compose.yml
```

## webpackの実行まで

app.jsとcats.jsはチュートリアルどおり

```app.js
var cats = require('./cats.js');
console.log(cats);
```

```cats.js
var cats = ['tama', 'kuro', 'tora']
module.exports = cats;
```

webpack用のDockerfile

```Dockerfile
FROM node:7.1.0
WORKDIR /my_webpack
COPY ./package.json package.json 
RUN npm install

CMD ["node", "node_modules/.bin/webpack", "app/app.js", "app/bundle.js"]
```

```package.json
{
  "name": "my_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "2.1.0-beta.26"
  }
}
```

```docker-compose.yml
webpack:
  build: ./webpack
  volumes:
   - ./app:/my_webpack/app
   - ./webpack/package.json:/my_webpack/package.json
```

dockerコンテナの作成・実行を行う。

```bash
$ docker-compose build
$ docker-compose up
```

実行後、appディレクトリ以下にbundle.jsが作成される。

```
app
  - app.js
  - cats.js
  - bundle.js
```

## 実行方法の最適化

package.jsonにビルドスクリプトを記述する。

```package.json
{
  "name": "my_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack app/app.js app/bundle.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "2.1.0-beta.26"
  }
}
```

Dockerfileを修正。

```Dockerfile
FROM node:7.1.0
WORKDIR /my_webpack
RUN npm init -y
RUN npm install --save-dev webpack@2.1.0-beta.26

CMD ["npm", "run", "build"]
```

コンテナを作り直してビルド実行

```bash
$ docker-compose build
$ docker-compose up
```

## ビルドしたjsを実行

```bash
$ docker-compose run --rm webpack node app/bundle.js
```

※ --rm: コンテナを実行し終わったら削除[*](../../provision/docker/compose.md)

## webpack.config.jsの作成

```webpack/webpack.config.js
module.exports = {
  entry: './app/app.js',
  output: {
    filename: './app/bundle.js'
  }
};
```

```docker-compose.yml
webpack:
  build: ./webpack
  volumes:
   - ./app:/my_webpack/app
   - ./webpack/package.json:/my_webpack/package.json
   - ./webpack/webpack.config.js:/my_webpack/webpack.config.js
```

実行。ビルドしなおす必要はない。

```bash
$ docker-compose up
```


## ディレクトリの分割

```
tutorial
  - webpack
    - src
      - app.js
      - cats.js
    - dist
       - .gitignore
       - …ここにbunle.jsが作成される。
    - webpack
      - Dockerfile
      - package.json
    - docker-compose.yml
```

```webpack/webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: './bundle.js'
  }
};
```

```docker-compose.md
module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  }
};
```

distディレクトリのものはgitの管理外にしたいので.gitignoreを入れておく。  
webpackとは関係ない。

```dist/.gitignore
*
!.gitignore
```

実行。

```bash
$ docker-compose up
```

## Loaderサンプル:json

loaderのインストール

```Dockerfile
FROM node:7.1.0
WORKDIR /my_webpack
RUN npm init -y
RUN npm install --save-dev webpack@2.1.0-beta.26
RUN npm install --save-dev json-loader

CMD ["npm", "run", "build"]
```

```src/cats.json
["cats.json", "tama", "kuro", "tora"]
```

```src/app.js
var cats = require('json-loader!./cats.json');
console.log(cats);
```

※ -loaderが省略できなかった。省略すると` require('json!./cats.json');`

```bash
$ docker-compose build
$ docker-compose up
$ docker-compose run --rm webpack node dist/bundle.js
```

## loaderの連結

yaml-loaderのインストール
```Dockerfile
FROM node:7.1.0
WORKDIR /my_webpack
RUN npm init -y
RUN npm install --save-dev webpack@2.1.0-beta.26
RUN npm install --save-dev json-loader
RUN npm install --save-dev yaml-loader

CMD ["npm", "run", "build"]
```

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
  "license": "ISC",
  "devDependencies": {
    "webpack": "2.1.0-beta.26",
    "json-loader":"0.5.4",
    "yaml-loader":"0.4.0"
  }
}
```


yaml-loaderはyamlをjsonとして吐き出す。  
それをjson-loaderが受け取る。

yaml-loader → json → json-loader -> js


```app.js
var cats = require('json-loader!yaml-loader!./cats.json');
console.log(cats);
```

```src/cats.yml
[cats.yml, tama, kuro, tora]
```

```bash
$ docker-compose build
$ docker-compose up
$ docker-compose run --rm webpack node dist/bundle.js
```

## loaderとは

* 通常、require()はJavaScriptを読み込むためのもの
* Loaderを通すことでJavaScript以外のリソースを読み込める
* 最終的にJavaScriptの形に変換

## importsの使用

requireはnode.jsの書き方。  
ES6で使用されるimportにwebpack2から対応。

```src/app.js
import cats from 'json-loader!yaml-loader!./cats.yml';
console.log(cats);
```

```bash
$ docker-compose up
$ docker-compose run --rm webpack node dist/bundle.js
```

## module.Loaderで指定

```webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.yml$/, loader: 'json-loader!yaml-loader'}
    ]
  }
};
```

```app.js
import cats from './cats.yml';
console.log(cats);
```

ここでも`-loader`を省略しようとすると動かないもよう。

preLoaderやpostLoaderを指定することも可能。

1. module.preLoaders（設定ファイル)
1. module.Loaders（設定ファイル)
1. require内のLoader（ソースコード)
1. module.postLoaders（設定ファイル)

## loaderの配列での指定

上のwebpack.config.jsと同義。loaderをloadersにすると配列で指定可能。

```webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.yml$/, loaders: ['json-loader', 'yaml-loader']}
    ]
  }
};
```

## 拡張子の省略

ymlを省略出来るようにしてみる。

```webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".yml"]
  },
  module: {
    loaders: [
      {test: /\.yml$/, loaders: ['json-loader', 'yaml-loader']}
    ]
  }
};
```

### デフォルト

特に指定しなかった場合は`["", ".webpack.js", ".web.js", ".js"]`がデフォルトで設定される。

### ファイルを探す順序

配列に書かれた順番で探索していく。

1. catsのファイルを探しにいく -> 見つからない
1. cats.webpack.jsのファイルを探しにいく -> 見つからない
1. cats.web.jsのファイルを探しにいく -> 見つからない
1. cats.jsのファイルを探しにいく -> 見つかった！ -> require('./cats.js')として扱う。

### 省略のメリット・デメリット

どのファイルを読み込んでいるのか分かりくくなる反面、、
疎結合となる。

## プラグインの利用

HTMLを自動生成するプラグインと圧縮するプラグインを使用する。
圧縮はwebpack本体に同梱されているプラグイン。

```Dockerfile
FROM node:7.1.0
WORKDIR /my_webpack
RUN npm init -y
RUN npm install --save-dev webpack@2.1.0-beta.26
RUN npm install --save-dev json-loader
RUN npm install --save-dev yaml-loader
RUN npm install --save-dev html-webpack-plugin

CMD ["npm", "run", "build"]
```

```webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".yml"]
  },
  module: {
    loaders: [
      {test: /\.yml$/, loaders: ['json-loader', 'yaml-loader']}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Sample Page'
    })
  ]
};
```

## ソースマップの使用

webpack2になってデフォルトの仕様が変わっている模様。

```webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".yml"]
  },
  module: {
    loaders: [
      {test: /\.yml$/, loaders: ['json-loader', 'yaml-loader']}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Sample Page'
    })
  ],
  devtool: '#cheap-module-eval-source-map'
};
```

## babelの利用

[webpackとbabelでES6コードをさくっと書く][*2]を参考にして、
es6がwebpackで書けるように試してみる。

少しディレクトリ構成を変えた

```
config
  - webpack.config.babel.js
  - .babelrc
src
  - app.js
  - cats.yml
  - es6.js
webpack
  - Dockerfile
  - package.json
```

```Dockerfile
FROM node:7.1.0
WORKDIR /my_webpack
RUN npm init -y
RUN npm install --save-dev webpack@2.1.0-beta.26
RUN npm install --save-dev json-loader
RUN npm install --save-dev yaml-loader
RUN npm install --save-dev html-webpack-plugin
RUN npm i --save babel-polyfill
RUN npm i --save-dev babel-core 
RUN npm i --save-dev babel-loader
RUN npm i --save-dev babel-preset-es2015
RUN npm i --save-dev babel-preset-stage-0
RUN npm i --save-dev babel-plugin-add-module-exports

CMD ["npm", "run", "build"]
```

```docker-compose.yml
webpack:
  build: ./webpack
  volumes:
   - ./src:/my_webpack/src
   - ./dist:/my_webpack/dist
   - ./webpack/package.json:/my_webpack/package.json
   - ./config/webpack.config.babel.js:/my_webpack/webpack.config.babel.js
   - ./config/.babelrc:/my_webpack/.babelrc
```

```webpack.config.babel.js
import 'babel-polyfill';

// コンテナ中では/my_webpack/webpack.config.babel.jsに配置

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".js", ".yml"]
  },
  module: {
    loaders: [
      {test: /\.yml$/, loaders: ['json-loader', 'yaml-loader']},
      {test: /\.js$/, loaders: ['babel-loader']},
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Sample Page'
    })
  ],
  devtool: '#cheap-module-eval-source-map'
};
```

```.babelrc
{
  "presets": [
    "es2015",
    "stage-0"
  ],
  "plugins": [
    "add-module-exports"
  ]
}
```

```app.js
import cats from './cats.yml';
import es6 from './es6';
console.log(cats);
```

```es6.js
import 'babel-polyfill';

const sleep = (msec) => new Promise((resolve) => {
  setTimeout(resolve, msec);
});

(async () => {
  console.log('start');
  await sleep(2000);
  console.log('end');
})();
```

```bash
$ docker-compose build
$ docker-compose up
$ docker-compose run webpack node ./dist/bundle.js
```

### export default

add-module-exportsがある

```js
// a.js
export default 'hoge';
```

```js
// b.js
import a from './a.js';
console.log(a); // 'hoge'
```

ない

```js
// a.js
export default 'hoge';
```

```js
// b.js
import a from './a.js';
console.log(a); // { default: 'hoge' }
```

## 参考

[step by stepで始めるwebpack][*1]
[webpackとbabelでES6コードをさくっと書く][*2]
[webpack.config.jsの読み方、書き方][*3]
[webpackを使い倒す][*4]
[参考：webpack + babel + react][*5]


[*1]:http://qiita.com/howdy39/items/48d85c430f90a21075cd
[*2]:http://geta6.hatenablog.com/entry/2016/04/05/165201
[*3]:http://dackdive.hateblo.jp/entry/2016/04/13/123000
[*4]:http://thujikun.github.io/blog/2014/12/07/webpack/
[*5]:https://github.com/alicoding/react-webpack-babel


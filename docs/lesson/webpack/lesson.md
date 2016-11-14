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
import {cats} from 'json-loader!yaml-loader!./cats.yml';
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

ここでも`-loader`を省略しようとすると動かないもよう。

preLoaderやpostLoaderを指定することも可能。

1. module.preLoaders（設定ファイル)
1. module.Loaders（設定ファイル)
1. require内のLoader（ソースコード)
1. module.postLoaders（設定ファイル)

## 参考

[step by stepで始めるwebpack][*1]

[*1]:http://qiita.com/howdy39/items/48d85c430f90a21075cd
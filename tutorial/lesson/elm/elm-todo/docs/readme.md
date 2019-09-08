# Redux ExampleのTodo ListをはじめからていねいにをElmで
## 概要

[Redux ExampleのTodo Listをはじめからていねいに(1)][*1]を以下のパターンで試した。

* [Redux ExampleのTodo ListをはじめからていねいにVue.jsで(1)][*2]
* [Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(1)][*3]
* [MithrilのTodo ListをはじめからていねいにTypescriptで(1)][*4]
* [Mithril + Redux のTodo ListをTypescriptで(1)][*5]

Elmでも同様の手順で試してみる。

## 環境

* Windows 10
* Vagrant 2.2.5
* virtualbox 6.0.10
* Ubuntu 18.04 LTS (Bionic Beaver)
* Docker version 18.09.5, build e8ff056
* docker-compose version 1.24.0, build 0aa59064

仮想環境のIPは192.168.50.10に指定。

ブラウザはchromeで確認。

## ディレクトリ構成(Hello world時)

```
.
├── bin
├── docker
│   ├── config
│   ├── docker-compose.yml
│   │   ├── babel.config.js
│   │   └── webpack.config.js
│   └── elm-todo
│       └── Dockerfile
├── elm.json
├── public
│   └── index.html
└── src
    ├── Main.elm
    └── index.js
```


[この時点のソース](https://github.com/hibohiboo/develop/tree/4c52628895100996f09775b8b631ca65b87e5b1c/tutorial/lesson/elm/elm-todo)

## ビルドツール

```dockerfile:docker/elm-todo/Dockerfile
FROM node:12.10.0
# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

## for js
### babel
RUN yarn add --dev @babel/core \
  @babel/preset-env

RUN yarn add --dev @babel/cli

## elm
RUN yarn add --dev elm
RUN yarn add --dev elm-format
RUN yarn add --dev elm-minify
RUN yarn add --dev elm-webpack-loader

RUN yarn add --dev elm-test

## webpackインストール
RUN yarn add --dev webpack
RUN yarn add --dev webpack-cli
RUN yarn add --dev webpack-dev-server

## plugin
RUN yarn add --dev copy-webpack-plugin
RUN yarn add --dev html-webpack-plugin

### loaders
RUN yarn add --dev babel-loader
RUN yarn add --dev html-loader
RUN yarn add --dev elm-webpack-loader
RUN yarn add --dev elm-hot-webpack-loader
```

```yaml:docker/docker-compose.yml
version: '3'
services:
  elm-todo:
    build: ./elm-todo
    volumes:
      - ../src:/app/src
      - ../public:/app/public
      - ../dist:/app/dist
      - ../elm.json:/app/elm.json
      - ./config/webpack.config.js:/app/webpack.config.js
      - ./config/babel.config.js:/app/babel.config.js
      # packageのキャッシュ
      - cacheGardenElmStuffStarter:/app/elm-stuff
      - cacheGardenDotElmStarter:/root/.elm
    ports:
      - 3000:3000
    command: [yarn, webpack-dev-server, --hot, --colors, --port, '3000', --host, '0.0.0.0', ]

volumes:
  # elmのpackageを毎回ダウンロードしなくてもよいように、キャッシュを行う。2か所のキャッシュが必要。
  cacheGardenElmStuffStarter: 
  cacheGardenDotElmStarter:
```

```js:docker/config/babel.config.js
const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'entry',
    },
  ],
];

// sourceType: scriptにしないと、babelが グローバルの this を void 0 に変えてしまう
const overrides = [{
  test: /Main\.js$/,
  sourceType: 'script',
}];
module.exports = { presets, overrides };
```

```js:docker/config/webpack.js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      chunks: ['index'],
    }),
  ],
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.elm'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          { loader: 'elm-hot-webpack-loader' },
          {
            loader: 'elm-webpack-loader',
            options: {
              debug: false,
              forceWatch: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    progress: true,
    inline: true,
    stats: 'errors-only',
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
};
```

```json:elm.json
{
  "type": "application",
  "source-directories": [
    "src"
  ],
  "elm-version": "0.19.0",
  "dependencies": {
    "direct": {
      "elm/browser": "1.0.1",
      "elm/core": "1.0.2",
      "elm/html": "1.0.0",
      "elm/json": "1.1.3"
    },
    "indirect": {
      "elm/time": "1.0.0",
      "elm/url": "1.0.0",
      "elm/virtual-dom": "1.0.2"
    }
  },
  "test-dependencies": {
    "direct": {},
    "indirect": {}
  }
}
```


## 参考

[Redux ExampleのTodo Listをはじめからていねいに(1)][*1]
[Redux ExampleのTodo ListをはじめからていねいにVue.jsで(1)][*2]
[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(1)][*3]
[MithrilのTodo ListをはじめからていねいにTypescriptで(1)][*4]
[Mithril + Redux のTodo ListをTypescriptで(1)][*5]


[*1]:https://qiita.com/xkumiyu/items/9dfe51d2bcb3bdb06da3
[*2]:https://qiita.com/hibohiboo/items/e3030350ecc83cb2c3bc
[*3]:https://qiita.com/hibohiboo/items/e344d2bbbaaab0ba8a66
[*4]:https://qiita.com/hibohiboo/items/7ae89f840302882cf1d3
[*5]:https://qiita.com/hibohiboo/items/335ba837425978eb5f4a
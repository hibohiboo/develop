# redux todo

## 概要

dockerを利用してビルドツールを準備し、
[Redux ExampleのTodo Listをはじめからていねいに][*1]を実行できる環境を作る。  

## 環境

* windows10
* vagrant1.8
* virtualbox5.0
* ubuntu-16.04
* docker1.12
* docker-compose1.8

仮想環境のIPは192.168.50.10に指定。

ブラウザはfirefoxで確認。

## ディレクトリ構成

```yaml
redux-todo
  - bin # docker-composeの操作をシェル化
    - start.sh # 開発サーバの起動
    - build.sh # dist内にjsファイルをビルド
    - bash.sh  # コンテナ内にログイン
    - container_build.sh # コンテナの再作成
    - remove_all_container.sh # 全てのコンテナの削除
  - public # 開発サーバのベースとなるフォルダ
    - index.html # 開発サーバのホーム。
  - src
    - app.js     # エントリーポイント
    - components # Reactコンポーネント
      - App.js
  - webpack # ビルドツール
    - Dockerfile              # コンテナの環境設定ファイル
    - package.json            # コンテナ内にコピーされるnpm設定ファイル
    - webpack.config.babel.js # ビルドツールの設定
    - .babelrc                # ビルドツールで利用するトランスパイラの設定
  + dist   # ビルドされたファイルの格納先
  - docker-compose.yml # コンテナ起動時設定ファイル
```

## ビルドツール

Webpack + babelを使用。

```yaml:docker-compose.yml
# buildtoolというコンテナ名で作成
buildtool:
  # webpackディレクトリ内のDockerfileビルド
  build: ./webpack
  # webpackを使用するディレクトリを共有する。
  volumes:
   # ビルドするソースファイル
   - ./src:/my_webpack/src
   # ビルドファイルの出力先
   - ./dist:/my_webpack/dist
   # 開発用サーバのホームページに使用するhtml用ディレクトリ
   - ./public:/my_webpack/public
   # コンテナ上のpackage.jsonを上書き
   - ./webpack/package.json:/my_webpack/package.json
   # webpackの設定ファイル
   - ./webpack/webpack.config.babel.js:/my_webpack/webpack.config.babel.js
   # babelの設定ファイル
   - ./webpack/.babelrc:/my_webpack/.babelrc
  # ホストのポート8080をコンテナのポート8080にポートフォワーディング
  ports:
    - "8080:8080" # ホスト:コンテナでポート指定
  # docker-compose run を行ったときにコンテナ上で下のコマンドを行う
  command: [npm, run, start]
```


```docker:webpack/Dockerfile
# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:7.2.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_webpack

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# ビルドツール
RUN npm i --save-dev webpack@2.1.0-beta.27

# 開発用サーバ
RUN npm i --save-dev webpack-dev-server@2.1.0-beta.12

# トランスパイラ babel
RUN npm i --save babel-polyfill
RUN npm i --save-dev babel-core 
RUN npm i --save-dev babel-loader

# babelのes6用preset
RUN npm i --save-dev babel-preset-es2015
RUN npm i --save-dev babel-preset-stage-0

# babelのreact用preset
RUN npm i --save-dev babel-preset-react

# jsViewライブラリreact
RUN npm i --save react
RUN npm i --save react-dom

# jsフレームワークredux
RUN npm i --save-dev redux
RUN npm i --save react-redux
```

```json:webpack/package.json
{
  "name": "my_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --display-error-details",
    "start": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.18.2",
    "babel-loader": "^6.2.8",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "babel-preset-stage-0": "^6.16.0",
    "redux": "^3.6.0",
    "webpack": "^2.1.0-beta.27",
    "webpack-dev-server": "^2.1.0-beta.12"
  },
  "dependencies": {
    "babel-polyfill": "^6.16.0",
    "react": "^15.4.1",
    "react-dom": "^15.4.1",
    "react-redux": "^4.4.6"
  }
}
```

```json:webpack/webpack.config.babel.js
import 'babel-polyfill'; // このファイルでes6の記法が使えるようにする
import path from 'path';
import webpack from 'webpack';

module.exports = {
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    javascript: './app.js'
  },
  // distにビルドしたファイルをbundle.jsの名前で保存
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  // importするときに、以下の配列に登録した拡張子は省略できる
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      // .js, .jsxに一致する拡張子のファイルはbabel-loaderを通してトランスパイル
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        // ビルド時に警告が出るのでcompact=falseを指定
        loader: 'babel-loader?compact=false',
        include: path.join(__dirname, 'src'),
      }
    ]
  },
  // hot loadを有効にするためのプラグイン
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // source-mapを出力して、ブラウザの開発者ツールからデバッグできるようにする。
  devtool: '#cheap-module-eval-source-map',
  // 開発サーバの設定
  devServer: {
    // public/index.htmlをデフォルトのホームとする
    contentBase: './public',
    inline: true,
    port: 8080,
    // dockerのコンテナ上でサーバを動かすときは以下の設定で全ての接続を受け入れる
    host:"0.0.0.0",
    // hot loadを有効にする
    hot: true,
  },
  // vagrantの仕様でポーリングしないとファイルの変更を感知できない
  watchOptions: {
    aggregateTimeout: 300,
    // ５秒毎にポーリング
    poll: 5000
  }
};
```

```json:webpack/.babelrc
{
  "presets": [
    "react",
    "es2015",
    "stage-0"
  ]
}
```

## 開発サーバ用html

開発サーバにはwebpack-dev-serverを利用する。

```html:public/index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>Document</title>

</head>
<body>
  <!-- reactのコンポーネントを#root以下に作成する設定にしている -->
  <div id="root"></div>
  <!-- ビルドされたbundle.jsを読み込む -->
  <script src="bundle.js"></script>
</body>
</html>
```

## Hello world

[Hellor world](http://qiita.com/xkumiyu/items/9dfe51d2bcb3bdb06da3#1-hello-world)
では、storeを作成しなくてもとりあえず動くと書いてあるが、firefoxでは動かない。

chromeなら動作する。

```js:src/app.js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todo from './reducers'
import App from './components/App'

// stateを保存するstoreを作成。
let store = createStore(todo)

render(
  // providerにstoreは必須
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

```js:src/components/App.js
import React from 'react'

const App = () => (
  <div>
    Hello World!
  </div>
)

export default App
```

```js:src/actions/index.js
let nextTodoId = 0;
// actionを発行する関数
export const addTodo = (text) => {
  // actionはtypeを持つオブジェクト
  // この場合、アクションタイプはADD_TODO
  // データはidとtextとなる。
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}
```

```js:src/reducers/index.js
// 現在のstateとactionを受け取り、新しいstateを返す関数
const todo = (state, action) => {
  switch (action.type) {
    // actionTypeがADD_TODOのとき、
    // { id: action.id, text: action.text }
    // という新しいstateを返す
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text
      }
    // それ以外のときはstateを変化させない
    default:
      return state
  }
}
export default todo
```

## shell

docker-composeのコマンドを毎回タイプするのが面倒なのでシェルにしている。

開発サーバの起動。

```bash:bin/start.sh
#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。 docker-compsoe.ymlに記載されたcmdが実行される。
cd $bin_dir/../ && docker-compose up
```

webpack-dev-serverではビルドファイルは出力されない。  
ビルドファイルを出力するスクリプトの起動。

```bash:bin/build.sh
#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeを起動し、コンテナ内で npm run buildを実行
cd $bin_dir/../ && docker-compose run buildtool npm run build
```

コンテナ内の環境を確かめたい時用。

```bash:bin/bash.sh
#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../ && docker-compose run buildtool /bin/bash
```

コンテナを作成し直したい場合。

```bash:container_build.sh
#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。 docker-compsoe.ymlに記載されたcmdが実行される。
cd $bin_dir/../ && docker-compose build
```

コンテナが不要になった場合。

```bash:bin/remove_all_container.sh
#!/bin/bash

# 全てのdockerコンテナを止める
docker stop $(docker ps -q)

# 全てのdockerコンテナを削除
docker rm $(docker ps -aq)
```

## 実行

開発用サーバを起動。

```bash
./bin/start.sh
```

ブラウザでアクセスして確認できる。

http://192.168.50.10:8080/

## 参考

[Redux ExampleのTodo Listをはじめからていねいに][*1]

[*1]:http://qiita.com/xkumiyu/items/9dfe51d2bcb3bdb06da3
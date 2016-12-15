
[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(1)][*2]の続き。  
[Redux ExampleのTodo Listをはじめからていねいに(2)][*1]をtypescriptで書いたメモ。

学習中のメモですので、間違いや指摘点あればコメントいただけるとうれしいです。

## ここまでのディレクトリ構成

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
    - app.tsx     # エントリーポイント
    - actions     # Action(Actionの発行)
      - index.tsx
    - components  # Presentational Components(Reactのコンポーネント)
      - App.tsx
      - Todo.tsx
      - TodoList.tsx
    - containers  # Container Components(Reduxのコンポーネント)
      - AddTodo.tsx
      - VisibleTodoList.tsx
    - reducers    # Reducer(stateの変更)
      - index.tsx
      - todos.tsx
    - states      # stateの定義( typescriptにするときに自分が追加したディレクトリ )
      - TodoState.tsx
  - webpack # ビルドツール
    - Dockerfile              # コンテナの環境設定ファイル
    - package.json            # コンテナ内にコピーされるnpm設定ファイル
    - webpack.config.babel.js # ビルドツールの設定
    - tsconfig.json           # ビルドツールで利用するTypescript設定
  + dist   # ビルドされたファイルの格納先
  - docker-compose.yml # コンテナ起動時設定ファイル
```

## 動作環境の更新

node.jsとwebpackのバージョンが上がっていたので更新した。

```docker:webpack/Dockerfile
# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:7.2.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_webpack

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# jsViewライブラリreact
RUN npm i --save react
RUN npm i --save react-dom

# jsフレームワークredux
RUN npm i --save-dev redux
RUN npm i --save react-redux

# typescript
RUN npm i --save-dev typescript@next

# ビルドツール
RUN npm i --save-dev webpack@2.2.0-rc.0

# 開発用サーバ
RUN npm i --save-dev webpack-dev-server@2.1.0-beta.12

# webpack用typescript loader
RUN npm i --save-dev ts-loader

# typescriptの型定義ファイル
RUN npm i --save-dev @types/react
RUN npm i --save-dev @types/react-dom
RUN npm i --save-dev @types/redux
RUN npm i --save-dev @types/react-redux
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
  "dependencies": {
    "react": "^15.4.1",
    "react-dom": "^15.4.1",
    "react-redux": "^5.0.1"
  },
  "devDependencies": {
    "@types/react": "^0.14.55",
    "@types/react-dom": "^0.14.19",
    "@types/react-redux": "^4.4.35",
    "@types/redux": "^3.6.0",
    "redux": "^3.6.0",
    "ts-loader": "^1.3.2",
    "typescript": "^2.2.0-dev.20161214",
    "webpack": "^2.2.0-rc.0",
    "webpack-dev-server": "^2.1.0-beta.12"
  }
}
```

webpackが以下の警告を出すようになった。

```shell-sesion
buildtool_react_ts_1  | WARNING in asset size limit: The following asset(s) exceed the recommended size limit (250 kB).
buildtool_react_ts_1  | This can impact web performance.
buildtool_react_ts_1  | Assets:
buildtool_react_ts_1  |   vendor.bundle.js (1.07 MB)
buildtool_react_ts_1  |
buildtool_react_ts_1  | WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (250 kB). This can impac
t web performance.
buildtool_react_ts_1  | Entrypoints:
buildtool_react_ts_1  |   typescript (1.08 MB)
buildtool_react_ts_1  |       vendor.bundle.js
buildtool_react_ts_1  |       bundle.js
buildtool_react_ts_1  |
buildtool_react_ts_1  |   vendor (1.07 MB)
buildtool_react_ts_1  |       vendor.bundle.js
buildtool_react_ts_1  |
buildtool_react_ts_1  |
buildtool_react_ts_1  | WARNING in webpack performance recommendations:
buildtool_react_ts_1  | You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
buildtool_react_ts_1  | For more info visit https://webpack.js.org/guides/code-splitting/
buildtool_react_ts_1  | webpack: bundle is now VALID.
```

code-splittingの設定をしたのだけれど、警告はでたまま。  
とりあえず即座に影響はないのでこのまま進める。  
消す方法がわかったら消したい。


```js:webpack/webpack.config.js

var webpack = require('webpack');

module.exports = {
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    typescript: './app.tsx',
    // code-splitting用の設定
    vendor: ['react', 'react-dom', 'redux', 'react-redux']
  },
  // distにビルドしたファイルをbundle.jsの名前で保存
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  // importするときに、以下の配列に登録した拡張子は省略できる
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      // .ts, .tsxに一致する拡張子のファイルはts-loaderを通してトランスパイル
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" }
    ]
  },
  plugins: [
    // hot loadを有効にするためのプラグイン
    new webpack.HotModuleReplacementPlugin(),
    // code-splittingを有効にするプラグイン
    new webpack.optimize.CommonsChunkPlugin({/* chunkName= */name: "vendor", /* filename= */ filename: "vendor.bundle.js"})
  ],
  // source-mapを出力して、ブラウザの開発者ツールからデバッグできるようにする。
  // webpack-dev-serverなら不要？
  // devtool: '#cheap-module-source-map',
  // 開発サーバの設定
  devServer: {
    // public/index.htmlをデフォルトのホームとする
    contentBase: './public',
    // インラインモード
    inline: true,
    // 8080番ポートで起動
    port: 8080,
    // dockerのコンテナ上でサーバを動かすときは以下の設定で全ての接続を受け入れる
    host:"0.0.0.0",
    // hot loadを有効にする
    hot: true
  },
  // vagrantの仕様でポーリングしないとファイルの変更を感知できない
  watchOptions: {
    aggregateTimeout: 300,
    // ５秒毎にポーリング
    poll: 5000
  }
};
```

```html:public/index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>Document</title>

</head>
<body>
  <div id="root"></div>
  <script src="vendor.bundle.js"></script>
  <script src="bundle.js"></script>
</body>
</html>
```

## 1. 完了・未完了を表すcompletedによってスタイルを変える

### todoにcompleted要素を追加して、とりあえず取り消し線を表示する

todos.tsxは`new Todostate()`をしているだけなので今回は変更しない。  
代わりにTodoState.tsxを更新

```tsx:TodoState.tsx
export default class TodoState {
  constructor(
    public id: number,
    public text: string,
    public completed: boolean = false
  ){}
}
```

```tsx:src/components/Todo.tsx
import * as React from 'react';
import {PropTypes} from 'react';

interface IProps {
    completed: boolean;
    text: string;
}

const Todo = ({ completed, text }:IProps) => (
  <li style={{textDecoration: completed ? 'line-through' : 'none'}}>
    {text}
  </li>
);

Todo.prototype.propTypes = {
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo;
```

#### 確認

```tsx:TodoState.tsx
export default class TodoState {
  constructor(
    public id: number,
    public text: string,
    public completed: boolean = true
  ){}
}
```

`completed = true`にしてブラウザでアクセス。




## 参考

[Redux ExampleのTodo Listをはじめからていねいに(2)][*1]  
[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(1)][*2]

[*1]:http://qiita.com/xkumiyu/items/e7e1e8ed6a5d6a6e20dd
[*2]:http://qiita.com/hibohiboo/items/e344d2bbbaaab0ba8a66

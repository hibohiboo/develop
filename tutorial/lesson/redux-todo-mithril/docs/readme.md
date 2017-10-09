# MithrilのTodo ListをはじめからていねいにTypescriptで(1)

## 概要

[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで](https://qiita.com/hibohiboo/items/e344d2bbbaaab0ba8a66)を以前行った。
今回は軽量のvirtual domフレームワークのmithrilでなぞって、どれくらい異なるかを試してみたいと思う。
最近のreduxの流れも追ってみたい。
mvcだと、mithrilはシンプルでけっこうキレイに書けている気がするけど、reduxに載せようと思うとどうか。
[TodoMVC(v0.2)][f*9]
[mithril-todomvc(v1.1, coffee)][f*12]

mithrilもreduxも勉強中なので、間違っていたりもっとよいやり方を知っていたら、教えていただけると幸い。
まずはHello Worldまで。

## 環境

### エディタ
Visual Studio Codeを使用。@typesで定義をインストール。

package.json
```json
{
  "name": "develop",
  "version": "1.0.0",
  "description": "開発用テスト環境",
  "devDependencies": {
    "@types/mithril": "^1.1.9",
    "@types/react": "^16.0.3",
    "@types/redux": "^3.6.0",
    "@types/redux-actions": "^2.2.2",
    "@types/redux-form": "^7.0.2",
    "@types/redux-logger": "^3.0.4",
    "@types/redux-saga": "^0.10.5",
    "tslint": "^4.5.1",
    "typescript": "^2.1.5"
  },
  "license": "MIT",
}
```

### 動作環境

* windows10
* vagrant1.9.7
* virtualbox5.1.26
* ubuntu-16.04
* Docker version 17.06.2-ce, build cec0b72
* docker-compose version 1.16.1, build 6d1ac21

仮想環境は192.168.50.10のIPアドレスで起動。

## ディレクトリ構成

### hello world時

```yaml
redux-todo-mithril
  + bin  # docker-compose省略
  + dist # 出力先
  - docker
    -  config # 各種設定ファイル
      - .babelrc
      - tsconfig.json
      - tslint.json
      - webpack.config.babel.js
    - webpack
      - Dockerfile
    - docker-compose.yml
  - public
    - index.html
  - src
    - components
      - App.tsx
    - app.ts
```

## 設定ファイル

```json:docker/config/.babelrc
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }]
  ],
  "plugins": [
    ["transform-react-jsx", {
        "pragma": "m"
    }]
  ]
}
```

```json: docker/config/tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "esnext",
        "outDir": "./dist",
        "lib": [
            "dom", 
            "es2015"
        ],
        "jsx": "preserve",
        "noImplicitAny": false,
        "strictNullChecks": true,
        "sourceMap": false
    },
    "include":[
        "./src/**/*" 
    ]
}
```

```json:docker/config/tslint.json
{
  "extends": ["tslint:latest", "tslint-config-airbnb"],
	"rules": {
    "strict-boolean-expressions": [true, "allow-boolean-or-undefined"],
    "no-empty-interface": [false],
    "no-submodule-imports": [false]
  },
  "typeCheck": true
}
```

```js:docker/config/webpack.config.babel.js
import webpack from 'webpack';

// 環境変数から本番環境を判断。
const isProduction = process.env.NODE_ENV === 'production';

// source-map : 正確・最小限。コンパイル速度低
// eval-source-map: 正確。コンパイル速度低。再作成速度中。
const devtool = isProduction ? 'source-map' : 'eval-source-map';

// productionの場合
const plugins = isProduction ? 
[
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
    },
  }),
  // code-splittingを有効にするプラグイン
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.mithril.js",
    minChunks: Infinity,}),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
] :
  // 開発用設定。
[
    // hot loadを有効にするためのプラグイン
    new webpack.HotModuleReplacementPlugin(),
    // mithrilをグローバル変数として登録。これをしないとjsxのみのファイルでm not findのエラーとなる
    new webpack.ProvidePlugin({
      m: "mithril",
  })
];

export default {
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    todo: './app.ts',
    // code-splitting用の設定
    vendor: ['mithril', 'redux', 'redux-actions', 'redux-saga']
  },
  output: {
    path: __dirname + '/dist',
		filename: "[name].mithril.js",
  },
  // importするときに、以下の配列に登録した拡張子は省略できる
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      // .ts, .tsxに一致する拡張子のファイルはts-loaderを通してトランスパイル
      { test: /\.tsx?$/, exclude: /node_modules/, loader: ["babel-loader", "ts-loader"] }
    ]
  },
  // プラグイン設定
  plugins,
  // source-mapを出力して、ブラウザの開発者ツールからデバッグできるようにする。
  devtool,
  // 開発サーバの設定
  devServer: {
    // public/index.htmlをデフォルトのホームとする
    contentBase: './public',
    // バンドルしたファイルを/assets/js/フォルダに出力したものとする。
    publicPath: "/assets/js/",
    // インラインモード
    inline: true,
    // 8080番ポートで起動
    port: 8080,
    // dockerのコンテナ上でサーバを動かすときは以下の設定で全ての接続を受け入れる
    host:"0.0.0.0",
    // hot loadを有効にする
    hot: true,
    // ログレベルをinfoに
    clientLogLevel: "info",
  },
  // vagrantの仕様でポーリングしないとファイルの変更を感知できない
  watchOptions: {
    aggregateTimeout: 300,
    // ５秒毎にポーリング
    poll: 5000
  }
};
```

```docker:docker/webpack/Dockerfile
FROM node:8.6.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# typescript
RUN npm i -D typescript

# tslint
RUN npm i -D tslint
RUN npm i -D tslint-config-airbnb

# typedoc
RUN npm i -D typedoc 

# ビルドツール
RUN npm i -D webpack

# 開発用サーバ
RUN npm i -D webpack-dev-server

# es6用トランスパイラ
RUN npm i -D babel-loader
RUN npm i -D babel-core
RUN npm i -D babel-cli
RUN npm i -D babel-preset-es2015
RUN npm i -D babel-preset-env
RUN npm i -D babel-plugin-transform-react-jsx
# async
RUN npm i -D babel-preset-es2017

# webpack用typescript loader
RUN npm i -D ts-loader

# jsViewライブラリmithril
RUN npm i -S mithril

# フレームワーク
RUN npm i -S redux
RUN npm i -S redux-actions
RUN npm i -S redux-saga
RUN npm i -S redux-logger

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tslint\": \"tslint -p 'tsconfig.json' --type-check\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tsc\": \"tsc\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"babel\": \"babel\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"typedoc\": \"typedoc\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"webpack\": \"webpack\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev-server\": \"webpack-dev-server\", /g" /app/package.json
```

```yaml
version: '3'
services:

  # トランスパイル(ts)
  tsc:
    build: ./webpack
    volumes: 
      - ./config/tsconfig.json:/app/tsconfig.json
      - ../src:/app/src
      - ../dist/transpiled-tsc:/app/dist
    command: [npm, run, tsc]

  # トランスパイル(babel)
  babel:
    build: ./webpack
    volumes: 
      - ./config/.babelrc:/app/.babelrc
      - ../dist/transpiled-tsc:/app/src
      - ../dist/transpiled-babel:/app/dist
    depends_on:
      - tsc
    command: [npm, run, babel, --, src, -d, dist]

  # 構文チェック(ts)
  tslint:
    build: ./webpack
    volumes: 
      - ./config/tsconfig.json:/app/tsconfig.json
      - ./config/tslint.json:/app/tslint.json
      - ../src:/app/src
    command: [npm, run, -s, tslint, --, -c, tslint.json, 'src/**/*.ts', 'src/**/*.tsx']

  # Apiドキュメント
  typedoc:
    build: ./webpack
    volumes: 
      - ./config/tsconfig.json:/app/tsconfig.json
      - ../src:/app/src
      - ../dist/apidoc:/app/typedoc
    command: [npm, run, typedoc, --, --target, es6, --jsx, preserve, --ignoreCompilerErrors, --exclude, '**/*.test.ts', --out, ./typedoc/, ./src/]

  # ビルドツール
  webpack:
    build: ./webpack
    volumes:
      - ./config/.babelrc:/app/.babelrc
      - ./config/tsconfig.json:/app/tsconfig.json
      - ./config/webpack.config.babel.js:/app/webpack.config.babel.js
      - ../src:/app/src
      - ../dist/bundle-webpack:/app/dist
      - ../public:/app/public
    command: [npm, run, dev-server]
    ports:
      -  8080:8080
```

## 1. Hello World

```html:public/index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>Todosサンプル</title>
  <script src="assets/js/vendor.mithril.js"></script>
</head>
<body>
  <h1>Todosサンプル</h1>
  <div id="app"></div>
  <script src="assets/js/todo.mithril.js"></script>
</body>
</html>
```

```typescript:src/components/App.tsx
import * as m from 'mithril';
// tslint:disable-next-line: no-duplicate-imports
import { ClassComponent, Vnode } from 'mithril';

interface IAttr {}

/**
 * ハローワールド
 * 
 * @export
 * @class App
 * @implements {ClassComponent<IAttr>}
 */
export default class App implements  ClassComponent<IAttr> {

  /**
   * 
   * @param vnode 
   */
  public view(vnode: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    return (<div> Hello World!!! mithril</div>);
  }
}

```

```typescript:src/app.ts
import * as m from 'mithril';
import App from './components/App';

const root = document.getElementById('app');
m.render(root, m(App));
```

docker-compose upを行い、
`http://192.168.50.10:8080/webpack-dev-server/` もしくは`http://192.168.50.10:8080/`に接続で確認。

[この時点のソース](https://github.com/hibohiboo/develop/tree/73fe5cd8c746f55bbafabda1d423127a87b01062/tutorial/lesson/redux-todo-mithril)

## 2. actionCreatorで発行したactionをreducerに渡してstoreのstateを更新する

### Acitions

```typescript:src/actions/index.ts
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ADD = 'ADD_TODO';

/**
 * id保存用
 */
let nextTodoId = 0;

/**
 * actionを発行する関数。
 * actionは以下のオブジェクト
 * {
 *  type: 'ADD_TODO';
 *  payload: {
 *    id: number;
 *    text: string;
 *  }
 * }
 */
export const addTodo = createAction(ADD,
                                    text => ({ text, id: nextTodoId++ })
);
```

### Reducers

```typescript:src/reducers/index.ts
import { handleActions } from 'redux-actions';
import { ADD } from '../actions';

export class TodoState {
  constructor(
    public id: number,
    public text: string,
  ) {}
}

export default handleActions({
  [ADD]: (state,  { payload }) => {
    // actionTypeがADDのとき、
    // 新しいTodoStateを返す
    return new TodoState(payload.id, payload.text);
  },
},                           new TodoState(0, '')); // 初期状態
```

### Store

```typescript:src/app.ts
import * as m from 'mithril';
import App from './components/App';
import {createStore } from 'redux';
import { addTodo } from './actions'
import reducers from './reducers';
const store = createStore(reducers)

store.dispatch(addTodo('Hello World!'))
console.log(store.getState()) 

const root = document.getElementById('app');
m.render(root, m(App));
```

## 参考

[TodoMVC][f*9]
[mithril(ja)][f*1]  
[mithril(en)][f*2]  
[Vuex(ja)][f*3]  
[Vuex(en)][f*4]  
[React][f*5]
[Angular][f*6]
[Riot(ja)][f*7]
[Polymer][f*8]
[Redux][f*10]
[mithril-redux][f*11]
[mithril-todomvc][f*12]
[redux-sagaで非同期処理と戦う][r*3]  
[redux-actions][r*5]   
[connectを試す][r*6]   
[redux図解][r*7]  
[redux-actionsについて学ぼう][r*1]  
[mithril-redux-starter][r*2]  
[redux-saga][r*4]  
[TypeScript2系のコンパイラのオプション一覧][t*1]  
[Revised Revised TypeScript in Definitelyland][t*2] 
[airbnb][l*1]  
[node規約][l*2]  
[google規約][l*3]  
[ESLint 最初の一歩][l*4]  
[Microsoft Typescript][l*5]  
[TypeScriptのインターフェースに「I」のプリフィクスを付けるのはよくないのか][l*6]  
[tslint][*1]

[f*1]:http://mithril-ja.js.org/index.html
[f*2]:https://mithril.js.org/
[f*3]:https://vuex.vuejs.org/ja/
[f*4]:https://vuex.vuejs.org/en/
[f*5]:https://facebook.github.io/react/
[f*6]:https://angularjs.org/
[f*7]:http://riotjs.com/ja/
[f*8]:https://github.com/Polymer/polymer
[f*9]:http://todomvc.com/
[f*10]:http://redux.js.org/docs/introduction/
[f*11]:https://github.com/colinbate/mithril-redux
[f*12]:https://github.com/reubano/todomvc-mithril

[r*1]:http://grandbig.github.io/blog/2017/01/02/redux-base-4/
[r*2]:https://github.com/colinbate/mithril-redux-starter/blob/master/src/actions.js
[r*3]:https://qiita.com/kuy/items/716affc808ebb3e1e8ac
[r*4]:https://github.com/redux-saga/redux-saga/blob/master/README_ja.md
[r*5]:https://qiita.com/yasuhiro-okada-aktsk/items/a14f7f37262fb6cf0bf8
[r*6]:https://qiita.com/MegaBlackLabel/items/df868e734d199071b883
[r*7]:https://qiita.com/mpyw/items/a816c6380219b1d5a3bf

[t*1]:https://qiita.com/IganinTea/items/f88bea469bff56cfbda6
[t*2]:http://typescript.ninja/typescript-in-definitelyland/index.html

[l*1]:http://mitsuruog.github.io/javascript-style-guide/
[l*2]:http://popkirby.github.io/contents/nodeguide/style.html
[l*3]:https://www38.atwiki.jp/aias-jsstyleguide2/pages/1.html
[l*4]:http://qiita.com/mysticatea/items/f523dab04a25f617c87d
[l*5]:https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
[l*6]:https://saku.io/use-i-as-interface-prefix-in-typescript/

[*1]:https://azriton.github.io/2017/09/16/TypeScript%E3%81%AEtslint.json%E3%82%92%E8%AA%BF%E3%81%B9%E3%82%8B/
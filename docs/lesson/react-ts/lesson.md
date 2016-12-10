# react + typescript tutorial

[Redux ExampleのTodo Listをはじめからていねいに][*5]をTypescriptを使って行ってみたメモ。

## 環境作成

### 動作環境

* windows10
* vagrant1.8
* virtualbox5.0
* ubuntu-16.04
* docker1.12
* docker-compose1.8

仮想環境のIPは192.168.50.10に指定。

ブラウザはchromeで確認。

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
    - app.tsx     # エントリーポイント
    - components # Reactコンポーネント
      - App.tsx
  - webpack # ビルドツール
    - Dockerfile              # コンテナの環境設定ファイル
    - package.json            # コンテナ内にコピーされるnpm設定ファイル
    - webpack.config.babel.js # ビルドツールの設定
    - tsconfig.json           # ビルドツールで利用するTypescript設定
  + dist   # ビルドされたファイルの格納先
  - docker-compose.yml # コンテナ起動時設定ファイル
```

### ビルドツール

Webpackを使用。

```yaml:docker-compose.yml
# buildtool_react_tsというコンテナ名で作成
buildtool_react_ts:
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
   - ./webpack/webpack.config.js:/my_webpack/webpack.config.js
   # typescriptの設定ファイル
   - ./webpack/tsconfig.json:/my_webpack/tsconfig.json
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

# jsViewライブラリreact
RUN npm i --save react
RUN npm i --save react-dom

# jsフレームワークredux
RUN npm i --save-dev redux
RUN npm i --save react-redux

# typescript
RUN npm i --save-dev typescript

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
  "devDependencies": {
    "@types/react": "^0.14.54",
    "@types/react-dom": "^0.14.19",
    "@types/react-redux": "^4.4.35",
    "@types/redux": "^3.6.0",
    "redux": "^3.6.0",
    "ts-loader": "^1.3.0",
    "typescript": "^2.0.10",
    "webpack": "^2.1.0-beta.27",
    "webpack-dev-server": "^2.1.0-beta.12"
  },
  "dependencies": {
    "react": "^15.4.1",
    "react-dom": "^15.4.1",
    "react-redux": "^4.4.6"
  }
}
```

```js:webpack/webpack.config.js
var webpack = require('webpack');

module.exports = {
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    typescript: './app.tsx'
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

```json:webpack/tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": false,
        "jsx": "react"
    }
}
```

### 開発サーバ用html

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

### shell

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
cd $bin_dir/../ && docker-compose run buildtool_ts_react npm run build
```

## Hello world

[Hellor world](http://qiita.com/xkumiyu/items/9dfe51d2bcb3bdb06da3#1-hello-world)


```ts:src/app.tsx
import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(
  <App />,
  // reactのコンポーネントを#root以下に作成する
  document.getElementById('root')
);
```

```ts:src/components/App.tsx
import * as React from 'react';

class App extends React.Component<any, any> {
    render() {
        return <div> Hello World!!! </div>;
    }
}

export default App;
```


## 実行

開発用サーバを起動。

```bash
./bin/start.sh
```

ブラウザでアクセスして確認。

http://192.168.50.10:8080/

## 2. actionCreatorで発行したactionをreducerに渡してstoreのstateを更新する

### Acitions

```ts:src/actions/index.js
import { Action } from 'redux';

export interface AddTodoAction extends Action {
    type: 'ADD_TODO';
    id: number;
    text: string;
}

let nextTodoId:number = 0;

// actionを発行する関数
export function addTodo(text:string) : AddTodoAction {
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

### Reducers

```ts:src/reducers/index.js
import { AddTodoAction } from '../actions';

export class TodoState {
  constructor(
    public id: number,
    public text: string
  ){}
}

// 現在のstateとactionを受け取り、新しいstateを返す関数
const todo = (state: TodoState, action: AddTodoAction) => {
  switch (action.type) {
    // actionTypeがADD_TODOのとき、
    // 新しいTodoStateを返す
    case 'ADD_TODO':
      return new TodoState(action.id, action.text);
    // それ以外のときはstateを変化させない
    default:
      return state
  }
}
export default todo
```

### Store

```ts:app.tsx
// 省略
import { addTodo } from './actions'
let store = createStore(todo)

store.dispatch(addTodo('Hello World!'))
console.log(store.getState()) // => TodoState {id: 0, text: "Hello World!"}
render(
  // 省略
);
```

### ここの時点のソース

[github](https://github.com/hibohiboo/develop/tree/d70140d0de5fe96da19052aec9cb7e0544af2bda/tutorial/lesson/react-ts)

## 3. storeで保持したstateをViewで表示する

### TodoListの作成

TodoStateを他のソースからも参照するので、statesディレクトリを作成してそこに切り分けた。

```ts:states/TodoState.tsx
export default class TodoState {
  constructor(
    public id: number,
    public text: string
  ){}
}
```

```ts:reducers/todos.tsx
import { AddTodoAction } from '../actions';
import TodoState from '../states/TodoState';

// 現在のstateとactionを受け取り、新しいstateを返す関数
const todo = (state:any, action: AddTodoAction) => {
  switch (action.type) {
    case 'ADD_TODO':
      return new TodoState(action.id, action.text);
    // それ以外のときはstateを変化させない
    default:
      return state
  }
};

const todos = (state: TodoState[] = [], action: AddTodoAction) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    default:
      return state
  }
};

export default todos;
```

### ContainerとComponent

Stateless Functionsで書くのがよいらしいが、Typescriptだとどうすべきか。[*9][*9]  
2つの書き方を試してみる。  

Todo.tsxはStateless Function。

```ts:components/Todo.tsx
import * as React from 'react';
import {PropTypes} from 'react';

interface IProps {
    text: string;
}

// propsを展開して分割代入
const Todo = ({ text }:IProps) => (
  <li>
    {text}
  </li>
);

// Todo.propTypesとするとProperty 'propTypes' does not exist on typeのエラーがでる。
Todo.prototype.propTypes = {
  text: PropTypes.string.isRequired
}

export default Todo;
```

TodoListはReact.Componentをextend。


```ts:TodoList.tsx
import * as React from 'react';
import Todo from './Todo';
import TodoState from '../states/TodoState';

// PropsをReact.Props<設定予定のコンポーネント>で継承して作ると補完が効く
// パラメータが足りないとエラーを吐く
interface IProps extends React.Props<TodoList> {
    todos: TodoState[];
}

class TodoList extends React.Component<IProps, {}> {
  constructor(public props: IProps) {
    super(props);
  }
  render(){
    return (
      <ul>
        {this.props.todos.map((todo) =>
          <Todo
            key={todo.id}
            {...todo}
          />
        )}
      </ul>
    );
  }
 }

 export default TodoList;
```

### コンポーネントをconnectするコンテナ

```ts:containers/VisibleTodoList.tsx
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import TodoState from '../states/TodoState';

interface IStateToProps {
    todos: TodoState[];
}

const mapStateToProps = (store:any): IStateToProps=> {
  return { todos: store.todos };
};

const VisibleTodoList = connect(
  mapStateToProps
)(TodoList);

export default VisibleTodoList;
```

### ようやくブラウザに表示

```ts:App.tsx
import * as React from 'react';
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <VisibleTodoList />
  </div>
);

export default App;
```

```ts:app.tsx
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { createStore } from 'redux';
import todo from './reducers';
import { addTodo } from './actions'

let store = createStore(todo);
store.dispatch(addTodo('Hello React!'));
store.dispatch(addTodo('Hello Redux!'));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  // reactのコンポーネントを#root以下に作成する
  document.getElementById('root')
);
```

この時点でのソース  
[github](https://github.com/hibohiboo/develop/tree/e6227b28660d249bc8a9d6ddbe45ce937005924d/tutorial/lesson/react-ts)

## 4. フォームからtodoを追加



## 参考

[Redux ExampleのTodo Listをはじめからていねいに][*5]  
[ReduxのTodo Listをdockerを使ってビルドする準備][*6]  
[TypeScriptを使ってreactのチュートリアルを進めると捗るかなと思った。][*1]  
[React + TypeScript + Webpackの最小構成][*2]  
[npmでTypeScriptの型定義を管理できるtypesパッケージについて][*3]  
[TypeScript2.0での型定義ファイルの管理][*4]  
[Redux typed actions でReducerを型安全に書く (TypeScriptのバージョン別)][*7]  
[Reactチュートリアル: Intro To React【日本語翻訳】][*8]  
[Stateless な React Component の記法をまとめてみた][*9]  
[もうはじめよう、ES6~ECMAScript6の基本構文まとめ(JavaScript)~][*10]  
[React JSX with TypeScript(1.6)][*10]  
[TypeScript 1.8 のString literal typesでReactのPropを静的検証][*12]  
[TypeScript, React and Redux][*13]
[TypeScriptでReactを書く(3)：propTypes][*14]

[*1]:http://qiita.com/m0a/items/d723259cdeebe382b5f6
[*2]:http://qiita.com/uryyyyyyy/items/63969d6ed9341affdffb
[*3]:http://qiita.com/laco0416/items/ed1aadf335f12cd3618d
[*4]:http://sourcechord.hatenablog.com/entry/2016/09/28/005836
[*5]:http://qiita.com/xkumiyu/items/9dfe51d2bcb3bdb06da3
[*6]:http://qiita.com/hibohiboo/items/de698113721a693c4eed
[*7]:http://qiita.com/wadahiro/items/7c421b668f28a99e2a29
[*8]:http://mae.chab.in/archives/2943
[*9]:http://qiita.com/kotaroito/items/e36ebac185b6b1d8538d
[*10]:http://qiita.com/takeharu/items/cbbe017bbdd120015ca0
[*11]:http://qiita.com/Quramy/items/70f97e68d21859d91ed8
[*12]:http://qiita.com/wadahiro/items/b54e115bdd208641c22f
[*13]:http://www.mattgreer.org/articles/typescript-react-and-redux/
[*14]:http://qiita.com/KeitaMoromizato/items/5e8503a87cd2b5da9213
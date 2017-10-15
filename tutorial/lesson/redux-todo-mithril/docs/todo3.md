# Mithril + Redux のTodo ListをTypescriptで

[MithrilのTodo ListをはじめからていねいにTypescriptで](https://qiita.com/hibohiboo/items/7ae89f840302882cf1d3)で基本のTodoListを作った。
ここに、[MithrilTodoMVC][*1]に相当する機能を付け加えていきたい。

## storageの実装

dispatch -> reducer -> store -> viewの流れに、redux-sagaを加える。

dispath -> saga -> reducer -> store -> view の流れにして、sagaで保存をする。

### 環境の準備

redux-sagaでyieldを使用するため、babel-polyfillを追加。

```docker/webpack/Dockerfile
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
RUN npm i -S babel-polyfill

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
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tsc\": \"tsc -p tsconfig.json \",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"babel\": \"babel\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"typedoc\": \"typedoc\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"webpack\": \"webpack\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev-server\": \"webpack-dev-server\", /g" /app/package.json
```

vendorにbabel-polyfillを追加。

```js:docker/config/webpack.config.js
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
    vendor: ['mithril', 'redux', 'redux-actions', 'redux-saga', 'babel-polyfill']
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

### idの作り方の変更

保存したファイルを読み込んだ時、今の実装だと再びidが0から発番されて、重複したidができてしまう。
todomvcを参考にして変更

```ts:src/actions/todos.ts
import { Action } from 'redux';
import { createAction } from 'redux-actions';
export const ADD = 'ADD_TODO';
export const TOGGLE = 'TOGGLE_TODO';
export interface IAddTodoAction extends Action {
  type: 'ADD_TODO';
  payload: {
    text: string;
  };
}
export interface IToggleTodoAction extends Action {
  type: 'TOGGLE_TODO';
  payload: {
    id: number;
  };
}
export const addTodo    = createAction(ADD,    (text: string) => ({ text}));
export const toggleTodo = createAction(TOGGLE, (id: number) => ({ id }));
```

```ts:src/models/TodoState.ts
const uniqueId = (() => {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
})();

export default class TodoState {
  public id: number;
  public text: string;
  public completed: boolean = false;
  constructor(data) {
    this.id = uniqueId();
    this.text = data.text;
    this.completed = data.completed || false;
  }
}
```

### storageを追加。

```ts:src/browser/storage.ts
const STORAGE_ID = 'todos-mithril';
export async function get() {
  return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]'); // tslint:disable-line
}
export async function put(todos) {
  localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
}
```

### actionを追加

```ts:src/actions/storage.ts
import { createAction } from 'redux-actions';

export const GET_REQUEST = 'TODO_LIST_GET_REQUESTED';
export const getRequsetTodoList = createAction(GET_REQUEST);

export const GET_FAILED = 'TODO_LIST_GET_FAILED';
export const getFailureTodoList = createAction(GET_FAILED, message => message);

export const GET_SUCCESS = 'TODO_LIST_GET_SUCCEEDED';
export const getSuccessTodoList = createAction(GET_SUCCESS, todoList => ({ todoList }));

export const PUT_REQUEST = 'TODO_LIST_PUT_REQUESTED';
export const putRequsetTodoList = createAction(PUT_REQUEST, todoList => ({ todoList }));

export const PUT_FAILED = 'TODO_LIST_PUT_FAILED';
export const putFailureTodoList = createAction(PUT_FAILED, message => message);

export const PUT_SUCCESS = 'TODO_LIST_PUT_SUCCEEDED';
export const putSuccessTodoList = createAction(PUT_SUCCESS, todoList => ({ todoList }));
```

### sagaの追加

|関数|意味|
|:--|:--|
|put|Actionをdispatchする|
|call|Promiseの完了を待つ|
|select|stateを取得|
|takeEvery|指定したActionのdispatchを待って、そのActionを引数としてタスクを起動|

```ts:src/sagas/index.ts
import { takeEvery } from 'redux-saga/effects';
import { GET_REQUEST, PUT_REQUEST } from '../actions/storage';
import { ADD, TOGGLE } from '../actions/todos';
import { addTodoList, getTodoList, putTodoList, toggleTodo } from './todos';
function* mySaga() {
  yield takeEvery(ADD, addTodoList);
  yield takeEvery(TOGGLE, toggleTodo);
  yield takeEvery(GET_REQUEST, getTodoList);
  yield takeEvery(PUT_REQUEST, putTodoList);
}
export default mySaga;
```

```ts:src/sagas/todos.ts
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GET_FAILED, GET_REQUEST, GET_SUCCESS,
         PUT_FAILED, PUT_REQUEST, PUT_SUCCESS } from '../actions/storage';
import { get as getTodo, put as putTodo } from '../browser/storage';
import TodoState from '../models/TodoState';

// ワーカー Saga:ADD_TODO Action によって起動する
export function* addTodoList(action: {type: string, payload: {text}}) {
  const todos = yield select((state: any) => state.todos);
  const { text } = action.payload;
  const todoList = [...todos, new TodoState({ text })];
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}
// ワーカー Saga:TOGGLE_TODO Action によって起動する
export function* toggleTodo(action: {type: string, payload: {id}}) {
  const todos = yield select((state: any) => state.todos);
  const { id } = action.payload;
  const todoList = todos.map((t) => {
    // actionCreatorに渡したidと一致するtodoのみ処理
    if (t.id !== id) {
      return t;
    }
    // completedだけを反転
    return  new TodoState({ id:t.id, text:t.text, completed: !t.completed });
  });
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}

// ワーカー Saga:PUT_REQUEST Action によって起動する
export function* putTodoList(action: {type: string, payload: {todoList: TodoState[]}}) {
  try {
    yield call(putTodo, action.payload.todoList);
    yield put({ type: PUT_SUCCESS, payload:{ todoList: action.payload.todoList } });
  } catch (e) {
    yield put({ type: PUT_FAILED, message: e.message });
  }
}

// ワーカー Saga:GET_REQUEST Action によって起動する
export function* getTodoList(action: {type: string;}) {
  try {
    const todoList: TodoState[] = yield call(getTodo);
    yield put({ type: GET_SUCCESS, payload:{ todoList } });
  } catch (e) {
    yield put({ type: GET_FAILED, message: e.message });
  }
}
```

### reducerの修正

ADDとTOGGLEをSagaに移したので削除。
PUT_SUCCESSとGET_SUCCESSを追加。やることは同じなので、統一したほうがよいだろうか。。。

```ts:src/reducers/todos.ts
import { handleActions } from 'redux-actions';
import { GET_SUCCESS, PUT_SUCCESS } from '../actions/storage';
import TodoState from '../models/TodoState';

export default handleActions({
  [GET_SUCCESS]: (state: TodoState[],  { payload: { todoList } }: any) => {
    return todoList.map(todo => new TodoState(todo));
  },
  [PUT_SUCCESS]: (state: TodoState[],  { payload: { todoList } }: any) => {
    return todoList;
  },
},                           []);
```

### sagaとstoreの紐付け

```ts:src/store.ts
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import sagas from './sagas';

// Saga ミドルウェアを作成する
const sagaMiddleware = createSagaMiddleware();

// Store にマウントする
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, createLogger()),
);

// Saga を起動する
sagaMiddleware.run(sagas);
export default store;
```

```ts:src/app.ts
import * as m from 'mithril';
import App from './components/App';
import {createStore } from 'redux';
import { addTodo, toggleTodo } from './actions/todos'
import { setVisibilityFilter, COMPLETED } from './actions/filter'
import {getRequsetTodoList, putRequsetTodoList } from './actions/storage';
import reducers from './reducers';
import Provider from './mithril-redux';
import store from './store';

const root = document.getElementById('app');

// storeからTodosListを取得
store.dispatch(getRequsetTodoList());

function render(){
  m.render(root, m(Provider,{ store }, m(App)));
}
render();
store.subscribe(render);
```


[この時点のソース](https://github.com/hibohiboo/develop/tree/96acdedbcdaa70d80df6b9088e9c0738cbce9696/tutorial/lesson/redux-todo-mithril)

## ルーティング機能

mithrilのm.routeを使うと、dispatchのタイミングとredrawのタイミングがうまく制御できない。
page.jsを使ってルーティングを行う。

```docker:docker/webpack/Dockerfile
// 省略
npm i -S page
//省略
```

```js:docker/config/webpack.config.babel.js
// 省略
    vendor: ['mithril', 'redux', 'redux-actions', 'redux-saga', 'babel-polyfill', 'page']
// 省略
```

```ts:src/app.ts
import * as m from 'mithril';
import * as page from 'page';
import App from './components/App';
import {createStore } from 'redux';
import { toggleTodo } from './actions/todos'
import { setVisibilityFilter } from './actions/filter'
import {getRequsetTodoList, putRequsetTodoList } from './actions/storage';
import reducers from './reducers';
import Provider from './mithril-redux';
import store from './store';

const root = document.getElementById('app');

store.dispatch(getRequsetTodoList());

function render(){
  m.render(root, m(Provider,{ store }, m(App)));
}

page('/', (ctx)=>{
  if(ctx.hash){
    store.dispatch(setVisibilityFilter(ctx.hash));
  }
});
page();
store.subscribe(render);
```

aタグのURLを#filterに変更

```ts:src/components/Link.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
interface IAttr {
  props: {
    active: boolean;
    filter: string;
  };
}
export default class Link implements  ClassComponent<IAttr> {
  public view({ children, attrs:{ props } }: Vnode<IAttr, this>) {
    if (props.active) {
      return <span>{children}</span>;
    }

    return (
    <a href={`/#${props.filter}`} >
      {children}
    </a>);
  }
}
```

propsにfilterを追加。onClickを削除。

```ts
import { setVisibilityFilter, VisibilityFilterType  } from '../actions/filter';
import Link from '../components/Link';
import { connect } from '../mithril-redux';

interface IOwnProps {
  filter: VisibilityFilterType;
}

const mapStateToProps = (state, ownProps: IOwnProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
    filter: ownProps.filter
  };
};

export default connect(
  mapStateToProps,
  null,
)(Link);
```


## 参考
[mithril todo mvc][*1]
[todo-redux-saga][*2]
[redux-sagaを触ろうとしてそれ以前に整理しまくった話][*3]
[実践 Redux Saga][*4]
[redux-saga での stateの取り方 備忘録][*5]
[redux-sagaで非同期処理と戦う][*6]
[Reduxで非同期処理を行う方法を解説した記事の翻訳][*7]

[*1]:http://todomvc.com/examples/mithril/
[*2]:https://github.com/r-park/todo-redux-saga
[*3]:http://frogwell.hatenablog.jp/entry/2017/04/14/123050
[*4]:http://www.s-arcana.co.jp/blog/2017/03/07/3499
[*5]:https://qiita.com/choro/items/464ee392395f6528bf80
[*6]:https://qiita.com/kuy/items/716affc808ebb3e1e8ac
[*7]:https://qiita.com/hachijirou/items/b9633e1dc7d2058d7528

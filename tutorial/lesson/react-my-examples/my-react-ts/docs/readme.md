## 環境構築

以下で構築したフォルダ構成を参考に作成

```
npm install create-react-app
npx create-react-app my-app --typescript
```

### 設定ファイル

ie のサポートはしない予定なので設定ファイルを書換。([\*][*1])([\*\*][*2])
tsconfig.json

```diff
{
   "compilerOptions": {
-    "target": "es5",
-    "allowJs": true,
-    "skipLibCheck": true,
-    "esModuleInterop": true,
+    "target": "es6",
+    "allowJs": false,
+    "skipLibCheck": false,
+    "esModuleInterop": false,
     "allowSyntheticDefaultImports": true,
```

### redux の導入

公式の通りに導入([\*][*4])([\*\*][*5])

## チュートリアル

## 概要

[immer][*9]が[よい][*10]と聞いたので、試してみようと思った。
[Example: Todo List][*8]を ts で試した[以前のメモ][*7]をなぞっていく。

## 環境

### バージョン

- Windows 10 Home
- Vagrant 2.2.6
- virtualbox 6.0.14
- Ubuntu 18.04 LTS (Bionic Beaver)
- Docker version 19.03.2, build 6a30dfc
- docker-compose version 1.24.1, build 4667896b

### ディレクトリ構成(Hello world 時)

```yaml
app
  - tsconfig.json  # ビルドツールで利用するTypescript設定
  - package.json   # ライブラリを記載・また、起動スクリプトなどを記載
  - yarn.lock      # npmでインストールするライブラリのバージョン固定用
  - src
    - index.tsx  # エントリーポイント
    - components # Reactコンポーネント
      - App.tsx
    - react-app-env.d.ts # TSコンパイラへのファイル間の依存関係の宣言
  - public # 開発サーバのベースとなるフォルダ
    - index.html # 開発サーバのホーム。

  + dist   # ビルドされたファイルの格納先
  - docker # dockerファイルをまとめたフォルダ
    - docker-compose.yml # コンテナ起動時設定ファイル
    - node
      - Dockerfile # コンテナ作成ファイル
  - bin # docker-composeの操作をシェル化
    - start.sh # 開発サーバの起動
    - build.sh # dist内にjsファイルをビルド
```

### docker 設定

docker-compose.yml

```yaml
# lesson_buildtool_react_tsというコンテナ名で作成
my_react_ts:
  # Dockerfileビルド
  build: ./node
  # ディレクトリを共有する。
  volumes:
    # ビルドするソースファイル
    - ../src:/app/src
    # ビルドファイルの出力先
    - ../dist:/app/build
    # 開発用サーバのホームページに使用するhtml用ディレクトリ
    - ../public:/app/public
    # package.json上書き
    - ../package.json:/app/package.json
    # typescriptの設定ファイル
    - ../tsconfig.json:/app/tsconfig.json
  # ホストのポート8080をコンテナのポート3000にポートフォワーディング
  ports:
    - 8080:3000 # ホスト:コンテナでポート指定
  environment:
    - CHOKIDAR_USEPOLLING=true # デフォルトの設定の場合、vagrantだとファイルの変更を検知できない。ホットリロードのためにpollingが必要。
  # docker-compose run を行ったときにコンテナ上で下のコマンドを行う
  command: [yarn, start]
```

### 開発サーバ用 HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

## 1. Hello World

create-react-app で作成された状態のソースは余分なものも含まれているので、まずはシンプルにする。
[整理前のソース](https://github.com/hibohiboo/develop/tree/c88ae4d8fb34c2ef4b028d5b228b36b645f5ca7c/tutorial/lesson/react-my-examples/my-react-ts/)

### ソース

index.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// reactのコンポーネントを#root以下に作成する
ReactDOM.render(<App />, document.getElementById("root"));
```

components/App.tsx

```tsx
import React from "react";

// React.FC は React.FunctionComponent の短縮形
// @types/reactとlib.dom.d.tsで型が衝突することがあるため、慣習としてReactの型はnamed import({FC} from 'react'みたいなやつ)を避ける
const App: React.FC = () => {
  return <div> Hello World!!! </div>;
};

export default App;
```

[整理後のソース](https://github.com/hibohiboo/develop/tree/19871aa7324062fe54d218c6130339885943fc53/tutorial/lesson/react-my-examples/my-react-ts/)

### 実行

開発用サーバを起動。

```console
./bin/start.sh
```

ブラウザでアクセスして確認。

http://192.168.50.10:8080/

## 2. actionCreator で発行した action を reducer に渡して store の state を更新する

参考[\*](https://redux.js.org/recipes/usage-with-typescript#type-checking-actions-action-creators)をもとに作成。
Flux Standard Action という考えかたがあるよう([\*][*22])なので、type(必須) と payload(オプション) の組にしてみる。サンプルから少し逸脱。

### Acitions

actions/index.ts

```ts
// TypeScript3.4で導入された const assertion を利用することで各定数がstringではなく、その文字列の型として定義される
const ADD_TODO = "ADD_TODO" as const;

let nextTodoId = 0;

// actionを発行する関数
export const addTodo = (text: string) => {
  // actionはtypeを持つオブジェクト
  // この場合、アクションタイプはADD_TODO
  // データはpayloadとなる。
  return {
    type: ADD_TODO,
    payload: {
      id: nextTodoId++,
      text
    }
  };
};

// TypeScript2.8で導入されたReturnTypeで型をかえす
export type AddTodoAction = ReturnType<typeof addTodo>;
```

### Reducers

immer を使ってみた([\*](https://immerjs.github.io/immer/docs/typescript))。
produce 関数で、普通（ミュータブル）に書いたものが、イミュータブルなオブジェクトとして返されることとなる([\*](https://immerjs.github.io/immer/docs/curried-produce))。

```ts
import produce, { Draft } from "immer";
import { AddTodoAction } from "../actions";

export class TodoState {
  constructor(public id: number, public text: string) {}
}

const todo = produce((draft: Draft<TodoState>, action: AddTodoAction) => {
  switch (action.type) {
    case "ADD_TODO":
      const {
        payload: { id, text }
      } = action;
      draft.id = id;
      draft.text = text;
      return draft;

    default:
      return draft;
  }
});

export default todo;
```

この状態だと、以下のエラーが出てハマった。

```console
my_react_ts_1  | Failed to compile.
my_react_ts_1  |
my_react_ts_1  | /app/src/index.tsx
my_react_ts_1  | TypeScript error in /app/src/index.tsx(7,27):
my_react_ts_1  | No overload matches this call.
my_react_ts_1  |   Overload 1 of 2, '(reducer: Reducer<unknown, Action<any>>, enhancer?: StoreEnhancer<unknown, unknown> | undefined): Store<unknown, Action<any>>', gave the following error.
my_react_ts_1  |     Argument of type '<Base extends { readonly id: number; readonly text: string; }>(base: Base, action: { type: "ADD_TODO"; payload: { id: number; text: string; }; }) => Base' is not assignable to parameter of type 'Reducer<unknown, Action<any>>'.
my_react_ts_1  |       Types of parameters 'base' and 'state' are incompatible.
my_react_ts_1  |         Type 'unknown' is not assignable to type '{ readonly id: number; readonly text: string; }'.
my_react_ts_1  |   Overload 2 of 2, '(reducer: Reducer<unknown, Action<any>>, preloadedState?: DeepPartial<unknown> | undefined, enhancer?: StoreEnhancer<unknown, {}> |
undefined): Store<...>', gave the following error.
my_react_ts_1  |     Argument of type '<Base extends { readonly id: number; readonly text: string; }>(base: Base, action: { type: "ADD_TODO"; payload: { id: number; text: string; }; }) => Base' is not assignable to parameter of type 'Reducer<unknown, Action<any>>'.  TS2769
my_react_ts_1  |
my_react_ts_1  |      5 | import todo from "./reducers";
my_react_ts_1  |      6 | import { addTodo } from "./actions";
my_react_ts_1  |   >  7 | const store = createStore(todo);
```

tsconfig の設定を`"strict": false,`にすると動く。型の問題だけっぽい。
`Draft<TodoState>` が違っていた模様。以下のようにしたら動いた。

```ts
import produce from "immer";
import { AddTodoAction } from "../actions";
import { Reducer } from "redux";
export class TodoState {
  constructor(public id: number, public text: string) {}
}

export const initialState = () => new TodoState(0, "");

const todo: Reducer<TodoState, AddTodoAction> = produce((draft, action) => {
  switch (action.type) {
    // actionTypeがADD_TODOのとき、
    // 新しいTodoStateを返す
    case "ADD_TODO":
      // es6の分割代入でpayloadからidとtextを取り出す
      const {
        payload: { id, text }
      } = action;
      draft.id = id;
      draft.text = text;
      return draft;
    // それ以外のときはstateを変化させない。何もしないproduceは、元の状態を返す。
    // default:
    //   return draft;
  }
});

export default todo;
```

index.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import todo, { initialState } from "./reducers";
import { addTodo } from "./actions";

// createStoreの引数が1つだと初期値がなくてエラーとなる
const store = createStore(todo, initialState());
store.dispatch(addTodo("Hello World!"));
console.log(store.getState());
ReactDOM.render(<App />, document.getElementById("root"));
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/35f43860182d96e7ceecec4c2fff36c780c130d0/tutorial/lesson/react-my-examples/my-react-ts/)

## 2.5 store, reducer の整理

### reducer

- 名前が分かりにくいので todo から reducer にリファクタリング
- todoList を作るようの interface を定義
- todoList を作る用の reducer に変更
- 今後 reducer は増えていくので、集約が出来るように準備をしておく。
- store フォルダに格納

stores/todos/index.ts

```ts
import produce from "immer";
import { AddTodoAction } from "../../actions";
import { Reducer } from "redux";

interface Todo {
  id: number;
  text: string;
}

interface State {
  todos: Todo[];
}

export function initialState(): State {
  return { todos: [] };
}

export const reducer: Reducer<State, AddTodoAction> = produce(
  (draft, action) => {
    switch (action.type) {
      case "ADD_TODO":
        const { payload } = action;
        draft.todos.push(payload);
        return draft;
    }
  }
);
```

- combineReducers を使って集約する。
- 今回は１つだけなのであまり意味はない。

store/reducer.ts

```ts
import { combineReducers } from "redux";
import * as Todos from "./todos";
export function initialState() {
  return {
    todos: Todos.initialState()
  };
}
export const reducer = combineReducers({ todos: Todos.reducer });
```

### store

src/index.tsx にあった createStore を関数に切り出してフォルダを分ける。

store/index.ts

```ts
import { createStore, Store } from "redux";
import { initialState, reducer } from "./reducers";
export type StoreState = ReturnType<typeof initialState>;
export type ReduxStoreInstance = Store<StoreState>;

export function initStore(state = initialState()) {
  // createStoreの引数が1つだと初期値がなくてエラーとなる
  return createStore(reducer, state);
}
```

## 3. store で保持した state を View で表示する

### components

components/Todo.tsx

```tsx
import React from "react";

const Todo: React.FC<{ text: string }> = ({ text }) => {
  return <li>{text}</li>;
};

export default Todo;
```

components/TodoList.tsx

```tsx
import React from "react";
import Todo from "./Todo";
import { State } from "../store/todos";

const TodoList: React.FC<State> = props => {
  return (
    <ul>
      {props.todos.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
```

### container

container/VisibleTodoList.tsx

```ts
import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import { StoreState } from "../store";

const mapStateToProps = (store: StoreState) => {
  return { todos: store.todos.todos };
};

const VisibleTodoList = connect(mapStateToProps)(TodoList);

export default VisibleTodoList;
```

### App

components/App.tsx

```tsx
import React from "react";
import VisibleTodoList from "../containers/VisibleTodoList";

const App: React.FC = () => {
  return (
    <div>
      <VisibleTodoList />
    </div>
  );
};

export default App;
```

### index

index.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { addTodo } from "./actions";
import { initStore } from "./store";

const store = initStore();

store.dispatch(addTodo("Hello World!"));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

ここまでで、画面にリストが出ることを確認できる。

[この時点のソース](https://github.com/hibohiboo/develop/tree/18fda80089f6c93737c2fd05dc9d04816b323d6a/tutorial/lesson/react-my-examples/my-react-ts/)

いつのまにか以下のエラーがでるようになっていた。。

```
Reducer "todos" returned undefined during initialization.
If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.
```

以下のように reducer を直したらエラーは発生しなくなった。[\*][*30]

```diff
export const reducer: Reducer<State, AddTodoAction> = produce(
-  (draft, action) => {
+  (draft = initialState(), action) => {
    switch (action.type) {
      case "ADD_TODO":
        const { payload } = action;
        draft.todos.push(payload);
        return draft;
      default:
        return draft;
    }
  }
);
```

## 参考

[【Typescript×React】tsconfig.json の設定項目を詳しく紹介][*1]  
[tsconfig 日本語訳(3.03)][*2]
[[TypeScript] create-react-app で始めるだいたいストレスフリーな開発環境の構築 2][*3]
[Redux 開発で絶対使うべき Redux DevTools Extension 解説][*6]
[Redux Example の Todo List をはじめからていねいにを Typescript で(1)][*7]
[Immerjs で Redux 周りをスッキリさせたい][*10]
[create-react-app で作った雛形のコードが Service Worker で何をしているのか][*13]
[React + TypeScript の ESLint ルールをカスタマイズしたり、Airbnb のやつを導入するぞ。][*14]
[トリプルスラッシュ・ディレクティブ][*15]
[関東最速で React+Redux+TypeScript なアプリの開発環境を作る][*16]
[redux を typescript で使うならこれを使うしかない。(typescript-fsa がすごい)][*17]
[typescript-fsa に頼らない React × Redux][*18]
[TypeScript で Redux の Reducer 部分を型安全かつスッキリ書く][*19]
[TypeScript 2.4+における Redux Action][*20]
[Flux Standard Action(FSA)の説明][*22]
[Redux の createStore()の処理を追う(Middleware 有りの場合)][*23]
[React ビギナーズガイドを typescript で勉強し直してわかったこと ②【propTypes の必要性について】][*24]
[React を TypeScript で書く 3: React 編][*25]
[react-redux-typescript-guide][*26]
[React を TypeScript で書ける環境で、Redux の Tutorial をしてみる][*27]
[React (TypeScript): ベストプラクティス][*28]
[エラー「Reducer returned undefined during initialization」(React/Redux)][*29]
[Redux をソースコードから理解する その 1][*30]

[*1]: https://qiita.com/shiei_kawa/items/91a79461afa1b1549f13
[*2]: https://qiita.com/alfas/items/539ade65926deb530e0e
[*3]: https://qiita.com/Julia0709/items/dfce1eed86e82c484040
[*4]: https://react-redux.js.org/introduction/quick-start
[*5]: https://redux-docs.netlify.com/introduction/installation
[*6]: https://qiita.com/elzup/items/fc24588b2c6bae0834a6
[*7]: https://qiita.com/hibohiboo/items/e344d2bbbaaab0ba8a66
[*8]: https://redux.js.org/basics/example
[*9]: https://github.com/immerjs/immer
[*10]: https://qiita.com/mame_daifuku/items/9c100dd6c22deff29b2a
[*11]: https://github.com/immerjs/use-immer
[*12]: https://qiita.com/seya/items/6fd68b5410a471eac3c4
[*13]: https://qiita.com/pepo/items/9b25068a3123b99bcf18
[*14]: https://ginpen.com/2019/08/06/eslint-for-react-in-typescript/
[*15]: http://js.studio-kingdom.com/typescript/handbook/triple_slash_directives
[*16]: https://qiita.com/IzumiSy/items/b7d8a96eacd2cd8ad510
[*17]: https://qiita.com/m0a/items/703d64c74e43cb392a64
[*18]: https://logmi.jp/tech/articles/320496
[*19]: https://qiita.com/taqm/items/4d6c5c12296fd1300086
[*20]: https://qiita.com/akisx/items/40c6785ae696144407b0
[*21]: https://redux.js.org/recipes/usage-with-typescript
[*22]: https://qiita.com/kabosusoba/items/e00af944529a5bf89d23
[*23]: https://qiita.com/paming/items/0f660a382aae2125818c
[*24]: https://qiita.com/HiroshiAkutsu/items/1528927165f750c37ce0
[*25]: https://www.dkrk-blog.net/javascript/react_ts03
[*26]: https://github.com/piotrwitek/react-redux-typescript-guide#redux-connected-components
[*27]: https://qiita.com/IgnorantCoder/items/88f13569cbf0a1c5eaa1
[*28]: https://qiita.com/yumaeda/items/9f5111fe7597037efb57
[*29]: https://noah.plus/blog/023/
[*30]: https://qiita.com/juntaki/items/d7b44fd9c2c35ea9ce24

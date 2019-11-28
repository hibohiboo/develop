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

- Windows 10 Home
- Vagrant 2.2.6
- virtualbox 6.0.14
- Ubuntu 18.04 LTS (Bionic Beaver)
- Docker version 19.03.2, build 6a30dfc
- docker-compose version 1.24.1, build 4667896b

## ディレクトリ構成(Hello world 時)

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

## docker 設定

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

## 1. Hello World

create-react-app で作成された状態のソースは余分なものも含まれているので、まずはシンプルにする。
[整理前のソース](https://github.com/hibohiboo/develop/tree/c88ae4d8fb34c2ef4b028d5b228b36b645f5ca7c/tutorial/lesson/react-my-examples/my-react-ts/)

### ソース

index.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));
```

components/App.tsx

```tsx
import React from "react";

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
    // actionTypeがADD_TODOのとき、
    // 新しいTodoStateを返す
    case "ADD_TODO":
      const {
        payload: { id, text }
      } = action;
      draft.id = id;
      draft.text = text;
      return draft;

    // それ以外のときはstateを変化させない
    default:
      return draft;
  }
});

export default todo;
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

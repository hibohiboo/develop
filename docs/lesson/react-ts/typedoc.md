# typedoc

typedocの導入でエラーが出たときに手間取ったのでメモ。

[前回][*3]の続きに導入した

## ディレクトリ構造

```
- react-ts
  - bin
    - doc.sh # コンテナを立ち上げてtypedocを起動
  + dist
  + public
  + src
  - typedoc
    + docs         # typedocを以下に生成
    - .gitignore   # docsをgitに管理させない
    - Dockerfile   # typedocのインストール 
    - package.json # typedocの起動スクリプト
  + webpack
  - docker-compose.yml
```
## ソース

```docker-compose.yml:yml
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


# document作成
doc_tool:
  build: ./typedoc
  volumes:
   # ビルドするソースファイル
   - ./src:/my_typedoc/src
   # ビルドファイルの出力先
   - ./typedoc/docs:/my_typedoc/dist
   # コンテナ上のpackage.jsonを上書き
   - ./typedoc/package.json:/my_typedoc/package.json
   # typescriptの設定ファイル
   - ./webpack/tsconfig.json:/my_webpack/tsconfig.json
```

typedoc/docsディレクトリはソースからの生成物なので、gitの管理外とする。

```typedoc/.gitigore
docs/*
```

```typedoc/Dockerfile:docker
# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:7.3.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_typedoc

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# typescript doc
RUN npm i --save-dev typedoc

# typescript
RUN npm i --save-dev typescript@next

# reduxは型定義ファイルを独自に定義
RUN npm i --save-dev redux

# typescriptの型定義ファイル
RUN npm i --save-dev @types/react
RUN npm i --save-dev @types/react-dom
RUN npm i --save-dev @types/react-redux
RUN npm i --save-dev @types/axios
```

```typedoc/package.json:json
{
  "name": "my_typedoc",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "typedoc": "typedoc",
    "doc": "npm run typedoc -- --target es6 --jsx react  --moduleResolution node --ignoreCompilerErrors --out ./dist/ ./src/"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/axios": "^0.9.34",
    "@types/react": "^0.14.55",
    "@types/react-dom": "^0.14.20",
    "@types/react-redux": "^4.4.35",
    "redux": "^3.6.0",
    "typedoc": "^0.5.3",
    "typescript": "^2.2.0-dev.20170104"
  }
}
```

オプションの`--moduleResolution node`に気づかず、手間取った。  
これを指定していないと、以下のコンパイルエラーが出る。

```
Using TypeScript 2.1.4 from /my_typedoc/node_modules/typedoc/node_modules/typescript/lib
Error: /my_typedoc/node_modules/@types/react-redux/index.d.ts(6)
 Cannot find module 'redux'.
Error: /my_typedoc/src/actions/index.tsx(0)
 Cannot find module 'redux'.
Error: /my_typedoc/src/app.tsx(4)
 Cannot find module 'redux'.
Error: /my_typedoc/src/app.tsx(5)
 Cannot find module './reducers'.
Error: /my_typedoc/src/app.tsx(6)
 Cannot find module './actions'.
Error: /my_typedoc/src/containers/AddTodo.tsx(2)
 Cannot find module '../actions'.
Error: /my_typedoc/src/containers/FilterLink.tsx(1)
 Cannot find module '../actions'.
Error: /my_typedoc/src/containers/VisibleTodoList.tsx(3)
 Cannot find module '../actions'.
Error: /my_typedoc/src/reducers/index.tsx(0)
 Cannot find module 'redux'.
Error: /my_typedoc/src/reducers/todos.tsx(0)
 Cannot find module '../actions'.
Error: /my_typedoc/src/reducers/visibilityFilter.tsx(0)
 Cannot find module '../actions'.
Rendering [========================================] 100%
```

```bin/doc.sh:bash
#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../ && docker-compose run doc_tool npm run doc
```

## ここの時点のソース

[github](https://github.com/hibohiboo/develop/tree/7a3acef4c1ff514912a61a9a49a049673fe7558d/tutorial/lesson/react-ts)


## 参考

[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(3)][*3]
[TypeScriptのドキュメントが一瞬で作れるんだ、そうTypeDocならね][*1]
[typedoc][*2]
[module resolution][*3]
[issues][*4]

[*0]:http://qiita.com/hibohiboo/items/5af878b068c4d11d1b43
[*1]:http://qiita.com/Mic-U/items/961ce4e0c2a1def1dbd3
[*2]:http://typedoc.org/guides/usage/
[*3]:https://www.typescriptlang.org/docs/handbook/module-resolution.html
[*4]:https://github.com/TypeStrong/typedoc/issues/172

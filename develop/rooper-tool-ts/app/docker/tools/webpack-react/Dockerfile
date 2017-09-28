# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:8.5.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /home/workdir

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# jsViewライブラリreact
RUN npm i --save react
RUN npm i --save react-dom

# jsフレームワークredux
RUN npm i --save redux
RUN npm i --save react-redux

# httpライブラリ axios
RUN npm i --save axios

# typescript
RUN npm i --save-dev typescript

# ビルドツール
RUN npm i --save-dev webpack

# 開発用サーバ
RUN npm i --save-dev webpack-dev-server

# es6トランスパイラ
RUN npm i --save babel-polyfill
RUN npm i --save-dev babel-core 
RUN npm i --save-dev babel-preset-es2015
RUN npm i --save-dev babel-preset-react
# awaitを使用するためにes2017導入
RUN npm i --save-dev babel-preset-es2016
RUN npm i --save-dev babel-preset-es2017

# webpack用babel loader
RUN npm i --save-dev babel-loader

# webpack用typescript loader
RUN npm i --save-dev ts-loader

# webpack用json loader
RUN npm i --save-dev json-loader

# typescriptの型定義ファイル
RUN npm i --save-dev @types/react
RUN npm i --save-dev @types/react-dom
RUN npm i --save-dev @types/redux
RUN npm i --save-dev @types/react-redux
RUN npm i --save-dev @types/axios

# material-ui
RUN npm i --save material-ui
RUN npm i --save-dev @types/material-ui
RUN npm i --save react-tap-event-plugin

# material-ui exampleに必要
RUN npm i --save-dev babel-plugin-transform-class-properties

# material-ui input type=number用フィールド追加
RUN npm i --save material-ui-number-input

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"webpack\": \"webpack\",/g" /home/workdir/package.json

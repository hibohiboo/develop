# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:8.4.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /home/vagrant

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# jsViewライブラリreact
RUN npm i --save react
RUN npm i --save react-dom

# jsフレームワークredux
RUN npm i --save redux
RUN npm i --save react-redux

# typescript
RUN npm i --save-dev typescript@next

# ビルドツール
RUN npm i --save-dev webpack

# 開発用サーバ
RUN npm i --save-dev webpack-dev-server

# webpack用typescript loader
RUN npm i --save-dev ts-loader

# typescriptの型定義ファイル
RUN npm i --save-dev @types/react
RUN npm i --save-dev @types/react-dom
RUN npm i --save-dev @types/redux
RUN npm i --save-dev @types/react-redux

# フォームライブラリ追加
RUN npm i --save redux-form
RUN npm i --save-dev @types/redux-form

RUN npm i --save redux-form-website-template

# es6トランスパイラ
RUN npm i --save babel-polyfill
RUN npm i --save-dev babel-core 
RUN npm i --save-dev babel-preset-env
RUN npm i --save-dev babel-preset-react

# webpack用babel loader
RUN npm i --save-dev babel-loader
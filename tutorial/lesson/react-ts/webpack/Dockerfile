# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:7.3.0

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
RUN npm i --save-dev webpack@2.2.0-rc.3

# 開発用サーバ
RUN npm i --save-dev webpack-dev-server@2.2.0-rc.0

# webpack用typescript loader
RUN npm i --save-dev ts-loader

# typescriptの型定義ファイル
RUN npm i --save-dev @types/react
RUN npm i --save-dev @types/react-dom
RUN npm i --save-dev @types/redux
RUN npm i --save-dev @types/react-redux

# material-ui
RUN npm i --save material-ui
RUN npm i --save-dev @types/material-ui
RUN npm i --save react-tap-event-plugin
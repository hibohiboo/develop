# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:7.2.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_webpack

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# jsViewライブラリreact
RUN npm i --save mithril

# msx
RUN npm i --save msx

# jsフレームワークredux
RUN npm i --save-dev redux
RUN npm i --save mithril-redux

# typescript
RUN npm i --save-dev typescript@next

# ビルドツール
RUN npm i --save-dev webpack@2.2.0-rc.0

# 開発用サーバ
RUN npm i --save-dev webpack-dev-server@2.2.0-rc.0

# webpack用typescript loader
RUN npm i --save-dev ts-loader
RUN npm i --save-dev msx-loader

# typescriptの型定義ファイル
RUN npm i --save-dev @types/mithril
RUN npm i --save-dev @types/redux


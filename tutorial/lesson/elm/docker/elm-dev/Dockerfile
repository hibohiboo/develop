FROM node:9.11.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# elmインストール
RUN yarn add  elm
RUN yarn add --dev elm-test
RUN npx elm package install elm-lang/html -y

# webpackv4
RUN yarn add  webpack
# v4から追加
RUN yarn add --dev webpack-cli
# 開発サーバ
RUN yarn add --dev webpack-dev-server
# loader
RUN yarn add  elm-webpack-loader
RUN yarn add  file-loader
RUN yarn add  css-loader
RUN yarn add  style-loader
RUN yarn add  url-loader

# バックエンド
RUN yarn add --dev json-server

# サーバ複数起動用
RUN yarn add --dev foreman

# フロントエンド
RUN yarn add  sanitize.css
RUN yarn add  ace-css
RUN yarn add  font-awesome

# "source-directories": [ "src" ], に変更
RUN sed -i -e "s/\".\"/\"src\"/" /app/elm-package.json

# package.json設定
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"api\": \"node api.js\", /" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"webpack\", /" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"client\": \"webpack-dev-server\", /" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"nf start\", /" /app/package.json

# https://medium.com/webpack/webpack-4-migration-guide-for-plugins-loaders-20a79b927202
# deprecateなthis.optionsをthis.queryに置き換え。
RUN sed -i -e "s/this\.options/this\.query/g" /app/node_modules/elm-webpack-loader/index.js

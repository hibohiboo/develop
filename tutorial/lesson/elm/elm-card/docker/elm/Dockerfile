FROM node:10.10.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# dev-dependencies
## elmインストール
RUN yarn add --dev elm
RUN yarn add --dev elm-verify-examples

## sass
RUN yarn add --dev node-sass

## webpackインストール
RUN yarn add --dev webpack
RUN yarn add --dev webpack-cli
RUN yarn add --dev webpack-merge
RUN yarn add --dev webpack-serve
### 「History APIを利用して作成されるSPAのためのindexページをプロキシする」ミドルウェア
RUN yarn add --dev koa-connect-history-api-fallback
### plugins
RUN yarn add --dev html-webpack-plugin
RUN yarn add --dev mini-css-extract-plugin
RUN yarn add --dev clean-webpack-plugin
RUN yarn add --dev copy-webpack-plugin

## babelインストール

RUN yarn add --dev @babel/core
RUN yarn add --dev @babel/preset-env
RUN yarn add --dev babel-loader

### loaders
RUN yarn add --dev file-loader
RUN yarn add --dev url-loader
RUN yarn add --dev resolve-url-loader
RUN yarn add --dev css-loader
RUN yarn add --dev style-loader
RUN yarn add --dev sass-loader
RUN yarn add --dev elm-hot-webpack-loader
RUN yarn add --dev elm-webpack-loader

# dependencies
RUN yarn add purecss

# # package.json
# RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"prod\": \"webpack -p\"/g" /app/package.json
# RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"webpack\",/g" /app/package.json
# RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev\": \"webpack-serve --port 3000\",/g" /app/package.json
# RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"npm run dev\",/g" /app/package.json
# RUN sed -i -e "/test/d"  /app/package.json
# RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"test\": \"elm-test\",/g" /app/package.json

# formatter
RUN yarn add --dev elm-format
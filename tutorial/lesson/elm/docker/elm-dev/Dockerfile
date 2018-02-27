FROM node:9.5.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

RUN npm i -S elm
RUN npm i -S elm-test
RUN npm i -S webpack
RUN npm i -S elm-webpack-loader
RUN npm i -S file-loader
RUN npm i -S css-loader
RUN npm i -S style-loader
RUN npm i -S sanitize.css
RUN npm i -D webpack-dev-server
RUN npx elm package install elm-lang/html -y
RUN npm i elm-test -D

# バックエンド
RUN npm i -D json-server

#webpack 追加
RUN npm i -D webpack-cli

RUN npm i -D foreman

RUN npm i -S ace-css
RUN npm i -S font-awesome
RUN npm i -S url-loader

#     "source-directories": [ "src" ], に変更
RUN sed -i -e "s/\".\"/\"src\"/" /app/elm-package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"api\": \"node api.js\", /" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"webpack\", /" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"client\": \"webpack-dev-server\", /" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"nf start\", /" /app/package.json

# https://medium.com/webpack/webpack-4-migration-guide-for-plugins-loaders-20a79b927202
# deprecateなthis.optionsをthis.queryに置き換え。
RUN sed -i -e "s/this\.options/this\.query/g" /app/node_modules/elm-webpack-loader/index.js

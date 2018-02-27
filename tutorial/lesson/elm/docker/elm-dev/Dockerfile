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

#     "source-directories": [ "src" ], に変更
RUN sed -i -e "s/\".\"/\"src\"/" /app/elm-package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"api\": \"node api.js\", /" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"webpack\": \"webpack\", /" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev-server\": \"webpack-dev-server\", /" /app/package.json
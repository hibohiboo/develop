FROM node:9.2.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# ビルドツール
RUN npm i -D webpack

# 開発用サーバ
RUN npm i -D webpack-dev-server

# es6用トランスパイラ
RUN npm i -D babel-loader
RUN npm i -D babel-preset-es2015
RUN npm i -D babel-preset-react
RUN npm i -D babel-preset-stage-2

# flow
RUN npm i -D flow-bin
RUN npm i -D flow
RUN npm i -D babel-plugin-transform-flow-strip-types

# jsViewライブラリreact
RUN npm i -S react
RUN npm i -S react-dom
RUN npm i -S react-redux
RUN npm i -S react-scripts

# フレームワーク
RUN npm i -S redux
RUN npm i -S redux-thunk

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"flow\": \"flow\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"babel\": \"babel\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"webpack\": \"webpack\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev-server\": \"webpack-dev-server\", /g" /app/package.json

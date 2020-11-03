# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:12.19.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

RUN npm i -g azure-functions-core-tools@3 --unsafe-perm true
# Functionsのインストール
COPY ./package.json /app/package.json
RUN npm install
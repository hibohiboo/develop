# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:13.10.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y
RUN npm i -g now

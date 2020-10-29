# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:14.14.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm init -y
RUN npm install -g aws-cdk


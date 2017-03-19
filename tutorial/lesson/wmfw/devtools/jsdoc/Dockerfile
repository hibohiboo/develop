# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:7.7.3

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_jsdoc

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# 
RUN npm i -D jsdoc

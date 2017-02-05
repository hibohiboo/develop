# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:6.9.5

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_lint

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# typescript
RUN npm i -D typescript

# 
RUN npm i -D tslint

# 
RUN npm i -D eslint

RUN npm i -D typescript-eslint-parser

# 
RUN npm i -D tslint-react
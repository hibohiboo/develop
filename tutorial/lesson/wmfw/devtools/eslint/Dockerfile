# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:7.8.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_lint

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# 
RUN npm i -D eslint

# 
RUN npm i -D eslint-plugin-react
RUN npm i -D eslint-plugin-import
RUN npm i -D eslint-plugin-jsx-a11y

RUN npm i -D eslint-config-airbnb

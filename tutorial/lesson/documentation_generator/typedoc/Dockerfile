# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_typedoc

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# typescript doc
RUN npm i --save-dev typedoc

# typescript
RUN npm i --save-dev typescript

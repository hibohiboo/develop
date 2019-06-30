FROM node:12.4.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

## for js
### babel
RUN yarn add --dev @babel/core \
  @babel/preset-env

RUN yarn add --dev @babel/cli

### lint
RUN yarn add --dev eslint \
  eslint-plugin-import \
  eslint-config-airbnb-base \
  eslint-plugin-jasmine

### esdoc
RUN yarn add --dev esdoc esdoc-standard-plugin

## for ts
RUN yarn add --dev typescript
RUN yarn add --dev tslint tslint-config-airbnb
RUN yarn add --dev typedoc 

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"run\": \"node app\/index.js\",/g" /app/package.json

RUN yarn add mkdirp request slug
RUN yarn add --dev @types/request 
RUN yarn add async


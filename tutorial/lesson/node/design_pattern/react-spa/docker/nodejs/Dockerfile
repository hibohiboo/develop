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
RUN yarn add --dev webpack webpack-cli babel-loader
RUN yarn add  react react-dom 
RUN yarn add --dev @babel/preset-react
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"yarn run webpack \&\& cp -r \/app\/dist \/app\/app\/ \&\& cp \/app\/index.html \/app\/app\/ \",/g" /app/package.json

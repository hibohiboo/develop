FROM node:12.5.0

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

RUN yarn add forever

# foreverの起動だけでは終わってしまうので、最後に終わらないコマンドを指定する。
# ここではforeverのログ表示コマンドを指定。
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"run\": \"forever start app\/server\/app.js 8081 \&\& forever start app\/server\/app.js 8082 \&\& forever start app\/server\/app.js 8083 \&\& forever start app\/server\/app.js 8084 \&\& forever list \&\& forever --fifo logs 0 \",/g" /app/package.json

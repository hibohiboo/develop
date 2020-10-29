# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:12

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
COPY package.json /app/package.json
RUN npm i -D @aws-cdk/assert @types/jest @types/node jest ts-jest aws-cdk ts-node typescript
RUN npm i @aws-cdk/aws-apigateway @aws-cdk/aws-dynamodb @aws-cdk/aws-lambda


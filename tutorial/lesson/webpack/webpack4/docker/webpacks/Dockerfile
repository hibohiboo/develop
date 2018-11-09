FROM node:11.1.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

## babelインストール
RUN yarn add --dev @babel/core @babel/cli @babel/preset-env
RUN yarn add @babel/polyfill

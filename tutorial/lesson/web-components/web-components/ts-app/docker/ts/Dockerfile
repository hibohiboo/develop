FROM node:11.15.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

RUN yarn add --dev @babel/core @babel/preset-env @babel/cli

## webpackインストール
RUN yarn add --dev webpack  webpack-cli  webpack-dev-server webpack-merge

## plugin
RUN yarn add --dev mini-css-extract-plugin html-minifier-webpack-plugin clean-webpack-plugin copy-webpack-plugin html-webpack-plugin

### loaders
RUN yarn add --dev babel-loader file-loader style-loader css-loader html-loader resolve-url-loader url-loader ts-loader

## for ts
RUN yarn add --dev typescript tslint tslint-config-airbnb typedoc 

### css
# RUN yarn add --dev postcss postcss-cli autoprefixer cssnano postcss-loader node-sass sass-loader




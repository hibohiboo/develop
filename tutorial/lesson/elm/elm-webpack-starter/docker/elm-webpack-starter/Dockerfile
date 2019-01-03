FROM node:11.6.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

### babel
RUN yarn add --dev @babel/core \
                  @babel/preset-env

RUN yarn add --dev @babel/cli

## for css
### sass
RUN yarn add --dev node-sass

### purecss
RUN yarn add purecss


## elm
RUN yarn add --dev elm
RUN yarn add --dev elm-format
RUN yarn add --dev elm-minify
RUN yarn add --dev elm-format
RUN yarn add --dev elm-hot-webpack-loader
RUN yarn add --dev elm-test
RUN yarn add --dev elm-verify-examples

## webpackインストール
RUN yarn add --dev webpack
RUN yarn add --dev webpack-cli
RUN yarn add --dev webpack-merge
RUN yarn add --dev webpack-dev-server

## plugin
RUN yarn add --dev mini-css-extract-plugin
RUN yarn add --dev html-minifier-webpack-plugin
RUN yarn add --dev clean-webpack-plugin
RUN yarn add --dev copy-webpack-plugin
RUN yarn add --dev html-webpack-plugin

### loaders
RUN yarn add --dev babel-loader
RUN yarn add --dev file-loader
RUN yarn add --dev style-loader
RUN yarn add --dev css-loader
RUN yarn add --dev html-loader
RUN yarn add --dev elm-webpack-loader
RUN yarn add --dev resolve-url-loader
RUN yarn add --dev resolve-url-loader
RUN yarn add --dev sass-loader
RUN yarn add --dev url-loader


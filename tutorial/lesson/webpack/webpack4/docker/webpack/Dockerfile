FROM node:11.2.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

## for html
RUN yarn add --dev pug

## for js
### babel
RUN yarn add --dev @babel/core \
                  @babel/preset-env
RUN yarn add @babel/polyfill

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

## for css
### sass
RUN yarn add --dev node-sass

### postcss
RUN yarn add --dev postcss postcss-cli
RUN yarn add --dev autoprefixer

### lint
RUN yarn add --dev stylelint 
RUN yarn add --dev stylelint-scss
RUN yarn add --dev stylelint-order
RUN yarn add --dev stylelint-config-sass-guidelines

## elm

RUN yarn add --dev elm
RUN yarn add --dev elm-format
### elm minify
RUN yarn add --dev uglify-js
RUN npm i -g uglify-js

## webpackインストール
RUN yarn add --dev webpack
RUN yarn add --dev webpack-cli
RUN yarn add --dev webpack-merge
RUN yarn add --dev webpack-dev-server

### loaders
RUN yarn add --dev babel-loader
RUN yarn add --dev ts-loader
RUN yarn add --dev file-loader
RUN yarn add --dev url-loader
RUN yarn add --dev resolve-url-loader
RUN yarn add --dev css-loader
RUN yarn add --dev style-loader
RUN yarn add --dev sass-loader
RUN yarn add --dev postcss-loader
RUN yarn add --dev elm-hot-webpack-loader
RUN yarn add --dev elm-webpack-loader
RUN yarn add --dev json-loader
RUN yarn add --dev yaml-loader

## plugin
RUN yarn add --dev mini-css-extract-plugin
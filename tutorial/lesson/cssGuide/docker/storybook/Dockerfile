FROM node:13.10.1
# FROM node:12.13.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# https://teppeis.hatenablog.com/entry/2015/12/configure-npm-init
COPY .npmrc /app/.npmrc
RUN npm init -y
RUN npm i -D -y @storybook/cli
RUN npm i -D -y @storybook/html
RUN npm i -D -y @babel/core babel-loader
RUN npm i -D -y pug pug-plain-loader html-loader
RUN npm i -D -y @pickra/copy-code-block
RUN npm i -D -y css-loader style-loader
RUN npm i -D -y raw-loader
RUN npm i -D -y highlight.js

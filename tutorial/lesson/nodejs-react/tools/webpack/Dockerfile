FROM node:8.4.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D webpack

RUN npm i -D babel-loader
RUN npm i -D babel-core
RUN npm i -D babel-preset-es2015
RUN npm i -D babel-preset-react

RUN npm i -D react
RUN npm i -D react-dom

COPY ./package.json package.json
COPY ./webpack.config.js webpack.config.js
COPY ./.babelrc .babelrc

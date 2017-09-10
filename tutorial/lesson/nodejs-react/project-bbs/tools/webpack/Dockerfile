FROM node:8.4.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D webpack

RUN npm i -D babel-loader
RUN npm i -D babel-core
RUN npm i -D babel-preset-es2015
RUN npm i -D babel-preset-react

RUN npm i -S react
RUN npm i -S react-dom
RUN npm i -S superagent

COPY ./package.json package.json
COPY ./webpack.config.babel.js webpack.config.babel.js
COPY ./.babelrc .babelrc

FROM node:8.4.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D babel-cli
RUN npm i -D babel-preset-env
RUN npm i -D babel-preset-node8

COPY ./package.json package.json
COPY ./.babelrc .babelrc

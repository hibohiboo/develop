FROM node:8.4.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D eslint
RUN npm i -D eslint-config-standard 
RUN npm i -D eslint-plugin-standard 
RUN npm i -D eslint-plugin-promise 
RUN npm i -D eslint-plugin-import 
RUN npm i -D eslint-plugin-node

COPY ./package.json package.json
COPY ./.eslintrc .eslintrc
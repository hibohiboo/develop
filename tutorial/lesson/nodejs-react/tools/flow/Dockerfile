FROM node:8.4.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D flow-bin

COPY ./package.json package.json
COPY ./.flowconfig .flowconfig
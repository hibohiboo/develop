FROM node:8.4.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D eslint
RUN npm i -D eslint-config-google

#COPY ./package.json package.json
COPY ./.eslintrc .eslintrc
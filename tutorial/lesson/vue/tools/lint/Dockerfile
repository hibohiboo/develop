FROM node:12.8.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D eslint
RUN npm i -D eslint-config-google
RUN npm i -D eslint-config-airbnb-base
RUN npm i -D eslint-plugin-import

# ソース中で使用するライブラリ
RUN npm i -S express

RUN sed -i -e 's@\("scripts": {\)@\1\n    "eslint": "eslint",@g' package.json

COPY ./.eslintrc .eslintrc
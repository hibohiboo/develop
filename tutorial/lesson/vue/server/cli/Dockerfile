FROM node:12.8.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D vue-cli
RUN sed -i -e 's@\("scripts": {\)@\1\n    "vue": "vue",@g' package.json
# RUN npm run vue -- init webpack my-project
# すべて「はい」のオプションがないので、そのままコピー
COPY ./my-project my-project
WORKDIR /home/workdir/my-project
RUN npm install


FROM node:8.5.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D eslint
RUN npm i -D eslint-plugin-import
RUN npm i -D eslint-config-airbnb-base
RUN npm i -D eslint-plugin-jasmine

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"eslint\": \"eslint\",/g" /home/workdir/package.json

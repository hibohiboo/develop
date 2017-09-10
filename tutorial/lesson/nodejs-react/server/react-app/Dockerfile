FROM node:8.4.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D create-react-app

COPY ./package.json package.json
RUN npm run create-react-app -- app
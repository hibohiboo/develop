FROM node:8.4.0

WORKDIR /home/workdir

RUN npm init -y
RUN npm i -D jasmine
RUN npm i express

COPY ./app.js /home/workdir/app.js

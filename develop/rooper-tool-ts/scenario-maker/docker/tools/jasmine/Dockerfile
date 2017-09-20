FROM node:8.5.0

WORKDIR /home/workdir
RUN apt-get update
RUN apt-get install unzip -y

RUN npm init -y
#RUN npm i -D jasmine
#RUN npm i -D jasmine-standalone

RUN npm i -S express
# -L リダイレクトに対応。 O ファイルとして保存
RUN curl -LO https://github.com/jasmine/jasmine/releases/download/v2.8.0/jasmine-standalone-2.8.0.zip

RUN unzip -d jasmine jasmine-standalone-2.8.0.zip
RUN rm jasmine-standalone-2.8.0.zip
COPY ./app.js /home/workdir/app.js

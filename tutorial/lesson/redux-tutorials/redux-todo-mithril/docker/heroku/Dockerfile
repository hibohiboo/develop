FROM node:8.8.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

RUN npm install -g heroku-cli
COPY init.sh .
RUN ./init.sh
RUN rm -f init.sh
COPY app/package.json .
COPY app/Procfile .
COPY app/server.js .
FROM node:9.5.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

RUN npm i -D elm

RUN npx elm package install elm-lang/html -y
RUN npm i elm-test -D
RUN npx elm-test init
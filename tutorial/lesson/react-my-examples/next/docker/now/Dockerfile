# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:13.10.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm init -y
RUN npm i -g now

RUN npm i next react react-dom

# now loginで出来た認証トークンを保存.一度コンテナを作成した後に追加。
COPY ./now /root/.local/share/now/
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev\": \"next dev\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"next build\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"next start\", /g" /app/package.json

# TypeScript追加
RUN npm i -D typescript @types/react @types/react-dom @types/node

# resetcss
RUN npm i -D sanitize.css

# Progressive Web Apps (PWA) 対応
RUN npm i -D next-offline

# スタイリング
RUN npm i -D styled-components styled-media-query

# 状態管理
RUN npm i -D @reduxjs/toolkit react-redux redux-logger

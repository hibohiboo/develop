# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:13.10.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y
RUN npm i -g now

RUN yarn add next react react-dom

# now loginで出来た認証トークンを保存.一度コンテナを作成した後に追加。
COPY ./now /root/.local/share/now/
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev\": \"next dev\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"next build\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"next start\", /g" /app/package.json

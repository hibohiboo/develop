FROM node:6.12.3

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# firebase
RUN npm install -g firebase-tools
RUN npm i -D firebase-tools

# javascriptフォーマッタ 
RUN npm i -D prettier

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"firebase\": \"firebase\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"fmt\": \"prettier --write scripts\/* styles\/*\", /g" /app/package.json
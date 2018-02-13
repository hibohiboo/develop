FROM node:9.5

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# babel7をインストール
RUN npm install -D babel-core@next
RUN npm install -D babylon@next
RUN npm install -D babel-types@next

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"fmt\": \"prettier --write scripts\/* styles\/*\", /g" /app/package.json
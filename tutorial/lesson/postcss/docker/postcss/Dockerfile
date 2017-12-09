FROM node:9.2.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# 監視用
RUN npm i -D chokidar

# Cssプリプロセッサ
RUN npm i -D postcss

# //のコメントアウト
RUN npm i -D postcss-comment

# ブラウザごとにプレフィックスの作成
RUN npm i -D autoprefixer

# 入れ子を可能にする
RUN npm i -D postcss-nested

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"run\": \"node app.js\",/g" /app/package.json
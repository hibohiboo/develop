FROM node:9.3

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

# ネスト
RUN npm i -D postcss-nested

# 
RUN npm i -D postcss-cssnext


RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"run\": \"node app.js\",/g" /app/package.json
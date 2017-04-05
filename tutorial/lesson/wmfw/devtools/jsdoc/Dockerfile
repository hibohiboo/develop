# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node

# コンテナ上の作業ディレクトリ作成
WORKDIR /root

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# jsdoc
RUN npm i -g jsdoc

# jsdocテンプレートminamiのインストール
RUN npm install --save-dev minami
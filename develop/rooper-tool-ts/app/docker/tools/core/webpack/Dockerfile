FROM node:8.5.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /home/workdir

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# typescript
RUN npm i -D typescript

# ビルドツール
RUN npm i -D webpack

# 開発用サーバ
RUN npm i -D webpack-dev-server

# es6用トランスパイラ
RUN npm i -D babel-loader
RUN npm i -D babel-core
RUN npm i -D babel-preset-es2015
RUN npm i -D babel-preset-env

# webpack用typescript loader
RUN npm i -D ts-loader

# jsViewライブラリmithril
RUN npm i -S mithril
RUN npm i -D mithril-jest
RUN npm i -D @types/jest

RUN npm i -D babel-plugin-transform-react-jsx

RUN npm i -D jquery

# tslint
RUN npm i -D tslint
RUN npm i -D tslint-config-airbnb
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tslint\": \"tslint -p 'tsconfig.json' --type-check\",/g" /home/workdir/package.json

# async
RUN npm i -D babel-preset-es2017

# typedoc
RUN npm i -D typedoc 

# tsc
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tsc\": \"tsc\",/g" /home/workdir/package.json

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"typedoc\": \"typedoc\",/g" /home/workdir/package.json

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"webpack\": \"webpack\",/g" /home/workdir/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev-server\": \"webpack-dev-server\", /g" /home/workdir/package.json

# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:7.3.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_typedoc

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# typescript doc
RUN npm i --save-dev typedoc

# typescript
RUN npm i --save-dev typescript@next

# reduxは型定義ファイルを独自に定義
RUN npm i --save-dev redux
RUN npm i --save-dev @types/redux
RUN cp ./node_modules/redux/index.d.ts ./node_modules/@types/redux/

# typescriptの型定義ファイル
RUN npm i --save-dev @types/react
RUN npm i --save-dev @types/react-dom
RUN npm i --save-dev @types/react-redux
RUN npm i --save-dev @types/axios
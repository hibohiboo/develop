# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:13.7.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# jsViewライブラリreact
RUN npm i --save react
RUN npm i --save react-dom

# jsフレームワークredux
RUN npm i --save redux
RUN npm i --save react-redux

# typescript
RUN npm i --save-dev typescript

# ビルドツール
# optionalがうるさいので消す。https://mimirswell.ggnet.co.jp/blog-221
RUN npm i --save-dev react-scripts

# typescriptの型定義ファイル
RUN npm i --save-dev @types/react
RUN npm i --save-dev @types/react-dom
RUN npm i --save-dev @types/redux
RUN npm i --save-dev @types/react-redux
RUN npm i --save-dev @types/node
RUN npm i --save-dev @types/jest 

# https://github.com/Ouvill/redux-starter-kit-sample
RUN npm i --save @reduxjs/toolkit

# # material-ui
# RUN npm i --save material-ui
# RUN npm i --save-dev @types/material-ui
# RUN npm i --save react-tap-event-plugin
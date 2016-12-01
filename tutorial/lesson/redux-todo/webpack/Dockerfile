# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:7.2.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_webpack

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# ビルドツール
RUN npm i --save-dev webpack@2.1.0-beta.27

# 開発用サーバ
RUN npm i --save-dev webpack-dev-server@2.1.0-beta.12

# トランスパイラ babel
RUN npm i --save babel-polyfill
RUN npm i --save-dev babel-core 
RUN npm i --save-dev babel-loader

# babelのes6用preset
RUN npm i --save-dev babel-preset-es2015
RUN npm i --save-dev babel-preset-stage-0

# babelのreact用preset
RUN npm i --save-dev babel-preset-react

# jsViewライブラリreact
RUN npm i --save react
RUN npm i --save react-dom

# jsフレームワークredux
RUN npm i --save-dev redux
RUN npm i --save react-redux
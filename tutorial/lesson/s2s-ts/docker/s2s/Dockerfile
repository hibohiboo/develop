FROM node:9.2.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# ソースダウンロード
RUN git clone --depth=1 https://github.com/akameco/s2s.git

# chokidarのポーリング設定
RUN sed -i -e "s/\(ignoreInitial: true,\)/\1\n    usePolling: true, /g" /app/s2s/packages/s2s-cli/src/index.js

# s2sをビルド
WORKDIR /app/s2s/
RUN yarn

# example用設定
WORKDIR /app/s2s/examples/shopping-cart

# typescript 用拡張をインストール
RUN npm install --save-dev @babel/core@7.0.0-beta.34
RUN npm install --save-dev @babel/plugin-syntax-typescript@7.0.0-beta.34
RUN npm install --save-dev babel-plugin-s2s-action-types-ts

RUN yarn
RUN yarn run flow

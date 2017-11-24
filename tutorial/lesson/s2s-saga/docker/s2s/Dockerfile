FROM node:9.2.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# ソースダウンロード
RUN git clone --depth=1 https://github.com/cndlhvn/s2s-redux-actions-sample.git

# chokidarのポーリング設定
#RUN sed -i -e "s/\(ignoreInitial: true,\)/\1\n    usePolling: true, /g" /app/s2s/packages/s2s-cli/src/index.js

# s2sをビルド
WORKDIR /app/s2s-redux-actions-sample
RUN yarn
#RUN yarn start
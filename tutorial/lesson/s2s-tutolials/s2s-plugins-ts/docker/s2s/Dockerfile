FROM node:9.5.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y
RUN npm i -D yarn

# s2s
RUN yarn add s2s --dev 

# プラグイン
RUN yarn add --dev babel-plugin-s2s-action-builders
RUN yarn add --dev babel-plugin-s2s-redux-actions-root
RUN yarn add --dev babel-plugin-s2s-redux-actions

# 必要ツール
RUN yarn add --dev lodash
RUN yarn add --dev globby
RUN yarn add --dev @babel/plugin-syntax-typescript

# chokidarのポーリング設定
RUN sed -i -e "s/\(ignoreInitial: true\)/\1,\n    usePolling: true /g" /app/node_modules/s2s/lib/index.js


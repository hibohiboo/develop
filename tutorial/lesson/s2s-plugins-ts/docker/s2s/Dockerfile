FROM node:9.5.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y
RUN npm i -D yarn

# s2s
RUN yarn add s2s --dev 

# s2sプラグイン
## kamijin-fantaさん作成
RUN yarn add babel-plugin-s2s-action-creator-ts --dev
RUN yarn add babel-plugin-s2s-action-root-ts --dev
RUN yarn add babel-plugin-s2s-action-types-ts --dev
RUN yarn add babel-plugin-s2s-some-root-ts --dev

# chokidarのポーリング設定
RUN sed -i -e "s/\(ignoreInitial: true\)/\1,\n    usePolling: true /g" /app/node_modules/s2s/lib/index.js


FROM node:9.1.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 
RUN git clone --depth=1 https://github.com/akameco/s2s.git
RUN sed -i -e "s/\(ignoreInitial: true,\)/\1\n    usePolling: true, /g" /app/s2s/packages/s2s-cli/src/index.js

WORKDIR /app/s2s/
RUN yarn

WORKDIR /app/s2s/examples/getting-started

RUN yarn
RUN yarn run flow


# you have to run it before to run s2s
#RUN yarn run flow init 

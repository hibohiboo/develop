FROM node:11.15.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app
RUN yarn add --dev \
  @babel/core \
  @babel/preset-env \
  babel-loader \
  css-loader \
  elm-webpack-loader \
  webpack \
  webpack-cli \
  webpack-dev-server
RUN yarn add elm


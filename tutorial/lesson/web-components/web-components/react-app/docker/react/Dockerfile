FROM node:11.15.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app
# COPY ./* /app/
# RUN yarn install
RUN yarn add --dev \
  @babel/core \
  @babel/preset-env \
  @babel/plugin-proposal-class-properties \
  @babel/preset-react \
  babel-loader \
  css-loader \
  style-loader \
  clean-webpack-plugin \
  webpack \
  webpack-cli \
  webpack-dev-server
RUN yarn add react react-dom

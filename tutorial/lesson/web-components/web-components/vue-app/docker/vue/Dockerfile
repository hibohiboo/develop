FROM node:11.15.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app
#COPY ./* /app/
#RUN yarn install
RUN yarn add --dev \
  @babel/core \
  @babel/preset-env \
  babel-loader \
  css-loader \
  vue-loader \
  vue-style-loader \
  vue-template-compiler \
  webpack \
  webpack-cli \
  webpack-dev-server
RUN yarn add vue vue-custom-element
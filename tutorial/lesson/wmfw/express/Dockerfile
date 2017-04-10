FROM node:7.8.0
# WORKDIR /wmfw
# RUN mkdir wmfwapp
WORKDIR /wmfw/wmfwapp
RUN npm init -y
RUN npm install babel-cli --save
RUN npm install express@5.0.0-alpha.5 --save
RUN npm install --save-dev babel-preset-latest

# postデータのパース
RUN npm install body-parser --save

# cookieデータのパース
RUN npm install cookie-parser --save

# デフォルトのfavicon
RUN npm install serve-favicon --save

# デバッグ用
RUN npm install debug --save-dev

# ログ取得
RUN npm install log4js --save

# ビューエンジン
RUN npm install pug --save





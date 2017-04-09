FROM node:7.8.0
# WORKDIR /wmfw
# RUN mkdir wmfwapp
WORKDIR /wmfw/wmfwapp
RUN npm init -y
RUN npm install babel-cli --save
RUN npm install express@5.0.0-alpha.5 --save
RUN npm install --save-dev babel-preset-latest

# logger
RUN npm install morgan --save
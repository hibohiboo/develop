# http://dev.classmethod.jp/tool/docker/apline-accelerates-docker-dev/
FROM alpine:edge

# http://qiita.com/dd511805/items/dfe03c5486bf1421875a

# node.js stable のインストール
RUN echo http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache curl bash git make gcc g++ python linux-headers \
    paxctl libgcc libstdc++ file autoconf automake nasm gnupg \
    nodejs nodejs-dev nodejs-npm

# chromiumのインストール
RUN apk add --update \
        udev \
        ttf-freefont \
        chromium
################################################################
# selenium-webdriverのインストール
RUN apk add --update nodejs

WORKDIR /home/selenium
# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y 
RUN npm i chromedriver -g
RUN npm i selenium-webdriver --save

RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.18.0/geckodriver-v0.18.0-linux64.tar.gz
RUN tar -zxvf ./geckodriver-v0.18.0-linux64.tar.gz
RUN rm -f geckodriver-v0.18.0-linux64.tar.gz
RUN mv ./geckodriver /usr/local/bin
RUN npm i -D nightwatch
RUN npm i -D selenium-webdriver
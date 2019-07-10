FROM node:12.5.0

ENV DEBIAN_FRONTEND noninteractive
RUN echo 'ZONE="Asia/Tokyo"' > /etc/timezone && dpkg-reconfigure tzdata
ENV TZ=JST-9

RUN apt-get update -y
RUN apt-get install -y less sudo wget openssh-server xterm xauth \
  x11-xserver-utils libnotify4 libnss3 libgtk2.0 libxss-dev \
  libgconf-2-4 git mozc-server uim uim-mozc fonts-ipafont

# vscodeのインストールに失敗したため追加
RUN apt-get install -y  libxkbfile1

# ifconfigが使えなかったため追加。
RUN apt-get install -y  net-tools

RUN wget -q -O /tmp/vscode.deb http://go.microsoft.com/fwlink/\?LinkID=760868 && dpkg -i /tmp/vscode.deb && rm /tmp/vscode.deb
RUN npm install -g grunt-cli bower

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

## for js
### babel
RUN yarn add --dev @babel/core \
  @babel/preset-env

RUN yarn add --dev @babel/cli

### lint
RUN yarn add --dev eslint \
  eslint-plugin-import \
  eslint-config-airbnb-base \
  eslint-plugin-jasmine

### esdoc
RUN yarn add --dev esdoc esdoc-standard-plugin

## for ts
RUN yarn add --dev typescript
RUN yarn add --dev tslint tslint-config-airbnb
RUN yarn add --dev typedoc 

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"run\": \"node app\/index.js\",/g" /app/package.json
RUN yarn add --dev electron

# 初期実行ファイル
ADD run.sh /etc/
RUN chmod +x /etc/run.sh
EXPOSE 22
CMD /etc/run.sh

# vscodeの起動に失敗したため追加
RUN apt-get install -y  libasound2

# globalで実行させるように追加
RUN yarn global add electron
# X11 forward のテスト用
# RUN apt-get install -y x11-apps
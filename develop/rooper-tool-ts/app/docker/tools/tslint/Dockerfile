FROM node:8.5.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /home/workdir

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# typescript
RUN npm i -D typescript

# 
RUN npm i -D tslint

RUN npm i -D tslint-config-airbnb

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tslint\": \"tslint -p 'tsconfig.json' --type-check\",/g" /home/workdir/package.json

# 使用module
RUN npm i -D @types/mithril
RUN npm i -D mithril-jest
RUN npm i -D @types/jest
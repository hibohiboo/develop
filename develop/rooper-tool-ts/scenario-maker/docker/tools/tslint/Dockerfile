FROM node:8.5.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /home/workdir

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# typescript
RUN npm i -D typescript

# 
RUN npm i -D tslint

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tslint\": \"tslint\",/g" /home/workdir/package.json

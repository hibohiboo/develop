FROM node:11.2.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

## elm
RUN yarn add --dev elm
RUN yarn add --dev elm-format
### elm minify
RUN yarn add --dev uglify-js
RUN npm i -g uglify-js

RUN yarn add --dev chokidar
RUN yarn add --dev chokidar-cli
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build-elm\": \"yarn run elm make \/app\/src\/assets\/elm\/ElmTest.elm --output=\/app\/dist\/elm\/ElmTest.js\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"elm-watch\": \"yarn run chokidar '\/app\/**\/*.elm' -p -c 'yarn run build-elm' \",/g" /app/package.json


# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:13.10.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm init -y
RUN npm i -g now

RUN npm i next react react-dom

# now loginで出来た認証トークンを保存.一度コンテナを作成した後に追加。
COPY ./now /root/.local/share/now/
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev\": \"next dev\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"next build\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"next start\", /g" /app/package.json

# TypeScript追加
RUN npm i -D typescript @types/react @types/react-dom @types/node

# resetcss
RUN npm i -D sanitize.css

# Progressive Web Apps (PWA) 対応
RUN npm i -D next-offline

# スタイリング
RUN npm i -D styled-components styled-media-query

# 状態管理
RUN npm i -D @reduxjs/toolkit react-redux redux-logger

# linter formatter
RUN npm i -D eslint eslint-plugin-react prettier eslint-config-prettier eslint-plugin-prettier
RUN npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"lint\": \"eslint --ext .ts,.tsx --ignore-path .gitignore .\", /g" /app/package.json

# テストツール
RUN npm i -D jest jest-dom jest-css-modules
RUN npm i -D ts-jest @types/jest
RUN npm i -D @testing-library/react
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tests\": \"jest src\/__tests__\/.*\/*.spec.tsx?$\", /g" /app/package.json

# Story Book
RUN npx -p @storybook/cli sb init --type react
RUN npm i -D babel-preset-react-app
RUN npm i -D @storybook/addon-knobs @storybook/addon-storysource @storybook/addon-viewport @storybook/addon-backgrounds @storybook/addon-console
## Story Shot
RUN npm i -D @storybook/addon-storyshots @storybook/addon-storyshots-puppeteer puppeteer react-test-renderer
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"puppeteer-storyshots\": \"jest src\/__tests__\/puppeteer-storyshots*.runner.ts\", /g" /app/package.json

### puppetieer troubleshooting
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

FROM node:9.5.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y
RUN yarn add --dev yarn

# typescript
RUN yarn add --dev typescript

# tslint
RUN yarn add --dev tslint
RUN yarn add --dev tslint-config-airbnb

# typedoc
RUN yarn add --dev typedoc 

# es6用トランスパイラ
RUN yarn add --dev babel-core@next
RUN yarn add --dev babel-cli@next
RUN yarn add --dev babel-preset-es2015
RUN yarn add --dev babel-preset-env
RUN yarn add --dev babel-plugin-transform-react-jsx
# async
RUN yarn add --dev babel-preset-es2017
# babelのreact用preset
RUN yarn add --dev babel-preset-react

# webpack用typescript loader
RUN yarn add --dev ts-loader
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tslint\": \"tslint -p 'tsconfig.json'\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tsc\": \"tsc -p tsconfig.json \",/g" /app/package.json

FROM node:7.1.0
WORKDIR /my_webpack
COPY ./package.json package.json 
RUN npm install

CMD ["node", "node_modules/.bin/webpack", "app/app.js", "app/bundle.js"]
FROM node:7.1.0
WORKDIR /my_webpack
RUN npm init -y
RUN npm install --save-dev webpack@2.1.0-beta.26
RUN npm install --save-dev json-loader
RUN npm install --save-dev yaml-loader
RUN npm install --save-dev html-webpack-plugin
RUN npm i --save babel-polyfill
RUN npm i --save-dev babel-core 
RUN npm i --save-dev babel-loader
RUN npm i --save-dev babel-preset-es2015
RUN npm i --save-dev babel-preset-stage-0
RUN npm i --save-dev babel-plugin-add-module-exports

CMD ["npm", "run", "build"]
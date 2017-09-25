FROM node:8.5.0

WORKDIR /home/workdir

RUN npm init -y

RUN npm i -S express

RUN npm i -D babel-jest 
RUN npm i -D babel-polyfill 
RUN npm i -D babel-preset-es2015 
RUN npm i -D jest

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"jest\": \"jest\",/g" /home/workdir/package.json

FROM node:6.10
RUN apt-get update
RUN apt-get install -y zip

COPY services /home/node/services
RUN npm install

WORKDIR /home/node


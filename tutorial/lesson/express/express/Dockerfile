FROM node:7.1.0
WORKDIR /my_express
RUN npm init -y
RUN npm install express-generator -g
RUN express myapp
WORKDIR /my_express/myapp
RUN npm install body-parser --save
RUN npm install cookie-parser --save
RUN npm install debug --save
RUN npm install express@5.0.0-alpha.2 --save
RUN npm install jade --save
RUN npm install morgan --save
RUN npm install serve-favicon --save
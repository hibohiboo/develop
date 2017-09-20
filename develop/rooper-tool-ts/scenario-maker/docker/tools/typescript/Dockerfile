FROM node:8.5.0

WORKDIR /home/workdir

RUN npm init -y

# typescripdt
RUN npm i -D typescript
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tsc\": \"tsc\",/g" /home/workdir/package.json

RUN npm i -S mithril
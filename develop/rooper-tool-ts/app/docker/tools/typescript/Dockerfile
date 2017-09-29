FROM node:8.5.0

WORKDIR /home/workdir

RUN npm init -y

# typescripdt
RUN npm i -D typescript
# typedoc
RUN npm i -D typedoc 
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tsc\": \"tsc\",/g" /home/workdir/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"typedoc\": \"typedoc\",/g" /home/workdir/package.json

RUN npm i -S mithril
RUN npm i -S jquery
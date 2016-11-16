
## 参考

## Creating a Single Page Application

以下を実行すると落ちてしまう。

```Dockerfile
FROM node:7.1.0
WORKDIR /my_react
RUN npm init -y
RUN npm install -g create-react-app
RUN create-react-app hello-world
WORKDIR /my_react/hello-world
```

```docker-compose.yml
react:
  build: ./react
  command: [npm, start]
```

```bash
$ docker-compose build
$ docker-compose up
```

## Adding React to an Existing Application



[react tutorial][*1]

[*1]:https://facebook.github.io/react/docs/installation.html
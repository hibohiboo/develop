
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

```Dockerfile
FROM node:7.1.0
WORKDIR /my_react
RUN npm init -y
RUN npm install --save react
RUN npm install --save react-dom
```

[react tutorial][*1]
[Webpack + React + ES6の最小構成を考えてみる。][*2]

[*1]:https://facebook.github.io/react/docs/installation.html
[*2]:http://uraway.hatenablog.com/entry/2015/12/25/Webpack_%2B_React_%2B_ES6%E3%81%AE%E6%9C%80%E5%B0%8F%E6%A7%8B%E6%88%90%E3%82%92%E8%80%83%E3%81%88%E3%81%A6%E3%81%BF%E3%82%8B%E3%80%82

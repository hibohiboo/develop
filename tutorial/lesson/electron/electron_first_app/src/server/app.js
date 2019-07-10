"use strict";

const WebSocketServer = require('ws').Server;
const redis = require("redis");
const redisSub = redis.createClient(6379, 'redis'); // サブスクライバモードに入ると、その接続ではサブスクリプション関連のコマンドしか使えなくなる
const redisPub = redis.createClient(6379, 'redis'); // 上記の問題があるため、パブリッシュするための接続を用意する。

//static file server
const server = require('http').createServer(
  require('ecstatic')({ root: `${__dirname}/www` })
);

const wss = new WebSocketServer({ server: server });
wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', msg => {
    console.log(`Message: ${msg}`);
    redisPub.publish('chat_messages', msg);
  });
});

// chat_messagesチャネルにサブスクライブする。
redisSub.subscribe('chat_messages');
redisSub.on('message', (channel, msg) => {
  wss.clients.forEach((client) => {
    client.send(msg);
  });
});

server.listen(process.argv[2] || 8080);

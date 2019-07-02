"use strict";

// ウェブソケット
const WebSocketServer = require('ws').Server;

// コマンド行引数のパーサ（解析ツール）。名前付き引数を簡単に扱う
const args = require('minimist')(process.argv.slice(2));

// ∅MQネイティブライブラリのNodeバインディング
const zmq = require('zeromq');

//static file server
const server = require('http').createServer(
  require('ecstatic')({ root: `${__dirname}/www` })
);

// pubソケットをコマンド行引数--pubで指定されたポートにバインディング
const pubSocket = zmq.socket('pub');
pubSocket.bind(`tcp://127.0.0.1:${args['pub']}`);

// subソケットをチャットアプリケーションの他のインスタンスのpubソケットに接続
// 接続先pubソケットのポートはコマンド行引数--subで指定（複数指定可能）
const subSocket = zmq.socket('sub');
const subPorts = [].concat(args['sub']);
subPorts.forEach(p => {
  console.log(`Subscribing to ${p}`);
  subSocket.connect(`tcp://127.0.0.1:${p}`);
});
subSocket.subscribe('chat'); // フィルタにchatを指定してサブスクリプション生成。これでchatで始まるメッセージのみを受信。

// subソケットに届くメッセージ（後述）のリッスンを開始
subSocket.on('message', msg => {
  console.log(`From other server: ${msg}`);

  // メッセージからプレフィックスchat を除去する簡単な字句解析を行ってから、それを現在のwebsocketサーバに接続しているすべてのクライアントにブロードキャストする
  broadcast(msg.toString().split(' ')[1]);
});

const wss = new WebSocketServer({ server: server });
wss.on('connection', ws => {
  console.log('Client connected');

  // 新しいメッセージをWebSocketで受信する
  ws.on('message', msg => {
    console.log(`Message: ${msg}`);

    // 接続するすべてのクライアントにブロードキャスト
    broadcast(msg);

    // pubソケットを通じてパブリッシュ
    // プレフィックスのchatと空白1文字で、メッセージはchatをフィルタとして使うすべてのサブスクリプションにパブリッシュされる。
    pubSocket.send(`chat ${msg}`);
  });
});

function broadcast(msg) {
  wss.clients.forEach(client => {
    client.send(msg);
  });
}

server.listen(args['http'] || 8080);

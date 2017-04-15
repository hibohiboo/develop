# sequalize

Node.jsのORM

## マイグレーション

サンプルを参照[*][*4]

## 自動的にテーブルを作る。

```js
#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('init:server');
var http = require('http');
var models = require("../models");

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function () {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

function normalizePort(val) { /* ... */ }
function onError(error) { /* ... */ }
function onListening() { /* ... */ }
```

## 参考

[Node.jsのSequelizeでDBのmigrationを実行する][*1]
[公式][*2]
[Sequelizeを使用してデータベースを操作するための基本的な情報][*3]
[express-sample][*4]
[TypeScriptでsequelize と戦う日記 #1 モデルを定義する][*5]

[*1]:http://qiita.com/cobot00/items/0bc0da1095e09bcd0d5f
[*2]:http://docs.sequelizejs.com/en/v3/docs/getting-started/
[*3]:http://qiita.com/mima_ita/items/014dcb42872f3a10855b
[*4]:https://github.com/sequelize/express-example
[*5]:http://qiita.com/orzngo/items/186d700de481cc23c055
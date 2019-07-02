"use strict";

const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  // システムと同数のワーカを起動
  for (let i = 0; i < cpus; i++) {  // [1]
    cluster.fork();
  }
} else {
  // cluster.fork()によってメインモジュール（clusterdApp)は再度実行される。
  // このとき、ワーカーモード(cluster.isWorkerがtrue, cluster.isMasterがfalse)として起動される。
  require('./app');  // [2]
}

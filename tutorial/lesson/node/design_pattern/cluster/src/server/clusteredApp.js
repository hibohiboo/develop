"use strict";

const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // システムと同数のワーカを起動
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  // ワーカが終了したことを検知
  cluster.on('exit', (worker, code) => {

    // 異常終了の場合、新たなワーカーをforkする
    if (code != 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker crashed. Starting a new worker. code: ${code}, disconnected: ${worker.exitedAfterDisconnect}`);
      cluster.fork();
    }
  });

  // ワーカーの再起動は、シグナルSIGUSR2を受信することで開始される。
  process.on('SIGUSR2', () => {
    console.log('Restarting workers');
    const workers = Object.keys(cluster.workers);

    /**
     * イテレータ関数を定義。
     * オブジェクトcluster.workersのすべてのアイテムを非同期的に順に処理するパターンを実装
     *
     * @param {*} i
     * @returns
     */
    function restartWorker(i) {
      if (i >= workers.length) return;
      const worker = cluster.workers[workers[i]];
      console.log(`Stopping worker: ${worker.process.pid}`);
      // ワーカーを適切に停止
      worker.disconnect();

      // 終了させたプロセスが停止したら、新しいワーカーをforkする
      worker.on('exit', () => {
        if (!worker.suicide) return;
        const newWorker = cluster.fork();

        // 新しいワーカーが稼働を開始して、新たな接続を待ち受けるようになったら、イテレーションの次のステップを呼び出して次のワーカーの再起動へ進む
        newWorker.on('listening', () => {
          restartWorker(i + 1);
        });
      });
    }
    restartWorker(0);
  });
} else {
  // cluster.fork()によってメインモジュール（clusterdApp)は再度実行される。
  // このとき、ワーカーモード(cluster.isWorkerがtrue, cluster.isMasterがfalse)として起動される。
  require('./app');
}

"use strict";

const EventEmitter = require('events').EventEmitter;
const ProcessPool = require('./processPool');
const workers = new ProcessPool(__dirname + '/subsetSumWorker.js', 2);

class SubsetSumFork extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
  }

  start() {
    workers.acquire((err, worker) => {  // [1]

      // 実行すべきジョブの入力をメッセージとして子プロセスに送信
      // sendはchild_prosess.fork()で開始されたすべてのプロセスに対してNodeによって自動的に提供される
      worker.send({ sum: this.sum, set: this.set });

      // リスナー
      const onMessage = msg => {

        // SubsetSumのタスクが終了したことを表すendイベントを受け取ったかどうか
        if (msg.event === 'end') {  // [3]
          worker.removeListener('message', onMessage);
          workers.release(worker);
        }

        this.emit(msg.event, msg.data);  // [4]
      };


      // onによりリスナーを付加。ワーカープロセスから返されるすべてのメッセージの監視（リスニング）を始める。
      worker.on('message', onMessage);  // [2]
    });
  }
}

module.exports = SubsetSumFork;

"use strict";

const totalSales = require('./totalSales');

const queues = {};
const cache = {};

module.exports = function totalSalesBatch(item, callback) {
  const cached = cache[item];

  // キャッシュがあればそれを返す
  if (cached) {
    console.log('Cache hit');
    return process.nextTick(callback.bind(null, null, cached));
  }

  // キューがすでに存在すれば、そのitemに関するリクエストは処理中。
  if (queues[item]) {
    console.log('Batching operation');
    return queues[item].push(callback);
  }

  queues[item] = [callback];
  totalSales(item, (err, res) => {
    if (!err) {
      // キャッシュを登録
      cache[item] = res;

      // 30秒でキャッシュを無効化する設定をセット
      setTimeout(() => {
        delete cache[item];
      }, 30 * 1000); //30 seconds expiry
    }

    // もとのAPI totalSalesに対するリクエストが完了したら、キューに追加されたすべてのコールバックを順に処理して結果を返す。
    const queue = queues[item];
    queues[item] = null;
    queue.forEach(cb => cb(err, res));
  });
};

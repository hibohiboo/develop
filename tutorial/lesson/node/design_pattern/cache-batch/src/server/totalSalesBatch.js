"use strict";

const totalSales = require('./totalSales');

const queues = {};
module.exports = function totalSalesBatch(item, callback) {

  // キューがすでに存在すれば、そのitemに関するリクエストは処理中。
  if (queues[item]) {  // [1]
    console.log('Batching operation');
    return queues[item].push(callback);
  }

  queues[item] = [callback];  // [2]
  totalSales(item, (err, res) => {

    // もとのAPI totalSalesに対するリクエストが完了したら、キューに追加されたすべてのコールバックを順に処理して結果を返す。
    const queue = queues[item];  // [3]
    queues[item] = null;
    queue.forEach(cb => cb(err, res));
  });
};

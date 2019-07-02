"use strict";

const SubsetSum = require('./subsetSum');

// 親プロセスから送られてくるメッセージのリスニングをすぐに開始。
// process.onはchild_process.fork()を使ってプロセスを開始したときに得られる。
process.on('message', msg => {  // [1]
  const subsetSum = new SubsetSum(msg.sum, msg.set);

  subsetSum.on('match', data => {  // [2]
    process.send({ event: 'match', data: data });
  });

  subsetSum.on('end', data => {
    process.send({ event: 'end', data: data });
  });

  subsetSum.start();
});

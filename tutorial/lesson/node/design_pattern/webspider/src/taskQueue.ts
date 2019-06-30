const co = require('co');

export default class TaskQueue {
  private running: number;
  private taskQueue: Array<() => IterableIterator<void>>;
  private consumerQueue: Array<(something: any, task: () => IterableIterator<void>) => IterableIterator<void>>;

  constructor(concurrency: number) {
    this.running = 0;
    this.taskQueue = [];
    this.consumerQueue = [];
    this.spawnWorkers(concurrency);
  }

  /**
   * これを使うものがプロデューサとみなされる
   * @param task 
   */
  pushTask(task) {
    if (this.consumerQueue.length !== 0) {
      this.consumerQueue.shift()!(null, task);
    } else {
      this.taskQueue.push(task);
    }
  }

  /**
   * ワーカーはコンシューマの役目を持つ
   * @param concurrency
   */
  spawnWorkers(concurrency: number) {
    const self = this;
    for (let i = 0; i < concurrency; i++) {
      co(function* () {
        while (true) {
          const task = yield self.nextTask();
          yield task;
        }
      });
    }
  }

  // #@@range_begin(list2)
  nextTask() {
    return callback => {
      if (this.taskQueue.length !== 0) {
        return callback(null, this.taskQueue.shift());
      }

      this.consumerQueue.push(callback);
    }
  }
};

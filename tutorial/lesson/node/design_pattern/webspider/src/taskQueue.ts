
export default class TaskQueue {
  public running: number;
  public queue: Array<(callback: () => void) => void>;

  constructor(public concurrency: number) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  pushTask(task) {
    this.queue.push(task);
    this.next();
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();

      //  this.queue.lengthでチェックしていてもtask()がundefinedの可能性があるとコンパイラに怒られたため追記
      if (!task) {
        return;
      }

      // tslint:disable-next-line ...  TS2722: Cannot invoke an object which is possibly 'undefined'.を消したかったが消えなかった。
      task(() => {
        this.running--;
        this.next();
      });
      this.running++;
    }
  }
};

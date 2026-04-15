const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class SuperTask {
  constructor(maxCount = 2) {
    this.maxCount = maxCount;
    this.runningCount = 0;
    this.queue = [];
  }

  setMaxCount(size) {
    if (!Number.isInteger(size) || size < 1) {
      throw new Error("maxCount must be a positive integer");
    }

    this.maxCount = size;
    this.run();
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.run();
    });
  }

  run() {
    while (this.runningCount < this.maxCount && this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();
      this.runningCount++;

      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this.run();
        });
    }
  }
}

const superTask = new SuperTask(2);

function addTask(time, name) {
  superTask.add(() => timeout(time)).then(() => {
    console.log(`任务${name}完成`);
  });
}

addTask(10000, 1); // 10秒后输出 任务1完成
addTask(5000, 2); // 5秒后输出 任务2完成
addTask(3000, 3); // 8秒后输出 任务3完成
addTask(2000, 4); // 10秒后输出 任务4完成
addTask(5000, 5); // 15秒后输出 任务5完成

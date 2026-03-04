const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const createDeferer = () => {
  const obj = {
    resolve: null,
    promise: null,
  };
  obj.promise = new Promise((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });

  return obj;
};

class SuperTask {
  constructor() {
    this.maxCount = 2;
    this.currCount = 0;
    this.tasks = [];
    this.promise = null;
  }

  add(fn) {
    const defer = createDeferer();
    this.tasks.push({
      fn,
      defer,
    });
    this.run();

    return defer.promise;
  }

  run() {
    if (this.currCount < this.maxCount && this.tasks.length) {
      this.currCount++;
      const currObj = this.tasks.shift();
      currObj
        .fn()
        .then(() => {
          currObj.defer.resolve();
          this.run();
        })
        .catch((err) => currObj.defer.reject(err))
        .finally(() => {
          this.currCount--;
          this.run();
        });
    }
  }
}

const task = new SuperTask();

function addTask(time, name) {
  task
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

addTask(10000, 1); // 10秒后输出 任务1完成
addTask(5000, 2); // 5秒后输出 任务2完成
addTask(3000, 3); // 8秒后输出 任务3完成
addTask(2000, 4); // 10秒后输出 任务4完成
addTask(5000, 5); // 15秒后输出 任务5完成

/******************************
 *  Mini Scheduler (面试用)
 *  实现：
 *   1. 任务优先级
 *   2. 小顶堆调度队列
 *   3. 时间切片 (time slicing)
 *   4. 可中断任务
 ******************************/

// 任务优先级（React 真实有 5 种）
const Priority = {
  Immediate: 1,
  Normal: 2,
  Low: 3,
};

// 当前任务 id
let taskId = 1;

// 小顶堆（按 expirationTime 排序）
let taskQueue = [];

/** push 入队 **/
function scheduleCallback(priority, callback) {
  const now = performance.now();
  const timeout =
    priority === Priority.Immediate ? 0 :
    priority === Priority.Normal ? 100 :
    3000; // Low 优先级最长

  const task = {
    id: taskId++,
    callback,
    priority,
    startTime: now,
    expirationTime: now + timeout,
  };

  taskQueue.push(task);
  taskQueue.sort((a, b) => a.expirationTime - b.expirationTime);

  requestHostCallback();
}

/** 利用 MessageChannel，优先级高于 rIC，比较接近 React 真调度 **/
let isHostCallbackScheduled = false;
const channel = new MessageChannel();
channel.port1.onmessage = performWorkUntilDeadline;

function requestHostCallback() {
  if (!isHostCallbackScheduled) {
    isHostCallbackScheduled = true;
    channel.port2.postMessage(null);
  }
}

/** 工作循环：每一帧执行 5ms，时间切片 **/
function performWorkUntilDeadline() {
  isHostCallbackScheduled = false;

  const frameDeadline = performance.now() + 5; // 每次最多 5ms

  let task = peek();
  while (task && performance.now() < frameDeadline) {
    const callback = task.callback;
    task.callback = null;

    const next = callback();  // 执行任务

    if (next) {
      task.callback = next; // 任务没做完 → 下次继续
    } else {
      pop(); // 执行完从队列移除
    }

    task = peek();
  }

  // 若还有任务，下一帧继续
  if (task) requestHostCallback();
}

/** 小顶堆操作 **/
function peek() {
  return taskQueue.length > 0 ? taskQueue[0] : null;
}
function pop() {
  return taskQueue.shift();
}

/********** 使用示例 **********/

scheduleCallback(Priority.Low, () => {
  console.log("低优先级开始");
  return () => console.log("低优先级：下一帧继续");
});

scheduleCallback(Priority.Immediate, () => {
  console.log("立即执行任务");
});

scheduleCallback(Priority.Normal, () => {
  console.log("普通优先级任务");
});

console.log("调度器启动完毕");

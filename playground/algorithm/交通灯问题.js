let timerId = null;
let running = true;  // 控制是否继续循环

function light(color, duration) {
  return new Promise(resolve => {
    console.log(color);

    timerId = setTimeout(() => {
      if (!running) return; // 停止后，不继续 resolve
      resolve();
    }, duration);
  });
}

function start() {
  light("red", 3000)
    .then(() => light("green", 2000))
    .then(() => light("yellow", 1000))
    .then(() => {
      if (running) start(); // 若仍在运行，则继续循环
    });
}

function stop() {
  running = false;
  clearTimeout(timerId);
  console.log("Traffic light stopped.");
}

// 启动循环
start();

// 示例：5 秒后停止红绿灯
// setTimeout(stop, 5000);

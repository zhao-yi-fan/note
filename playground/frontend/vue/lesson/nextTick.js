/**
 * ==========================================================
 *                nextTick 简易版（带详细笔记）
 * ==========================================================
 *
 * 本文包含你提出的所有疑问，并附上详细解答：
 *
 * 1. callbacks 是不是直接放在全局？
 * 2. 为什么 flushCallbacks 要用 callbacks.slice()？
 * 3. 为什么不能直接遍历 callbacks？
 * 4. callbacks.push(cb3) 时为什么不会导致队列错乱？
 * 5. pending 有什么作用？
 * 6. 为什么优先使用 Promise 微任务？
 *
 * 一份代码解决你所有 nextTick 的疑惑。
 */

// =====================
//  nextTick 的全局共享队列
// =====================
/**
 * 问：callbacks 放在全局安全吗？
 *
 * 答：不是 window 全局，而是模块级单例（闭包全局）。
 *    nextTick 需要“全局共享队列”，因为所有 nextTick 调用都必须进入同一批次执行，
 *    才能正确实现“批处理 + 合并更新”。
 * 
 * ✔ Vue2 / Vue3 内部也是使用这种单例队列。
 */
const callbacks = [];
let pending = false;


// =====================
//  刷新队列：执行当前批次所有 nextTick 回调
// =====================
function flushCallbacks() {
  pending = false;

  /**
   * 问：const copies = callbacks.slice() 是取数组第一项吗？
   *
   * ❌ 不是！
   * ✔ 它是复制整个队列（浅拷贝），并不是取第一项。
   *
   * 为什么要复制？
   * ----------------------------------------
   * 因为 nextTick 的特点是：
   *
   *   - 执行 callbacks 时，可能又有人调用 nextTick(cb3)
   *   - 会 push 新的 cb3 到 callbacks 队列
   *   - 新任务应该进入“下一轮 tick”，不能污染当前轮
   *
   * 如果不 slice，一边遍历 callbacks 一边 push，会导致：
   *
   *  - cb3 被提前执行（本来应该下一轮执行）
   *  - 或者遍历结束后 callbacks.length = 0 会把 cb3 清掉（任务丢失）
   *  - 执行顺序乱套
   *
   * slice 的作用：
   *   ✔ 锁定本轮要执行的任务
   *   ✔ 新 push 的任务进入下一轮，不影响本轮
   */
  const copies = callbacks.slice();

  // 清空原队列，新的 nextTick 回调进入下一轮执行
  callbacks.length = 0;

  // 执行当前批次的回调
  for (let cb of copies) {
    cb();
  }
}


// =====================
//  微任务优先调度器
// =====================
let timerFunc;

/**
 * 问：为什么 nextTick 要优先使用 Promise 微任务？
 *
 * ✔ 因为微任务执行时机最接近 DOM 更新完成的时机。
 *
 * Vue 的 DOM 更新是异步的，会在微任务队列中 flush。
 * 所以 nextTick 用 Promise，就能保证：
 *
 *   “等 DOM 更新完成后，立即执行回调”
 *
 * Promise → 是真正的 microtask
 * setTimeout → macrotask，太慢，时机不对
 */
if (typeof Promise !== "undefined") {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks);
  };
} else {
  // 如果环境不支持 Promise（极老旧环境）
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}


// =====================
//  nextTick 的主函数
// =====================
function nextTick(cb) {
  callbacks.push(cb);

  /**
   * pending 用来避免重复调度：
   *
   * 场景：
   *   nextTick(cb1)
   *   nextTick(cb2)
   *   nextTick(cb3)
   *
   * 如果没有 pending，可能会触发 3 次 Promise 微任务，
   * 让 flushCallbacks 执行 3 次，性能浪费还会逻辑混乱。
   *
   * 有了 pending：
   *   ✔ 第一次 nextTick 调度微任务
   *   ✔ pending = true 后面 nextTick 不再调度
   *   ✔ 同一轮事件循环，只会触发一次 flushCallbacks
   */
  if (!pending) {
    pending = true;
    timerFunc(); // 安排微任务（或退化为宏任务）
  }
}


/**
 * ================================
 *     再补充一些重要结论（总结）
 * ================================
 *
 * ✔ callbacks.slice() 不是取第一项，而是复制整个队列
 * ✔ 防止在执行过程中 nextTick(cb3) 污染当前批次
 * ✔ callbacks 是模块全局（单例队列），不是 window 全局
 * ✔ nextTick 始终批量执行，而不是立即执行
 * ✔ pending 用来保证调度只发生一次
 * ✔ Promise 微任务是 nextTick 行为正确的关键
 *
 * 有了这些，你已经完全理解 nextTick 的核心机制。
 */

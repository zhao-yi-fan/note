/**
 * 发布订阅模式（Pub-Sub Pattern）
 *
 * 核心特点：
 *   - 发布者和订阅者完全解耦
 *   - 通过事件类型（type）来通信
 *   - 消息中心（PubSub 类）作为中介
 *
 * 与观察者模式的区别：
 *   - 观察者模式：发布者直接调用观察者的方法（紧耦合）
 *   - 发布订阅：通过事件类型间接通信（松耦合）
 */

class PubSub {
  constructor() {
    // 存储所有事件和对应的回调函数
    // 格式: { 'eventType': [fn1, fn2, ...], ... }
    this.subscribers = {};
  }

  /**
   * 订阅事件
   * @param {string} type - 事件类型
   * @param {function} fn - 回调函数
   */
  subscribe(type, fn) {
    // 如果这个事件类型第一次被订阅，初始化数组
    if (!Object.prototype.hasOwnProperty.call(this.subscribers, type)) {
      this.subscribers[type] = [];
    }

    // 把回调函数加入到这个事件的监听者列表
    this.subscribers[type].push(fn);
  }

  /**
   * 取消订阅
   * @param {string} type - 事件类型
   * @param {function} fn - 要移除的回调函数
   */
  unsubscribe(type, fn) {
    let listeners = this.subscribers[type];
    if (!listeners || !listeners.length) return;
    // 过滤出不等于 fn 的函数，相当于删除 fn
    this.subscribers[type] = listeners.filter((v) => v !== fn);
  }

  /**
   * 发布事件
   * @param {string} type - 事件类型
   * @param {...any} args - 传递给订阅者的参数
   */
  publish(type, ...args) {
    let listeners = this.subscribers[type];
    if (!listeners || !listeners.length) return;
    // 执行这个事件的所有回调函数
    listeners.forEach((fn) => fn(...args));
  }
}

// ===== 使用示例 =====
let ob = new PubSub();

// 订阅 'add' 事件
ob.subscribe("add", (val) => console.log("爸爸通知: " + val));
ob.subscribe("add", (val) => console.log("妈妈通知: " + val));
ob.subscribe("add", (val) => console.log("姥姥通知: " + val));

// 发布 'add' 事件，所有订阅者都会收到
console.log("=== 发布 add 事件 ===");
ob.publish("add", "小宝宝开心了！");

// 再发布一次
console.log("\n=== 再次发布 add 事件 ===");
ob.publish("add", "小宝宝睡着了");

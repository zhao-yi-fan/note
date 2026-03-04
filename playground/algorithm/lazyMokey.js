/* 实现 Monkey，返回的对象提供 eat 和 sleep 两个函数，支持链式调用。具体调用方式如下所示：
new Monkey('Alan').eat('Banana').sleep(4).eat('Apple').sleep(5).eat('Pear')
代码执行后输出:

my name is Alan
I eat Banana
等待 4 s
I eat Apple
等待 5 s
I eat Pear */


/**
 * 1.不使用promise的方式
 *  */
/* class Monkey {
  constructor(name) {
    console.log(`my name is ${name}`);
    this.name = name;
    this.stack = [];
    this.blocking = false;
  }
  eat(foodName) {
    this.stack.push((next) => {
      console.log(`I eat ${foodName}`);
      next();
    });
    this.execute();
    return this;
  }
  sleep(time) {
    this.stack.push((next) => {
      setTimeout(() => {
        console.log(`等待 ${time} s`);
        next();
      }, time * 1000);
    });
    this.execute();
    return this;
  }

  execute() {
    if (this.blocking) return;
    this.blocking = true;
    const next = () => {
      const fn = this.stack.shift();
      console.log(fn,'fn====');
      if (fn) {
        fn(next);
      } else {
        this.blocking = false;
      }
    };
    next();
  }
} */

/**
 * 2.使用promise的方式
 * 
 *  */
class Monkey {
  constructor(name) {
    this.name = name;
    this.stack = [];
    this.result = null;
  }
  eat(foodName) {
    this.stack.push(async () => {
      console.log(`I eat ${foodName}`);
      return Promise.resolve();
    });
    this.run();
    return this;
  }

  sleep(time) {
    this.stack.push(() => {
      console.log(`等待 ${time}s`);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time * 1000);
      });
    });
    this.run();
    return this;
  }

  async run() {
    const fn = () => {
      const first = this.stack.shift();
      if (first) {
        return first();
      }
    };
    // @TODO 不能顺序执行promise
    if (this.result) {
      await this.result;
    }
    this.result = fn();
    console.log(this.result);
    await this.result;
  }
}

new Monkey("Alan")
  .sleep(4)
  .eat("Banana1")
  .sleep(5)
  .eat("Banana2")
  // .eat("Banana3")
  // .eat("Banana4")
  // .eat("Pear")
  // .eat("Apple");

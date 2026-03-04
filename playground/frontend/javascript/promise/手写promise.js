class Promise {
  constructor(executorCallback) {
    this.status = "pending";
    this.value = undefined;
    this.fulfilledAry = [];
    this.rejectedAry = [];

    // 执行executor（异常捕获）
    let resolveFn = (result) => {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        if (this.status !== "pending") return;
        this.status = "fulfilled";
        this.value = result;
        console.log(this.fulfilledAry.length, "length");
        this.fulfilledAry.forEach((item) => item(this.value));
      }, 0);
    };
    let rejectFn = (reason) => {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        if (this.status !== "pending") return;
        this.status = "rejected";
        this.value = reason;
        this.rejectedAry.forEach((item) => item(this.value));
      }, 0);
    };
    try {
      executorCallback(resolveFn, rejectFn); // 返回两个回调函数，每个回调函数都需要传参
    } catch (err) {
      rejectFn(err);
    }
  }

  then(fulfilledCallBack, rejectedCallBack) {
    // 传参是function什么都不做 , 如果传参不是一个函数的话 那么将赋值成一个传什么返回什么的函数
    if (typeof fulfilledCallBack !== "function") {
      fulfilledCallBack = (result) => result;
    }
    if (typeof rejectedCallBack !== "function") {
      rejectedCallBack = (reason) => {
        throw new Error(reason instanceof Error ? reason.message : reason);
      };
    }

    // 返回一个新的promise实例
    return new Promise((resolve, reject) => {
      // this从上文找是最初的promise实例，不是最新的
      console.dir(this, "this");
      this.fulfilledAry.push(() => {
        try {
          let x = fulfilledCallBack(this.value);
          // 返回的x有可能是普通值也有可能还是一个promise实例
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err);
        }
      });
      this.rejectedAry.push(() => {
        try {
          let x = rejectedCallBack(this.value);
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  catch(rejectedCallBack) {
    return this.then(null, rejectedCallBack);
  }

  // 私有属性
  static all(promiseAry = []) {
    return new Promise((resolve, reject) => {
      // index：记录成功的数量 result：记录成功的结果
      let index = 0,
        result = [];
      for (let i = 0; i < promiseAry.length; i++) {
        // promiseAry[i]:每一个需要处理的promise实例
        promiseAry[i].then((val) => {
          index++;
          result[i] = val; // 索引需要和promiseAry对应上，保证结果的顺序和数组顺序一致
          if (index === promiseAry.length) {
            resolve(result);
          }
        }, reject);
      }
    });
  }
}
// commonjs规范
module.exports = Promise;

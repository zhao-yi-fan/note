// react事务就是这么实现的
class Transaction {
  perform (anyMethod, warpper) {
    warpper.initialize();
    anyMethod();
    warpper.close();

  }
}

let transaction = new Transaction();

let oldFunc = () => {
  console.log('原有的逻辑')
}

transaction.perform(oldFunc, [{
  initialize () {
    console.log('初始化1')
  },
  close () {
    console.log('关闭1')
  },
  {
    initialize () {
      console.log('初始化2')
    },
    close () {
      console.log('关闭2')
    }
  }
}]);
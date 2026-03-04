// 观察者模式 是包含发布订阅的
// vue watch就是观察者模式
class Subject {// 被观察者
  constructor() {
    // 注册
    this.stack = [];
    this.state = '开心'
  }
  attach () {
    this.stack.push(observer);
  }
  setState (newState) {
    // 发布
    this.state = newState;
    this.stack.forEach(o => o.update(newState))
  }
}
class Observer { // 观察者
  constructor(name) {
    this.name = name;
  }
  update (newState) {
    console.log(this.name + '小宝宝' + newState)
  }
}

let o1 = new Observer('爸爸')
let o2 = new Observer('妈妈')
let s = new Subject('小宝宝');
s.attach(o1);
s.attach(o2);
s.setState('不开心')
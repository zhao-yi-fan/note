# react实现原理

## setState实现原理

:::info
`setState`什么时候是同步的，什么时候是异步的?
- 在React能管辖的地方就是批量异步的。比如事件处理函数，比如生命周期函数
- 在React管不到的地方，就是同步的。比如`setTimeout` `setInterval` `原生的事件处理函数`
:::

### 实现原理
```javascript
import { compareTwoVdom, findDOM } from './react-dom'

// 更新队列
export let updateQueue = {
  isBatchingUpdate: false, // 默认不批量更新，同步的
  updaters: [], // 更新器的数组
  batchUpdate () { // 批量更新
    for (const updater of updateQueue.updaters) {
      updater.updateComponent()
    }
    updateQueue.updaters.length = 0;
    updateQueue.isBatchingUpdate = false;
  }
}
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = []; // 等待生效的数组
  }
  addState (partialState) {
    this.pendingStates.push(partialState)
    this.emitUpdate(); // 触发更新
  }
  emitUpdate () {
    // 有可能是批量异步更新，也有可能是同步更新
    if (updateQueue.isBatchingUpdate) { // 批量异步更新
      updateQueue.updaters.push(this) // 不刷新视图了，把当前的updater放到更新队列中
    } else { // 同步更新
      this.updateComponent();
    }
  }
  updateComponent () {
    const { classInstance, pendingStates } = this;
    if (pendingStates.length > 0) {
      sholdUpdate(classInstance, this.getState());
    }
  }
  getState () {
    const { classInstance, pendingStates } = this;
    let { state } = classInstance;
    pendingStates.forEach((partialState) => {
      if (typeof partialState === 'function') {
        partialState = partialState(state);
      }
      state = { ...state, ...partialState }
    })
    pendingStates.length = 0;
    return state;
  }
}

function sholdUpdate (classInstance, nextState) {
  classInstance.state = nextState;
  classInstance.forceUpdate();
}
class Component {
  static isReactComponent = true
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  setState (partialState) {
    this.updater.addState(partialState);
  }
  forceUpdate () {
    let oldRenderVdom = this.oldRenderVdom;
    // let oldDOM = oldRenderVdom.dom;
    let oldDOM = findDOM(oldRenderVdom);
    // 基于新的属性和状态，计算新的虚拟DOM
    let newRenderVdom = this.render()
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);

    this.oldRenderVdom = newRenderVdom;
  }
}

export default Component
```
### 例子
```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0, age: 10 }
  }
  handleClick = (event) => {
    // setState参数是新的状态对象，这个新状态对象会合并到老状态对象上。
    // 老状态没有的属性会添加，老状态有的属性会被覆盖

    /* this.setState({ number: this.state.number + 1 })
    console.log(this.state.number); // => 0
    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number); // => 0

    Promise.resolve().then(() => {
      this.setState({ number: this.state.number + 1 })
      console.log(this.state.number); // => 2
      this.setState({ number: this.state.number + 1 })
      console.log(this.state.number); // => 3
    })
     */

    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number); // => 0
    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number); // => 0

    setTimeout(() => {
      this.setState({ number: this.state.number + 1 })
      console.log(this.state.number); // => 2
      this.setState({ number: this.state.number + 1 })
      console.log(this.state.number); // => 3
    }, 1000);
    

    // this.setState((state) => ({ number: state.number + 1 }))

    /* 
    // 如果直接修改state的话，this.state确实改变了，但视图不会更新
    this.state.number += 1; 
    */
    

    // Cannot add property title, object is not extensible
    // this.props.title = '新标题';
  }
  render () {
    return (
      <div>
        <p>{this.props.title}</p>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
```



## react的关系

`react` 和 `react-dom`/`react-vr`/`react-native`的关系

`react`用来处理核心逻辑，diff算法，虚拟dom对象的操作。

`react-dom`是浏览器中处理真实DOM的库，用于消费`react`所处理的结果

`react-natvie`是在ios/安卓中消费`react`所处理的结果


## @welldone-software/why-did-you-render

检测重复渲染的插件


在项目中安装好后，创建`wdyr.ts`

```typescript
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false, // 是否跟踪所有的函数组件
  });
}
```

在`src`目录的`index.ts`最上方引入 `import './wdyr';`

### 使用

所有函数组件全部跟踪  `trackAllPureComponents`为`true`

某个组件中使用

```javascript
// 函数式组件
export const ProjectListScreen = () => <></>
ProjectListScreen.whyDidYouRender = true;

// 类组件
class ProjectListScreen extends React.Component {
  static whyDidYouRender = true;
}
```
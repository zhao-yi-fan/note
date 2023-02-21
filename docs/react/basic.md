# react原理及难点

## 函数组件比类组件的优势

1. 不需要维护实例，函数组件执行完就销毁，内存占用小，性能会更好
2. 速度快

## 合成事件

### 事件合成的好处?

1. 批量异步更新

在事件、生命周期开始的时候 `updateQueue.isBatchingUpdate = true` `setState`执行时只追加更新内容，但不进行更新
在事件、生命周期结束的时候 `updateQueue.isBatchingUpdate = false` 结束时将更新器全部进行批量更新

:::info
在`React17`之`前`，所有的事件都委托到`document`上

在`React17`之`后`，所有的事件都委托到`容器`上  这是因为之前如果页面中有多个React应用，事件绑定容易冲突；
```javascript
<div id="container"></div>

<div id="container1"></div> // ReactDOM.render(<h1>, container1)
<div id="container2"></div> // ReactDOM.render(<h2>, container2)
```
:::

2. 对浏览器进行兼容性处理

把不同浏览器的API不一致的，把不同的事件对象做成一个标准化的事件对象，提供标准的API供用户使用

例如
```javascript
function stopPropagation(event){
  if(!event){ // IE下
    window.event.cancelBubble = true;
  }
  if(event.stopPropagation){ // w3c标准
    event.stopPropagation()
  }
}
```

### 原理
`event.js`
```javascript
import { updateQueue } from './Component'

export function addEvent (dom, eventType, eventHandler) {
  let store;
  if (dom._store) {
    store = dom._store;
  } else {
    dom._store = store = {};
  }
  // store.onclick = handleClick;
  store[eventType] = eventHandler;
  // document.onclick = dispatchEvent;
  if (!document[eventType]) {
    document[eventType] = dispatchEvent
  }
}

/**
 * 不管点什么按钮，触发什么事件，最终都会执行dispatchEvent方法
 * 在合成事件的处理函数中，状态的更新是批量的
 * @param {*} event 原生的事件对象，不同的浏览器可能不一样
 */
function dispatchEvent (event) {
  // type: 'click' type: 'click'
  const { target, type } = event;
  const eventType = `on${type}`;
  // 先把批量更新的标识改为true
  updateQueue.isBatchingUpdate = true;
  let syntheticEvent = createSyntheticEvent(event);
  let currentTarget = target;
  // 模拟冒泡
  while (currentTarget) {
    // 获取事件源DOM对象上的store属性
    const { _store } = currentTarget;
    const eventHandler = _store && _store[eventType];
    if (eventHandler) {
      syntheticEvent.target = target;
      syntheticEvent.currentTarget = currentTarget;
      eventHandler.call(currentTarget, syntheticEvent);
    }
    currentTarget = currentTarget.parentNode;
  }
  updateQueue.isBatchingUpdate = false;
  updateQueue.batchUpdate(); // 真正的更新
}

function createSyntheticEvent (nativeEvent) {
  const syntheticEvent = { nativeEvent };
  for (const key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key];
  }
  // 此处会有一些兼容性处理
  return syntheticEvent;
}
```

```javascript
import { addEvent } from './event'
/**
 * 把新的属性更新到真实DOM上
 * @param {*} dom 真实DOM
 * @param {*} oldProps 旧的属性对象
 * @param {*} newProps 新的属性对象
 */
function updateProps (dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') {
      continue; // 此处忽略子节点的处理
    } else if (key === 'style') {
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith('on')) {
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]); // => 合成事件
    } else {
      dom[key] = newProps[key]; // className
    }

  }
}

```

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

## ref实现原理

ref分有`原生标签`、`类组件`、`函数组件`

原生标签的ref：如果给一个原生组件添加了一个ref属性，那么原生组件虚拟DOM变成真实DOM之后，会把真实DOM元素赋值给ref.current

### 原理
`./constants`
```javascript
export const REACT_FORWARD_REF = Symbol('react.forward_ref');
```

`./react`
```javascript
+ import { REACT_ELEMENT, REACT_FORWARD_REF } from './constants'
+ function createRef () {
+   return { current: null }
+ }

+ function forwardRef (render) {
+   return {
+     $$typeof: REACT_FORWARD_REF,
+     render, // 渲染函数
+   }
+ }

const React = {
  createElement,
  Component,
+   createRef,
+   forwardRef
}
export default React;
```

`./react-dom`
```javascript
export function createDOM (vdom) {
  if (!vdom) return null;
  let { type, props, ref } = vdom;
  let dom; // 真实DOM
  + if (ref && type.$$typeof === REACT_FORWARD_REF) { // 函数组件
  +   return mountForwardComponent(vdom);
  + } else if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content)
  } else if (typeof type === 'function') {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);
    }
    return mountFunctionComponent(vdom);

  } else {
    dom = document.createElement(type);
  }
  // 处理属性
  if (props) {
    updateProps(dom, {}, props);
    if (props.children) {
      let children = props.children;
      if (typeof children === 'object' && children.type) {
        mount(children, dom)
      } else if (Array.isArray(children)) {
        reconcileChildren(props.children, dom)

      }
    }
  }
  vdom.dom = dom;
  + if (ref) ref.current = dom; // 类组件 把真实DOM赋值给ref.current
  return dom;
}

+ function mountForwardComponent (vdom) {
+   let { type, props, ref } = vdom;
+   let renderVdom = type.render(props, ref)
+   vdom.oldRenderVdom = renderVdom;
+   return createDOM(renderVdom);
+ }

function mountClassComponent (vdom) {
  let { type: ClassComponent, props, ref } = vdom;
  let classInstance = new ClassComponent(props);
+   if (ref) ref.current = classInstance;
  let renderVdom = classInstance.render(props);
  classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}
```


### 原生标签使用
```javascript
import React from '../react'
import ReactDOM from '../react-dom'

class Calculate extends React.Component {
  constructor(props) {
    super(props)
    this.aRef = React.createRef()
    this.bRef = React.createRef()
    this.resuleRef = React.createRef()
  }
  handleClick = () => {
    const a = this.aRef.current.value
    const b = this.bRef.current.value
    this.resuleRef.current.value = parseInt(a) + parseInt(b)
  }
  render () {
    return (
      <div>
        <input ref={this.aRef} type="text" />+
        <input ref={this.bRef} type="text" />
        <button onClick={this.handleClick}>=</button>
        <input ref={this.resuleRef} type="text" />
      </div>
    )
  }
}
ReactDOM.render(<Calculate />, document.getElementById('root'))
```

### 类组件使用
```javascript
import React from '../react'
import ReactDOM from '../react-dom'

class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }
  getFocus = () => {
    this.textInput.current.focus()
  }

  render () {
    return (
      <div>
        <input type="text" ref={this.textInput} />
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  handleClick = () => {
    this.textInput.current.getFocus()
  }

  render () {
    return (
      <div>
        <TextInput ref={this.textInput} />
        <button onClick={this.handleClick}>聚焦</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 函数组件使用
```javascript
import React from '../react'
import ReactDOM from '../react-dom'

function InputText (props, forwardRef) {
  return <input type="text" ref={forwardRef} />
}
const ForwardInputText = React.forwardRef(InputText)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }
  getFocus = () => {
    this.textInput.current.focus()
  }
  /* Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? */
  render () {
    return <div>
      <ForwardInputText ref={this.textInput} />
      <button onClick={this.getFocus}>聚焦</button>
    </div>
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
```
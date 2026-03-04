import React from '../react'
import ReactDOM from '../react-dom'

/* 
setState什么时候是同步的，什么时候是异步的
- 在React能管辖的地方就是批量异步的，比如事件处理函数，比如生命周期函数
- 在React管不到的地方，就是同步的，比如setTimeout setInterval 原生的事件处理函数

*/
class Counter extends React.Component {
  constructor(props) {
    super(props);
    // 只有在构造函数中才直接给this.state赋值
    this.state = { number: 0, age: 10 }
  }
  handleClick = (syntheticEvent) => {
    // setState参数是新的状态对象，这个新状态对象会合并到老状态对象上。
    // 老状态没有的属性会添加，老状态有的属性会被覆盖
    // state状态的更新是批量的，是异步执行的

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
    // console.log(syntheticEvent.stopPropagation);
    // syntheticEvent.stopPropagation();

    // this.setState((state) => ({ number: state.number + 1 }))

    /* 
    // 如果直接修改state的话，this.state确实改变了，但视图不会更新
    this.state.number += 1; 
    */


    // Cannot add property title, object is not extensible
    // this.props.title = '新标题';
  }

  divHandleClick = (syntheticEvent) => {
    console.log('syntheticEvent');
  }
  render () {
    return (
      <div onClick={this.divHandleClick}>
        <p>{this.props.title}</p>
        <p>number:{this.state.number}</p>
        <p>age:{this.state.age}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}


ReactDOM.render(
  <Counter />, document.getElementById('root')
)

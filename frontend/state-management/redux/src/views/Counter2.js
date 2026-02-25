import React, { Component } from 'react'
import * as redux from 'zredux';
import store from '../store'
import actions from '../store/actions/counter2'

let boundActions = redux.bindActionCreators(actions, store.dispatch)
/**
 * 组件关联仓库两个方向
 * 输入 组件里使用仓库提供的状态进行组件的渲染
 * 输出 在组件可以派发动作从而修改仓库中的状态
 */
export default class Counter2 extends Component {
  state = store.getState().counter2
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState().counter2)
    })
  }
  componentWillUnmount () {
    this.unsubscribe()
  }
  render () {
    return (
      <div style={{ color: this.state.color }}>
        <p>{this.state.number}</p>
        <button onClick={boundActions.add2}>+</button>
        <button onClick={boundActions.minus2}>-</button>
        <button onClick={() => boundActions.changeColor('green')}>改变颜色</button>
      </div>
    )
  }
}

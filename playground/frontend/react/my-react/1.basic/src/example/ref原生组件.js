import React from '../react'
import ReactDOM from '../react-dom'

class Calculate extends React.Component {
  constructor(props) {
    super(props)
    this.aRef = React.createRef()
    this.bRef = React.createRef()
    this.resultRef = React.createRef()
  }
  handleClick = () => {
    console.log(this.aRef);
    const a = this.aRef.current.value
    const b = this.bRef.current.value
    this.resultRef.current.value = parseInt(a) + parseInt(b)
  }
  render () {
    // 如果给一个原生组件添加了一个ref属性，那么原生组件虚拟DOM变成真实DOM之后，会把真实DOM元素赋值给ref.current
    return (
      <div>
        <input ref={this.aRef} type="text" />+
        <input ref={this.bRef} type="text" />
        <button onClick={this.handleClick}>=</button>
        <input ref={this.resultRef} type="text" />
      </div>
    )
  }
}

ReactDOM.render(<Calculate />, document.getElementById('root'))
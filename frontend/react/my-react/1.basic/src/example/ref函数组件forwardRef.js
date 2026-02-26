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
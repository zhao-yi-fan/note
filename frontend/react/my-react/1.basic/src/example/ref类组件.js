import React from 'react'
import ReactDOM from 'react-dom'

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
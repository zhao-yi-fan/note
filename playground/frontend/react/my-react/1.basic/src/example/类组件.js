import React from '../react'
import ReactDOM from '../react-dom'

// React.createElement会返回一个React元素 
// react元素是一个普通的js对象，它描述了dom的内容，常说的虚拟dom

// jsx语法在编译时会通过babel变成React.createElement语法
// babel并没有把JSX编译成虚拟DOM，而是把JSX编译成了React.createElement的方法调用。
/*#__PURE__*/  // 该注释是用来实现tree-shaking
let element1 = React.createElement("h1", {
  className: "title",
  style: {
    color: 'red'
  }
}, "hello", React.createElement('span', null, 'world'));

// ReactDOM.render会负责渲染，把React元素渲染到DOM容器内（root）
ReactDOM.render(
  // <h1 className='title' style={{ color: 'red' }}>hello</h1>
  element1, document.getElementById('root')
)

console.log(JSON.stringify(element1, null, 2));


/**
 * 原生：
 * {
    "type": "h1",
    "key": null,
    "ref": null,
    "props": {
      "className": "title",
      "style": {
        "color": "red"
      },
      "children": "hello"
    },
    "_owner": null,
    "_store": {}
  }
 */
/**
 * 自己的：
 * {
    "type": "h1",
    "props": {
      "className": "title",
      "style": {
        "color": "red"
      },
      "children": {
        "type": Symbol('REACT_TEXT'),
        "props": {
          "content": "hello"
        }
      }
    }
  }
 */
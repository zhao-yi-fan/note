// import './1.css'

import './1.less'
// import url from './Screenshot_1667581037.png'
// const img = new Image()
// img.src = url
// document.body.appendChild(img)

class Person {
  constructor(name) {
    this.name = name
  }
  getName () {
    return this.name
  }
}

const p = new Person('zs')
console.log(p.getName());

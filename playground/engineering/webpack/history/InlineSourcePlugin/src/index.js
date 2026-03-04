import './1.css'
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

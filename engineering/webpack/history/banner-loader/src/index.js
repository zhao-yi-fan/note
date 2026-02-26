import './1'
class Person {
  constructor(name) {
    this.name = name
  }
  getName () {
    return this.name
  }
}

const p = new Person('zs')
p.getName()

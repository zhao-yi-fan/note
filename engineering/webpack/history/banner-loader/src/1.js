class Animal {
  constructor(name) {
    this.name = name
  }
  getName () {
    return this.name
  }
}

const p = new Animal('老虎')
p.getName()

console.log(p?.getName?.());
console.log(p.getName() ?? '');
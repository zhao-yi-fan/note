const obj = {
  otherName: '123',
  otherAge: 18,
  set name (newValue) {
    console.warn('不允许赋值');
  },
  get name () {
    return this.otherName
  }
}

console.log(obj.name);
obj.name = 2
console.log(obj.name);

Object.defineProperty(obj, 'age', {
  get () {
    return this.otherAge
  },
  set (newValue) {
    this.otherAge = newValue
  }
})

console.log(obj.age);
obj.age = 2
console.log(obj);
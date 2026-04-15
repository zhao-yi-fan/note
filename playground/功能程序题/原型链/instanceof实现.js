function myInstanceof(left, right) {
  if (left === null || (typeof left !== "object" && typeof left !== "function")) {
    return false;
  }

  if (typeof right !== "function") {
    throw new TypeError("Right-hand side of instanceof is not callable");
  }

  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;

  while (proto !== null) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

function Person(name) {
  this.name = name;
}

const person = new Person("zs");

console.log(myInstanceof(person, Person)); // true
console.log(myInstanceof(person, Object)); // true
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof([], Object)); // true
console.log(myInstanceof(1, Number)); // false
console.log(myInstanceof(null, Object)); // false

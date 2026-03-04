const proxyMap = new WeakMap();

function reactive(target) {
  if (typeof target !== "object" || target === null) return target;

  if (proxyMap.has(target)) return proxyMap.get(target);

  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      if (typeof res === "object" && res !== null) {
        return reactive(res);
      }
      return res;
    },

    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);

      if (oldValue !== value) {
        render();
      }
      return result;
    },
  });

  proxyMap.set(target, proxy);
  return proxy;
}

function render() {
  console.log("模拟视图的更新");
}

let obj = {
  name: "jw",
  age: { age: 100 },
  arr: [],
};

let proxy = reactive(obj);
proxy.age.age = 200;
console.log(proxy.age.age);
proxy.arr.push(123);
proxy.arr[0] = 100;
console.log(obj);

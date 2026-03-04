function deepClone(obj, cache = new WeakMap()) {
  
  if (obj === null || typeof obj !== "object") return obj;

  // 1. 如果已有缓存，直接返回
  if (cache.has(obj)) return cache.get(obj);

  const clone = Array.isArray(obj) ? [] : {};

  // 2. 加入缓存
  cache.set(obj, clone);

  // 3. 深拷贝子属性
  for (const key in obj) {
    clone[key] = deepClone(obj[key], cache);
  }

  return clone;
}

console.log(
  deepClone({
    a: 1,
    b: {},
  })
);


/* function deepClone(obj, cache = new WeakMap()) {
  // 1. 基础类型
  if (obj === null || typeof obj !== "object") return obj;

  // 2. 循环引用
  if (cache.has(obj)) return cache.get(obj);

  // 3. 特殊类型处理
  const type = Object.prototype.toString.call(obj);

  switch (type) {
    case "[object Date]":
      return new Date(obj.getTime());

    case "[object RegExp]":
      const re = new RegExp(obj.source, obj.flags);
      re.lastIndex = obj.lastIndex;
      return re;

    case "[object Map]":
      const map = new Map();
      cache.set(obj, map);
      obj.forEach((v, k) => {
        map.set(deepClone(k, cache), deepClone(v, cache));
      });
      return map;

    case "[object Set]":
      const set = new Set();
      cache.set(obj, set);
      obj.forEach(v => {
        set.add(deepClone(v, cache));
      });
      return set;

    case "[object ArrayBuffer]":
      return obj.slice(0);

    case "[object Error]":
      const error = new obj.constructor(obj.message);
      error.stack = obj.stack;
      return error;

    // 更多类型可继续扩展...

  }

  // 4. 一般对象 / 数组：保留原型
  const clone = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj));

  cache.set(obj, clone);

  // 5. 遍历所有属性，包括 Symbol & 不可枚举属性
  Reflect.ownKeys(obj).forEach(key => {
    const desc = Object.getOwnPropertyDescriptor(obj, key);

    if (desc.get || desc.set) {
      Object.defineProperty(clone, key, desc);
    } else {
      clone[key] = deepClone(obj[key], cache);
    }
  });

  return clone;
} */

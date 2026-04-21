/**
 * 循环引用：对象的属性最终又引用回这个对象本身，形成环
 * 例如：
 * const obj = {};
 * obj.self = obj;
 *
 * 深拷贝时如果不做处理，递归会一直沿着 self 往下走，导致无限递归
 *
 * 这里用 WeakMap 记录“原对象 => 克隆对象”的映射
 * 如果递归过程中再次遇到同一个对象，说明它之前已经处理过了
 * 这时直接返回缓存里的克隆结果
 *
 * 并且要先缓存，再递归子属性
 * 这样即使子属性又引用回当前对象，也能拿到已经创建好的克隆对象
 */
/* function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;

  if (cache.has(obj)) return cache.get(obj);

  const clone = Array.isArray(obj) ? [] : {};

  cache.set(obj, clone);

  for (const key in obj) {
    clone[key] = deepClone(obj[key], cache);
  }

  return clone;
} */

function deepClone(target, cache = new WeakMap()) {
  if (target === null || typeof target !== "object") {
    return target;
  }

  if (cache.has(target)) return cache.get(target);

  const clone = Array.isArray(target) ? [] : {};

  cache.set(target, clone);

  for (const key in target) {
    clone[key] = deepClone(target[key], cache);
  }

  return clone;
}

console.log(
  deepClone({
    a: 1,
    b: {},
  }),
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

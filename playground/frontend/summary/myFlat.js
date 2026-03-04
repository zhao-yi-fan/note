const arr = [1, [2, 3], [4, [5, 6]]];

// ===== 方法1: 递归 + while 循环（原方法优化版）=====
function myFlat1(arr) {
  let newArr = [];
  function flatten(list) {
    let i = 0;
    while (i < list.length) {
      const curr = list[i];
      if (Array.isArray(curr)) {
        flatten(curr);
      } else {
        newArr.push(curr);
      }
      i++;
    }
  }
  flatten(arr);
  return newArr;
}

// ===== 方法2: 递归 + forEach（更简洁）=====
function myFlat2(arr) {
  let newArr = [];
  function flatten(list) {
    list.forEach(item => {
      if (Array.isArray(item)) {
        flatten(item);
      } else {
        newArr.push(item);
      }
    });
  }
  flatten(arr);
  return newArr;
}

// ===== 方法3: 递归 + reduce（函数式编程）=====
function myFlat3(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? myFlat3(item) : item);
  }, []);
}

// ===== 方法4: 递归 + for...of（最易读）=====
function myFlat4(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...myFlat4(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

// ===== 方法5: 迭代 + 栈（避免递归栈溢出）=====
function myFlat5(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  return result;
}

// ===== 方法6: 支持指定深度的 flat =====
function myFlat6(arr, depth = Infinity) {
  if (depth <= 0) return arr;
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? myFlat6(item, depth - 1) : item);
  }, []);
}

// 测试
console.log('方法1:', JSON.stringify(myFlat1(arr)));
console.log('方法2:', JSON.stringify(myFlat2(arr)));
console.log('方法3:', JSON.stringify(myFlat3(arr)));
console.log('方法4:', JSON.stringify(myFlat4(arr)));
console.log('方法5:', JSON.stringify(myFlat5(arr)));
console.log('方法6(深度1):', JSON.stringify(myFlat6(arr, 1)));
console.log('方法6(深度2):', JSON.stringify(myFlat6(arr, 2)));

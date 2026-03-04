function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // 找到索引
    }

    if (arr[mid] < target) {
      left = mid + 1; // 去右边
    } else {
      right = mid - 1; // 去左边
    }
  }

  return -1; // 找不到
}

const arr = [1, 3, 5, 7, 9, 11];
const index = binarySearch(arr, 7);

console.log(index); // 输出 3

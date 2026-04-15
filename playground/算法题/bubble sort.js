/**
 * 冒泡排序（Bubble Sort）
 *
 * 核心思想：
 *   - 通过比较相邻的两个元素，如果左边大于右边则交换
 *   - 每完成一轮，最大的元素会 "冒泡" 到末尾
 *   - 重复 n-1 轮，直到数组排序完成
 *
 * 交换逻辑（三步走）：
 *   1. temp = arr[j+1]      先保存较小值到临时变量
 *   2. arr[j+1] = arr[j]    把较大值移到右边
 *   3. arr[j] = temp        把较小值移到左边
 *
 * 时间复杂度：O(n²)
 *   - 最坏情况：数组完全逆序，需要比较 n*(n-1)/2 次
 *   - 最好情况：数组已排序，只需 n-1 次比较
 *
 * 空间复杂度：O(1)
 *   - 只使用了一个临时变量 temp
 */

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
console.log(bubbleSort([20, 10, 66, 44]));

/**
 * 原地打乱数组顺序
 * “原地”指直接修改原数组本身，不创建新的数组来存放结果
 * Fisher-Yates shuffle
 *
 * 为什么用 Math.floor:
 * Math.random() * (i + 1) 的范围是 [0, i + 1)
 * 配合 Math.floor 后，刚好能得到 0 到 i 的随机整数下标
 * 这里不能用 Math.ceil，因为它取不到 0，还可能取到 i + 1，导致下标越界
 *
 * 为什么是 i--:
 * 这版写法是从后往前确定每个位置放谁
 * 每轮把 array[i] 和 0 到 i 中的某个随机位置交换
 * 交换完成后，i 右边的元素位置就已经确定了，所以要继续往前推进
 */
function shuffleArray(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("shuffleArray expects an array");
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const nums = [1, 2, 3, 4, 5];
console.log("before:", nums);
console.log("after:", shuffleArray(nums));

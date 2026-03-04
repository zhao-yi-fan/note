/**
 *
 * @param numbers int整型一维数组
 * @param target int整型
 * @return int整型一维数组
 */
function twoSum(numbers, target) {
  // write code here
  let map = {};
  for (let i = 0; i < numbers.length; i++) {
    if (map[target - numbers[i]] !== undefined) {
      return [map[target - numbers[i]] + 1, i + 1];
    }
    map[numbers[i]] = i;
  }
  return [];
}
module.exports = {
  twoSum: twoSum,
};
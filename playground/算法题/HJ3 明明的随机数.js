function sortUniqueNumbers(arr) {
  return [...new Set(arr)].sort((a, b) => a - b);
}

console.log(sortUniqueNumbers([2, 2, 1, 5, 3, 4, 4]));

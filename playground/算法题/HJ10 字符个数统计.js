function countUniqueChars(str) {
  return new Set(str).size;
}

console.log(countUniqueChars("abcabc"));

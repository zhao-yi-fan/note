function removeMinCountChars(str) {
  const map = {};

  for (const ch of str) {
    map[ch] = (map[ch] || 0) + 1;
  }
  const min = Math.min(...Object.values(map));
  let result = "";

  for (const ch of str) {
    if (map[ch] !== min) {
      result += ch;
    }
  }

  return result;
}

console.log(removeMinCountChars("aabcddd"));

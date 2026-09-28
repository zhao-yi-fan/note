function runMicroTask(fn) {
  // node
  if (typeof process !== "undefined" && typeof process.nextTick === "function") {
    process.nextTick(fn);
  } else if (typeof MutationObserver === "function") {
    // 浏览器
    const ob = new MutationObserver(fn);
    const text = document.createTextNode("1");
    ob.observe(text);
    text.data = "2";
  } else {
    setTimeout(fn); // 最小延迟通常约为 4ms
  }
}

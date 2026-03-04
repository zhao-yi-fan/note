// 属性操作
function hostPatchProps (el, key, value) {
  if (/^on[^a-z]/.test(key)) { // 事件 onClick
    const eventName = key.slice(2).toLowerCase();
    el.addEventListener(eventName, value);
  } else {
    // 其他属性
    if (key == 'style') {
      for (let key in value) {
        el.style[key] = value[key];
      }
    } else {
      el.setAttribute(key, value);
    }
  }
}
import { updateQueue } from './Component'

export function addEvent (dom, eventType, eventHandler) {
  let store;
  if (dom._store) {
    store = dom._store;
  } else {
    dom._store = store = {};
  }
  // store.onclick = handleClick;
  store[eventType] = eventHandler;
  // document.onclick = dispatchEvent;
  if (!document[eventType]) {
    document[eventType] = dispatchEvent
  }
}

/**
 * 不管点什么按钮，触发什么事件，最终都会执行dispatchEvent方法
 * 在合成事件的处理函数中，状态的更新是批量的
 * @param {*} event 原生的事件对象，不同的浏览器可能不一样
 */
function dispatchEvent (event) {
  // type: 'click' type: 'click'
  const { target, type } = event;
  const eventType = `on${type}`;
  // 先把批量更新的标识改为true
  updateQueue.isBatchingUpdate = true;
  let syntheticEvent = createSyntheticEvent(event);
  let currentTarget = target;
  // 模拟冒泡
  while (currentTarget) {
    // 获取事件源DOM对象上的store属性
    const { _store } = currentTarget;
    const eventHandler = _store && _store[eventType];
    if (eventHandler) {
      syntheticEvent.target = target;
      syntheticEvent.currentTarget = currentTarget;
      eventHandler.call(currentTarget, syntheticEvent);
    }
    currentTarget = currentTarget.parentNode;
  }
  updateQueue.isBatchingUpdate = false;
  updateQueue.batchUpdate(); // 真正的更新

}

function createSyntheticEvent (nativeEvent) {
  const syntheticEvent = { nativeEvent };
  for (const key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key];
  }
  // 此处会有一些兼容性处理
  return syntheticEvent;
}
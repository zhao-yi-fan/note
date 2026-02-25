import { observe } from "./observe/index";

export function initState (vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm)
  }
}

function initData (vm) {
  // 数据劫持 Object.defineProperty
  console.log(1111);
  let data = vm.$options.data;
  data = typeof data === 'function' ? data.call(vm) : data;
  observe(data);
}
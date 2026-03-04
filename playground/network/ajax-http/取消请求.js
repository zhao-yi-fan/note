// 取消请求.js
// 说明：只演示“取消请求”相关的 API，不做额外封装，便于你在 demo 里直接拷贝理解。

// ============================
// 一、原生 XMLHttpRequest：xhr.abort()
// ============================
// 适用：最基础的 ajax 写法
// 关键点：
//   - 使用同一个 xhr 对象发请求
//   - 需要取消时，调用 xhr.abort()
//   - 可以在 onabort / onreadystatechange 里判断是否被取消

// 示例：
// const xhr = new XMLHttpRequest();
// xhr.open('GET', '/api/user', true);
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       console.log('请求成功', xhr.responseText);
//     } else {
//       console.log('请求失败或被取消', xhr.status);
//     }
//   }
// };
// xhr.onabort = function () {
//   console.log('xhr 请求被 abort() 取消');
// };
// xhr.send();
//
// // 某个时机（比如点击“取消”按钮）
// // document.getElementById('cancelBtn').onclick = function () {
// //   xhr.abort();
// // };

// ============================
// 二、fetch + AbortController：控制 signal.abort()
// ============================
// 适用：原生 fetch 请求
// 核心 API：
//   - new AbortController()
//   - controller.signal 传给 fetch 的 options.signal
//   - controller.abort(reason?) 触发取消
//   - 被取消后，fetch 的 Promise 会 reject 一个 name === 'AbortError' 的错误

// 示例：
// const controller = new AbortController();
// const signal = controller.signal;
//
// fetch('/api/list', { signal })
//   .then(res => res.json())
//   .then(data => {
//     console.log('fetch 成功', data);
//   })
//   .catch(err => {
//     if (err.name === 'AbortError') {
//       console.log('fetch 请求被取消');
//     } else {
//       console.log('fetch 请求失败', err);
//     }
//   });
//
// // 某个时机取消
// // controller.abort('用户手动取消');
// // 注意：同一个 controller 可以关联多个 fetch，调用一次 abort 会把它们全部取消。

// ============================
// 三、axios 旧写法：CancelToken（0.x 版本常见，v1 之后官方标记废弃）
// ============================
// 核心 API：
//   - const source = axios.CancelToken.source();
//   - 在请求 config 里传入 cancelToken: source.token
//   - 取消时调用 source.cancel('可选的原因');
//   - catch 中通过 axios.isCancel(err) 判断是否是取消

// 示例（老项目里可能还能看到）：
// const source = axios.CancelToken.source();
//
// axios.get('/api/user', {
//   cancelToken: source.token
// })
//   .then(res => {
//     console.log('axios 请求成功', res.data);
//   })
//   .catch(err => {
//     if (axios.isCancel(err)) {
//       console.log('axios 请求被取消', err.message);
//     } else {
//       console.log('axios 请求失败', err);
//     }
//   });
//
// // 某个时机取消
// // source.cancel('手动取消 axios 请求');

// ============================
// 四、axios 新推荐写法：直接用 AbortController（和 fetch 一样）
// ============================
// 前提：使用的是支持 AbortController 的 axios 版本（1.x 及以上普遍支持）。
// 核心 API：
//   - const controller = new AbortController();
//   - 在 axios config 里传入 signal: controller.signal
//   - controller.abort(reason?) 取消
//   - axios 会在 catch 中抛出一个取消错误，一般 name 为 'CanceledError' 或 'AbortError'

// 示例：
// const controller = new AbortController();
//
// axios.get('/api/list', {
//   signal: controller.signal
// })
//   .then(res => {
//     console.log('axios 请求成功', res.data);
//   })
//   .catch(err => {
//     // 新版 axios 取消通常是 CanceledError，也可以根据实际版本打印 err 看一下
//     if (err.name === 'CanceledError' || err.name === 'AbortError' || axios.isCancel?.(err)) {
//       console.log('axios 请求被取消');
//     } else {
//       console.log('axios 请求失败', err);
//     }
//   });
//
// // 某个时机取消
// // controller.abort('用户离开页面，取消 axios 请求');

// ============================
// 小结
// ============================
// 1. 原生 xhr：       xhr.abort()
// 2. 原生 fetch：     AbortController + fetch(url, { signal })，通过 controller.abort() 取消
// 3. 旧版 axios：     CancelToken（axios.CancelToken.source() / source.cancel()）—— 现在不推荐新代码再用
// 4. 新版 axios：     和 fetch 一样使用 AbortController，在 config 里传 signal，然后 controller.abort()

let xhr = new XMLHttpRequest()
xhr.open('GET', '接口', false);
// 监听状态改变
xhr.onreadystatechange = function () {
  if (xhr.status == 200 && xhr.readyState == 4) {
    console.log(xhr.responseText)
  }
}
// 发送请求
xhr.send()



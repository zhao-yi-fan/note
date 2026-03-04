# Express 基础知识点

## 静态资源服务

```js
// 访问路径: /a/xxx -> public/xxx
app.use('/a/', express.static('public/'))

// 访问路径: /xxx -> public/xxx（省略 /public/ 前缀）
app.use(express.static('./public/'))
```

注意：
- 相对路径可以省略 `./
- 目录名后的 `/` 可以省略

## 路由

路由本质是一张映射表，定义请求路径与处理函数的对应关系。

```js
app.get('/', function (req, res) {
    res.send('hello world')
})
```

## 响应方法

### res.send() vs res.json()

- `res.send(字符串)` → 自动设置 `Content-Type: text/html`
- `res.send(对象/数组)` → 自动设置 `Content-Type: application/json`
- `res.json()` → 强制序列化为 JSON，设置 `Content-Type: application/json`

```js
// 发送 HTML，浏览器会渲染
res.send('<h1>hello</h1>')

// 发送 JSON，HTML 被当作字符串序列化，浏览器不会渲染
res.json('<h1>hello</h1>')
```

### res.write() vs res.end() vs res.send()

- `res.write()` - 写入响应体，可多次调用，不设置 Content-Type
- `res.end()` - 结束响应，必须调用
- `res.send()` - Express 封装，自动设置 Content-Type 并调用 end()

```js
// 等价于 res.send('hello world')
res.write('hello world')
res.end()
```

注意：如果只使用 `write()` + `end()`，不会自动设置 Content-Type，可能导致浏览器无法正确解析。

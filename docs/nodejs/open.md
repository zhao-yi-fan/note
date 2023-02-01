
# 自动打开浏览器open库

## 使用
:::info
用户设定host 或者 port，在浏览器自动打开链接
:::
```javascript
const open = require('open');

await open(`http://${this.config.host}:${this.config.port}`, { app: { name: 'google chrome' } });
```
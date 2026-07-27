---
title: rollup
date: 2024/01/15
tags:
  - 构建工具
categories:
  - 工程化
---

# rollup

## 封装时的注意项
> 对于外部依赖如何处理？

- 封装时不应该把外部第三方依赖打包，打包时进行排除
![1563094729353](./media/demo9.png)
> rollup.config.js

```javascript
// 指出哪些模块需要被视为外部引入
external: ['@sentry/browser', '@sentry/integrations', 'js-cookie']
```

> package.json  还需要设置dependencies外部引入的模块

![1563094729353](./media/demo11.png)
::: info
被引入作为第三方依赖时，
devDependencies：不会随库一起安装到使用方项目中；但在库项目本身开发时执行 npm install 会安装
dependencies：会随库一起安装到使用方项目中
:::

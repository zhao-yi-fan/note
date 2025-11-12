---
title: 技术术语词汇表
date: 2021/08/22
tags:
  - 其他
categories:
  - 其他
---

# 技术术语词汇表

## 性能指标

### QPS (Queries Per Second)

**每秒查询数**

- 数据库中的概念，表示每秒执行的查询条数
- 常用于压力测试场景
- **注意**：仅包括查询操作，不包括插入、更新、删除操作
- **建议**：不建议用 QPS 来描述系统整体性能

### TPS (Transactions Per Second)

**每秒事务数**

- 表示每秒完成的事务数量
- 事务定义灵活，可以是：
  - 单个接口调用
  - 多个接口组合
  - 完整的业务流程
- **计算方式**：从事务内第一个请求发送到接收到最后一个请求响应的完整过程

## 云服务

### SCF (Serverless Cloud Function)

**无服务器云函数**

腾讯云提供的 Serverless 计算服务，开发者无需管理服务器，按实际使用量付费。

## 前端开发

### GC (Generate Component)

**生成组件**

用于快速生成组件文件的命令或工具。

### SFC (Single File Component)

**单文件组件**

Vue.js 中的概念，将模板、脚本和样式封装在单个 `.vue` 文件中。

```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello World'
    }
  }
}
</script>

<style scoped>
div {
  color: blue;
}
</style>
```

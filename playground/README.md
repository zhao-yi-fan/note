# 📚 技术学习笔记库

> 个人技术学习记录与整理，持续更新中...
> 创建于 2026年2月11日

## 🎯 项目结构

本仓库按技术栈和领域划分为 8 个主目录，每个目录下包含相关的学习笔记、代码示例和最佳实践。

## 📊 学习路线图

```
前端核心 ──┬─> JavaScript ───┬─> ES6+
           │                 ├─> Promise/Async
           │                 ├─> Event Loop
           │                 └─> 闭包/原型链
           ├─> TypeScript
           ├─> CSS/HTML
           ├─> React ────────> Next.js
           ├─> Vue ──────────> Nuxt.js
           ├─> 性能优化 ─────┬─> Core Web Vitals
           │                 ├─> ArrayBuffer/Blob
           │                 └─> 代码优化
           ├─> 状态管理 ─────┬─> Redux
           │                 └─> Pinia
           ├─> 前端安全 ─────┬─> XSS
           │                 └─> CSRF
           └─> 微前端 ───────┬─> Qiankun
                             └─> Module Federation

后端开发 ──┬─> Node.js
           ├─> Express
           ├─> Koa
           ├─> NestJS
           └─> 消息队列 ──────> Kafka

工程化 ────┬─> Webpack
           ├─> Babel
           ├─> Git
           ├─> 测试 ─────────┬─> Jest
           │                 └─> 单元测试
           └─> 设计模式

DevOps ────> Docker ──────────> 容器化
                                └─> Docker Compose

AI 人工智能 ─> LangChain ───────> LLM应用开发
                                ├─> RAG
                                └─> Agents

网络协议 ──┬─> Ajax/HTTP
           ├─> WebSocket
           ├─> 跨域解决方案
           └─> DNS

移动端 ────┬─> Flutter
           ├─> React Native
           ├─> JSBridge (dsBridge)
           └─> 移动端适配

算法基础 ──> 数据结构 ─────────┬─> 数组/链表
                              ├─> 栈/队列
                              ├─> 树/图
                              └─> 排序算法
```

## 📂 目录导航

### 🎨 Frontend - 前端核心

| 目录 | 内容 | 进度 | 状态 |
|------|------|------|------|
| `javascript/` | JS核心概念：变量提升、闭包、原型链、Promise、ES6+ | ⏳ 整理中 | 🟡 |
| `typescript/` | TS类型系统、泛型、装饰器 | ⏳ 整理中 | 🟡 |
| `css-html/` | CSS布局、HTML5 API、Less预处理器、模板引擎 | ⏳ 整理中 | 🟡 |
| `seo/` | SEO优化、Meta标签、Theme Color | ⏳ 整理中 | 🟡 |
| `react/` | React hooks、组件化、状态管理 | ⏳ 整理中 | 🟡 |
| `vue/` | Vue3组合式API、SSR、测试 | ⏳ 整理中 | 🟡 |
| `next/` | Next.js (React SSR框架) | 📝 计划中 | ⚪ |
| `nuxt/` | Nuxt.js (Vue SSR框架) | 📝 计划中 | ⚪ |
| `performance/` | 前端性能优化 | ⏳ 整理中 | 🟡 |
| ├─ `fcp-metrics/` | Core Web Vitals、FCP/LCP/FID | ⏳ 整理中 | 🟡 |
| ├─ `array-buffer/` | Blob、File、ArrayBuffer、图片处理 | ⏳ 整理中 | 🟡 |
| └─ `optimization/` | 代码分割、懒加载、Tree Shaking | ⏳ 整理中 | 🟡 |
| `state-management/` | Redux、Pinia等状态管理 | ⏳ 整理中 | 🟡 |
| `security/` | XSS、CSRF等前端安全 | ⏳ 整理中 | 🟡 |
| `micro-frontend/` | 微前端架构、qiankun | ⏳ 整理中 | 🟡 |
| `visualization/` | 数据可视化、大屏开发、ECharts | ⏳ 整理中 | 🟡 |
| `seo/` | SEO优化、Meta标签、Theme Color | ⏳ 整理中 | 🟡 |

### ⚙️ Backend - 后端开发

| 目录 | 内容 | 进度 | 状态 |
|------|------|------|------|
| `nodejs/` | Node.js核心模块、事件循环、Stream | ⏳ 整理中 | 🟡 |
| `express/` | Express框架、路由、中间件、模板引擎 | ✅ 完成 | 🟢 |
| `koa/` | Koa洋葱模型、中间件、async/await | ⏳ 整理中 | 🟡 |
| `nestjs/` | NestJS企业级Node框架、依赖注入 | 📝 计划中 | ⚪ |
| `messaging/kafka/` | Kafka消息队列、流处理 | 📝 计划中 | ⚪ |

### 🛠️ Engineering - 工程化

| 目录 | 内容 | 进度 | 状态 |
|------|------|------|------|
| `webpack/` | Webpack配置优化、Loader、Plugin、HMR | ⏳ 整理中 | 🟡 |
| `babel/` | Babel转译配置、插件开发、polyfill | ⏳ 整理中 | 🟡 |
| `git/` | Git工作流、常用命令、分支策略 | ⏳ 整理中 | 🟡 |
| `testing/` | 单元测试、集成测试、Jest、Vue Test Utils | ✅ 完成 | 🟢 |
| `design-patterns/` | JavaScript设计模式 | ⏳ 整理中 | 🟡 |
| `zmp/` | 百度YY微前端框架（基于Module Federation） | ⏳ 整理中 | 🟡 |
| `module-federation/` | Webpack模块联邦规范、微前端架构 | 📝 计划中 | ⚪ |

### 🐳 DevOps - 运维部署

| 目录 | 内容 | 进度 | 状态 |
|------|------|------|------|
| `docker/` | Docker容器化、镜像构建、Docker Compose | 📝 计划中 | ⚪ |

### 🤖 AI - 人工智能

| 目录 | 内容 | 进度 | 状态 |
|------|------|------|------|
| `langchain/` | LangChain应用开发、RAG、Agents | 📝 计划中 | ⚪ |

### 🌐 Network - 网络协议

| 目录 | 内容 | 进度 | 状态 |
|------|------|------|------|
| `ajax-http/` | Ajax、Axios、Fetch、HTTP协议详解、取消请求 | ⏳ 整理中 | 🟡 |
| `websocket/` | WebSocket、Socket.io、Server-Sent Events | ⏳ 整理中 | 🟡 |
| `cross-origin/` | 跨域解决方案：CORS、JSONP、Proxy | ⏳ 整理中 | 🟡 |
| `dns/` | DNS解析原理、优化策略 | ⏳ 整理中 | 🟡 |

### 📱 Mobile - 移动端

| 目录 | 内容 | 进度 | 状态 |
|------|------|------|------|
| `flutter/` | Dart语言、Flutter跨平台开发 | ⏳ 整理中 | 🟡 |
| `react-native/` | React Native移动应用开发 | 📝 计划中 | ⚪ |
| `ds-bridge/` | JSBridge通信、Hybrid开发 | ⏳ 整理中 | 🟡 |
| `mobile-dev/` | 移动端适配、rem/vw、调试技巧 | ⏳ 整理中 | 🟡 |

### 📊 Algorithm - 算法与数据结构

| 目录 | 内容 | 进度 | 状态 |
|------|------|------|------|
| `algorithm/` | 数据结构、算法、LeetCode题解 | ⏳ 整理中 | 🟡 |

---

## 📈 进度图例

- 🟢 **完成** - 已有完整笔记和示例
- 🟡 **进行中** - 已有部分笔记，持续更新
- ⚪ **计划中** - 待学习，已创建目录占位
- 🔴 **待整理** - 已有文件但未按规范整理

---

## 📝 笔记规范

每个技术目录建议包含以下结构：

```
topic/
├── README.md          # 该技术栈的核心概念总览
├── notes/             # 详细学习笔记
│   ├── concept-1.md
│   ├── concept-2.md
│   └── ...
├── examples/          # 代码示例
│   ├── example-1.js
│   └── ...
├── exercises/         # 练习题/实战项目
│   └── project/
└── cheatsheet.md      # 速查表（可选）
```

### 笔记模板

```markdown
# 主题名称

## 📖 核心概念
简要说明该技术/概念是什么，解决什么问题

## 🔧 使用示例
\`\`\`javascript
// 代码示例
\`\`\`

## 📚 详细内容
1. 要点一
2. 要点二
3. 要点三

## 💡 最佳实践
- 建议1
- 建议2

## 🔗 参考资源
- [官方文档](link)
- [相关文章](link)

---
创建于: YYYY-MM-DD
最后更新: YYYY-MM-DD
```

---

## 🚀 快速开始

1. **浏览目录**: 根据你想学习的技术栈进入对应目录
2. **查看README**: 每个目录的README.md是该领域的知识索引
3. **阅读笔记**: `notes/` 目录包含详细的学习笔记
4. **运行示例**: `examples/` 目录包含可运行的代码示例
5. **动手实践**: `exercises/` 目录包含练习题和实战项目

---

## 📅 更新日志

- **2026-02-11** - 项目初始化，创建目录结构，完成索引README

---

## 🤝 贡献

这是一个个人学习笔记仓库，但欢迎：
- 提出改进建议
- 指出错误和问题
- 分享学习资源

---

**Happy Learning! 🎉**

# React vs Vue 的区别

## 渲染架构 & 原理总结

本文深入对比 React 和 Vue 的渲染架构、响应式系统以及性能优化策略。

---

## 1. React 的 Fiber 架构是什么？

**React Fiber = React16 以后重写的虚拟 DOM 引擎。**

### 解决三个核心问题：
- 可中断渲染（避免卡顿）
- 可恢复渲染
- 可优先级调度（高优先级任务提前执行）

### Fiber 的本质：
- 每个虚拟 DOM 节点对应一个 fiber node（单向链表结构）
- 每执行一小段任务就可以暂停，让浏览器处理更重要的 UI

### 渲染分两个阶段：
1. **Render Phase** —— 可中断（diff、计算节点）
2. **Commit Phase** —— 不可中断（真正更新 DOM）

:::tip
Fiber 是 React18/19 并发渲染模式（Concurrent Rendering）的基础。
:::

---

## 2. Vue3 如何处理响应式？（Proxy）

**Vue3 使用 Proxy + effect 实现真正的响应式：**

- 自动依赖收集（track）
- 自动触发更新（trigger）
- 哪个数据被使用就追踪哪个（精准更新）

### Vue3 响应式的特点：
- 新增/删除属性可监听
- 数组、Map、Set 等复杂结构可监听
- 不再需要 Vue.set / Vue.delete

:::info
Vue3 的渲染是"精准 effect 更新"，而不是整个组件重新执行。
:::

---

## 3. React vs Vue —— 响应式方式根本不同

### React 响应式方式（实际上不是响应式）：

- ❌ 没有依赖追踪
- ✋ setState/useState 手动触发重新渲染
- 🔄 函数组件重新执行（整个组件重算一次）
- 🔧 需要 useMemo / useCallback / memo 优化

### Vue 响应式方式（真正的响应式系统）：

- ✅ 自动依赖追踪（Proxy + effect）
- 🎯 哪个值变了，只更新受影响的 effect
- 🚀 不需要主动缓存函数或避免重渲染

### 粒度对比：

| 框架 | 更新粒度 | 特点 |
|------|----------|------|
| **React** | 粗粒度（组件级重渲染） | 整个组件重新执行 |
| **Vue** | 细粒度（effect 级更新） | 只更新受影响的部分 |

---

## 4. setState 是否被废弃？为什么 Hooks 里不能用 setState？

:::warning 结论
setState 并未废弃，在 React19 仍完全可用。但 setState 只能用于 Class 组件。
:::

### 原因：
- 函数组件没有 `this` → 当然没有 `this.setState`
- React 16.8 后 Hooks 成为主流：
  - `useState()`
  - `useReducer()`
- 它们是函数式组件的状态方式，取代了 setState

:::info React18 更新
React18 起：setState 开始自动批处理（批量合并渲染），行为更一致。
:::

---

## 5. React 兼容性问题：是否像 Vue3 的 Proxy 那样？

### Vue3 的兼容性限制：
- 使用 Proxy → IE11 完全不支持 → 整个框架无法运行 ❌

### React 的兼容性：
- 不使用 Proxy，因此不会"完全不能运行" ✅
- 旧浏览器缺少 Promise、Map、Symbol 等特性 → 需要 polyfill
- React19 依然支持旧方式，只要加 polyfill 可以跑在更老环境

### 总结：

| 框架 | 兼容性策略 |
|------|-----------|
| **Vue3** | Proxy 限制导致旧浏览器完全不支持 |
| **React** | 依赖现代 JS API，没有重大硬性阻断，添加 polyfill 可以跑 |

---

## 6. Vue3 的 PatchFlag / BlockTree / 静态提升 / 预字符串化

**Vue3 的模板编译器拥有强大优化能力：**

### 1) PatchFlag
- 编译器标记"哪些节点是动态的"
- diff 时只对动态节点做对比（O(1)）

### 2) Block Tree（区块树）
- 把动态节点收集成 dynamicChildren
- 静态节点 diff 过程完全跳过

### 3) 静态提升（Hoist）
- 静态节点只创建一次，不重复 diff

### 4) 预字符串化（Pre-stringify）
- 当静态内容复用 ≥ 20 次时，变为字符串节点
- 20 次为性能基准测试的最佳阈值

:::tip 核心差异
- **Vue3** = 编译器辅助渲染 + 精准 diff
- **React** = 无编译优化（只做 fiber diff，靠人用 memo/useMemo 优化）
:::

---

## 7. React vs Vue 渲染架构对比图

### React 渲染流程（以 Fiber 为核心）

```
                     state 更新
                          │
                          ▼
                setState / useState
                          │
                          ▼
                  触发重新渲染调度
                          │
                          ▼
              ┌────────────────────────┐
              │     Fiber Render Phase  │   ← 可中断、可恢复
              │  (构建 Fiber 链表，diff)│
              └────────────────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │     Fiber Commit Phase │   ← 不可中断，更新 DOM
              └────────────────────────┘
                          │
                          ▼
                 浏览器执行 DOM 更新
```

### Vue 渲染流程（以响应式 Proxy + effect 为核心）

```
                     reactive 数据变更
                          │
                          ▼
                    Proxy 触发 trigger
                          │
                          ▼
                   找到对应的 effect
               （精准依赖追踪：谁用我我更新谁）
                          │
                          ▼
              ┌────────────────────────┐
              │   effect: 运行渲染函数   │
              │   计算 vdom / patch     │
              └────────────────────────┘
                          │
                          ▼
                Vue diff（带 PatchFlag）
         （仅 diff 标记为动态的节点，静态节点跳过）
                          │
                          ▼
                 浏览器执行 DOM 更新
```

---

## 8. React vs Vue 渲染架构总结（面试常用）

### React：
- 🔄 重渲染整个组件（粗粒度）
- ⚙️ Fiber 可中断 + 可恢复 + 优先级调度
- 🔧 依赖手动优化（useMemo/useCallback/memo）

### Vue：
- 🎯 自动依赖追踪 + effect（细粒度）
- 🚀 模板编译器极致优化（PatchFlags / BlockTree）
- 📦 静态提升 + 预字符串化
- ✨ 不需要手动缓存/优化函数引用

### 核心理念差异：

| 方面 | React | Vue |
|------|-------|-----|
| **更新方式** | 重新执行 + 调度优化 | 精准依赖追踪 + 编译期优化 |
| **响应式** | 手动触发（setState） | 自动追踪（Proxy） |
| **优化** | 需要手动优化 | 编译器自动优化 |
| **粒度** | 组件级 | effect 级 |

---

## 总结

React 和 Vue 在底层架构上采用了完全不同的设计理念：

- **React** 追求灵活性和可控性，通过 Fiber 架构实现可中断的渲染，但需要开发者手动进行性能优化
- **Vue** 追求开发效率和自动优化，通过响应式系统和编译器优化，大多数情况下不需要手动优化

选择哪个框架取决于你的项目需求、团队熟悉度以及个人偏好。两者都是优秀的框架，各有所长！


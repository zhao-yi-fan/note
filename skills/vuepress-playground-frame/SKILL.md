---
name: vuepress-playground-frame
description: 为 VuePress 博客添加或维护 PlaygroundFrame 组件，并把本地 playground 文件接入 VuePress 静态构建流程。适用于这些场景：(1) 把 Markdown 里的原生 iframe 嵌入替换为统一组件；(2) 给示例增加刷新、新开、源码入口；(3) 把 playground/ 目录下选定的 HTML 示例发布到 docs/.vuepress/public/playground；(4) 维护基于 manifest 的示例同步脚本；(5) 把已失效的外部 iframe 链接迁移为站内静态路径。
---

# VuePress Playground Frame

## 概览

这个 skill 用于处理一类固定问题：VuePress 博客里需要嵌入本地静态 HTML 示例，但又不希望继续散落原生 `<iframe>`，或者继续依赖容易失效的外部链接。

它覆盖两条关联链路：

- 组件链路：封装并注册 `PlaygroundFrame`，让 Markdown 里统一用组件展示示例
- 构建链路：把 `playground/` 下的选定文件同步到 `docs/.vuepress/public/playground/`，并在 `docs:dev` / `docs:build` 前自动执行

如果仓库里已经有部分实现，比如已有 `PlaygroundFrame`、已有 `playground-manifest.json`、已有 `sync-playground.js`，先阅读 [references/workflow.md](references/workflow.md)，再决定是在原有约定上扩展，还是补齐缺失环节。

## 快速开始

处理这类需求时，先做下面几步：

1. 用 `rg -n "<iframe" docs -S` 找出所有真实渲染的 iframe
2. 确认对应的示例源文件是否真的存在于 `playground/` 下
3. 检查仓库里是否已经有：
   - `docs/.vuepress/components/PlaygroundFrame.vue`
   - `docs/.vuepress/client.ts`
   - `playground-manifest.json`
   - `scripts/sync-playground.js`
4. 优先复用现有约定，不要平行再造一套
5. 改完后执行 `npm run docs:build`

## 组件实现流程

当仓库里有多个真实 iframe，或者作者希望统一示例工具条时，优先封装成 Markdown 可直接调用的组件。

### 必备 props

组件至少应支持：

- `src`：必填，iframe 地址
- `title`：可选，工具栏标题
- `height`：可选，iframe 高度，支持数字或字符串
- `description`：可选，示例说明
- `source`：可选，源码路径或源码 URL
- `openLabel`：可选，“新开示例”按钮文案

### 必备行为

第一版至少提供这些能力：

- 刷新当前示例，不刷新整页
- 新标签打开示例
- 当 `source` 存在时，打开源码

### 组件注册规则

只有在仓库已经证明“自动发现组件”可靠时，才依赖自动注册。

如果 Markdown 里写了 `<PlaygroundFrame>`，但页面空白或组件不渲染，优先采用手动注册，在 `docs/.vuepress/client.ts` 中显式注册：

```ts
import PlaygroundFrame from "./components/PlaygroundFrame.vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component("PlaygroundFrame", PlaygroundFrame);
  },
});
```

把它视为默认兜底方案，因为有些 VuePress 组合会把组件标签编译进页面代码，但运行时并没有真的注册组件。

### 样式约定

优先把样式收敛在组件自己的 `<style scoped>` 里，只有确实需要全局覆盖时，才动 `docs/.vuepress/styles/index.scss`。

推荐：

- iframe 上方有一个紧凑工具条
- 一个主操作 + 两个轻量次级操作
- 移动端按钮允许换行
- 不依赖额外 UI 组件库

避免：

- 第一版就做自动高度，除非仓库里已经有 `postMessage` 协议
- 做过重的 loading / error 状态
- 把所有样式都塞进全局 SCSS

## 静态发布流程

路径约定保持统一：

- 源文件：`playground/...`
- 发布后站内 URL：`/playground/...`
- VuePress 静态源目录：`docs/.vuepress/public/playground/...`

### 推荐目录结构

```text
playground-manifest.json
scripts/sync-playground.js
docs/.vuepress/public/playground/   (构建生成，一般不进 git)
```

### Manifest 规则

始终使用白名单，不要默认把整个 `playground/` 目录都公开出去。

至少支持两类入口：

- `files`：单个 HTML 文件，适合纯自包含 demo
- `directories`：整个目录，适合依赖相邻 css/js/img/json 的 demo

示例：

```json
{
  "files": [
    "frontend/css-html/抛物线.html",
    "frontend/react/react-test/diff.html"
  ],
  "directories": []
}
```

### 同步脚本规则

同步脚本应保证：

1. 读取 manifest
2. 所有路径都相对 `playground/` 解析
3. 拒绝越界路径
4. 重建 `docs/.vuepress/public/playground/`
5. 只复制白名单中的文件或目录
6. 缺文件时直接报错

### package.json 接法

同步动作要挂到开发和构建前：

```json
{
  "scripts": {
    "docs:prebuild": "node scripts/sync-playground.js",
    "docs:dev": "npm run docs:prebuild && vuepress dev docs --temp .temp",
    "docs:build": "npm run docs:prebuild && vuepress build docs"
  }
}
```

除非仓库明确要求提交生成产物，否则要把 `docs/.vuepress/public/playground` 加进忽略规则。

## Markdown 迁移规则

把这类原生 iframe：

```html
<iframe src="/playground/..." width="100%" height="500px"></iframe>
```

替换成组件调用：

```md
<PlaygroundFrame
  title="示例"
  src="/playground/..."
  source="playground/..."
  :height="500"
/>
```

迁移时遵守这些规则：

- 代码块里仅作为示例字符串出现的 `<iframe>` 不动
- 只迁移真实渲染的 iframe
- `src` 永远填发布后的站内路径
- `source` 永远指向仓库内源文件路径
- 每篇文章的高度在调用处单独设置，不把文章特定高度硬编码进组件

## 验证步骤

完成后至少验证：

1. 执行 `npm run docs:build`
2. 确认 `docs/.vuepress/dist/playground/...` 下真的生成了示例文件
3. 确认构建后的文章页面仍引用 `/playground/...`
4. 如果页面空白，检查编译产物里是否出现 `<PlaygroundFrame>`，以及运行时是否在 `client.ts` 注册了组件

## 常见故障

- 页面代码里出现了组件标签，但运行时没有注册组件
- manifest 指向了已经不存在的文件
- demo 依赖相邻资源，但只把 HTML 自身加入了白名单
- 文章还在引用已经 404 的外部示例链接
- `docs/.vuepress/public/playground` 被错误纳入版本控制，导致工作区持续脏

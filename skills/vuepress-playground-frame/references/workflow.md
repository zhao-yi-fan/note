# 工作流参考

## 仓库检查清单

把这个 skill 用到某个 VuePress 仓库前，先确认这些基础条件：

- 存在 `docs/.vuepress/config.ts` 或等价的 VuePress 配置入口
- 存在 `docs/.vuepress/client.ts`，或者允许新增
- Markdown 内容主目录在 `docs/`
- 示例源文件位于 `playground/` 或其他固定静态示例目录
- 构建命令由 `package.json` 统一管理

## 一次完整实现通常会改哪些地方

通常会涉及这些文件：

1. `docs/.vuepress/components/PlaygroundFrame.vue`
2. `docs/.vuepress/client.ts`
3. `playground-manifest.json`
4. `scripts/sync-playground.js`
5. `package.json`
6. 当前仍在使用原生 iframe 的 Markdown 文章

## 决策规则

### 什么时候用 `files`

适用于：

- demo 是单个自包含 HTML
- 样式和脚本都写在 HTML 内联里

### 什么时候用 `directories`

适用于：

- demo 依赖同目录下的 css 或 js
- demo 通过相对路径读取图片、JSON 或其他资源
- 多个文件必须保持相邻才能正常运行

### 什么时候保持固定高度

适用于：

- demo 视觉高度基本稳定
- 仓库里没有 `postMessage` 自动改高协议
- 你希望第一版尽量简单，先保证稳定可用

### 什么时候再考虑自动高度

适用于：

- 很多 demo 都出现难看的内部滚动条
- 仓库所有者明确希望更精致的阅读体验
- 可以接受同时修改组件和示例页

## 推荐检查命令

```bash
rg -n "<iframe" docs -S
rg -n "PlaygroundFrame|sync-playground|playground-manifest" . -S
find docs/.vuepress/dist/playground -type f | sort
rg -n "/playground/" docs/.vuepress/dist -S
```

## 迁移失效外链的模式

当旧文章还在指向一个已经失效的外部 URL 时：

1. 先在 `playground/` 下找到对应本地源文件
2. 把它加入 manifest
3. 把文章里的地址改成 `/playground/...`
4. 最好顺手把原生 iframe 一并迁成 `PlaygroundFrame`

## 关于源码按钮

如果组件要提供“查看源码”按钮，而仓库托管在 GitHub，一个稳定的默认规则是：

- `https://github.com/<owner>/<repo>/blob/<branch>/<source-path>`

如果分支名不稳定，或者不适合自动推导，就让组件直接接受原始 `source` URL，不要强行在组件里拼装所有情况。

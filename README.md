# Blog

个人技术博客与学习笔记，基于 VuePress 2 和 vuepress-theme-reco 构建，当前通过 Netlify 从 GitHub 仓库自动构建并发布。

## 技术栈

- VuePress `2.0.0-rc.14`
- vuepress-theme-reco `2.0.0-rc.22`
- Node.js `22`
- Netlify

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm run docs:dev
```

构建静态文件：

```bash
npm run docs:build
```

构建产物会输出到：

```text
docs/.vuepress/dist
```

## 部署

项目使用 Netlify 部署，配置文件是 `netlify.toml`：

```toml
[build]
  command = "npm run docs:build"
  publish = "docs/.vuepress/dist"

[build.environment]
  NODE_VERSION = "22"
```

推送到 `master` 分支后，Netlify 会自动拉取仓库并执行构建。

## 目录说明

```text
docs/                    博客内容
docs/.vuepress/          VuePress 配置、主题配置、样式
docs/.vuepress/config/   导航栏和侧边栏配置
docs/.vuepress/public/   静态资源
```

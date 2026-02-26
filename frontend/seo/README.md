# SEO 搜索引擎优化

## 什么是SEO

SEO（Search Engine Optimization）即搜索引擎优化，通过优化网站结构、内容等因素，提升网站在搜索引擎中的排名，获得更多自然流量。

## 搜索引擎工作原理

1. **爬虫/蜘蛛抓取**：搜索引擎派爬虫程序定期抓取网页内容
2. **建立索引**：将抓取的内容存入搜索引擎的词库/索引库
3. **排名算法**：当用户搜索关键词时，通过排名算法对索引库中的页面进行排序
4. **展示结果**：将排名较高的页面展示给用户

## 站内优化

### Meta标签

```html
<title>网页标题</title>
<meta name="keywords" content="网页关键字">
<meta name="description" content="网页描述">
```

- **title**：页面标题，权重最高的标签，应包含核心关键词
- **keywords**：关键词，现在权重很低，Google已忽略
- **description**：页面描述，虽然不直接影响排名，但影响搜索结果的点击率

### 语义化标签

- H1~H6标签权重递减，H1权重最高，每个页面建议只用一个H1
- 合理使用header、nav、main、article、aside、footer等语义化标签
- img标签添加alt属性，有助于搜索引擎理解图片内容

### URL优化

- URL应简短、包含关键词
- 使用静态URL（伪静态）
- 保持URL结构层级清晰

### 内部链接

- 合理的内部链接结构有助于爬虫抓取
- 重要页面离首页点击距离越近越好

## 站外优化

### 外链建设

- 获取高质量外部链接（权威网站、相关行业网站）
- 避免低质量、垃圾外链
- 自然增长的外链比购买的外链更有价值

### 社交媒体

- 虽然社交媒体链接通常带nofollow，但能带来曝光和流量
- 品牌搜索量也是排名因素之一

## 前后端分离与SEO

### 问题

传统前后端分离项目（CSR）使用JS动态渲染内容，爬虫可能无法获取完整内容。

### 解决方案

1. **SSR（服务端渲染）**：Nuxt.js、Next.js
2. **预渲染（Prerendering）**：构建时生成静态HTML
3. **SSR框架**：如Remix、Angular Universal

> 注意：Google爬虫已能执行JavaScript，但百度爬虫能力有限

## 技术SEO

### 网站性能

- 页面加载速度是排名因素
- 移动端适配（响应式设计）
- Core Web Vitals：LCP、FID、CLS

### 结构化数据

使用JSON-LD格式添加结构化数据，帮助搜索引擎理解页面内容：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "文章标题",
  "author": {
    "@type": "Person",
    "name": "作者名"
  }
}
</script>
```

### 其他标签

```html
<!-- 移动端视口 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 禁止爬虫抓取（可选） -->
<meta name="robots" content="index,follow">

<!--  canonical标签，指定规范URL -->
<link rel="canonical" href="https://example.com/page">

<!--  移动端主题色（安卓浏览器） -->
<meta name="theme-color" content="#ffffff">
```

## SEM 搜索引擎营销

SEM（Search Engine Marketing）包括SEO和付费推广。

> 百度竞价推广水深，谨慎选择

## 现代搜索趋势

- **垂直搜索**：小红书、抖音、微信搜一搜
- **AI搜索**：ChatGPT、Perplexity等AI工具
- **语音搜索**：越来越多人使用语音助手搜索

根据目标用户群体选择合适的搜索平台进行优化。

## 参考资源

- [Google 搜索中心](https://developers.google.com/search/docs)
- [百度搜索资源平台](https://ziyuan.baidu.com/)

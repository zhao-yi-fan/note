# 商品排序练习

入口为 `index.html`，页面加载 `json/product.json` 中的商品数据，支持按上架时间、价格、热度排序。

## 当前实现

- 同一排序字段重复点击切换升序和降序。
- 切换到新的字段时，从升序开始。
- 排序时使用 `DocumentFragment` 批量移动节点。
- `js/backups` 保存原来的阶段性实现，`js/demos` 保存性能学习示例。

## 目录说明

- `css/less`：保留的 LESS 样式源码。
- `思路.md`：原始实现思路。
- `js/backups`：排序功能的历史版本。
- `js/demos`：DOM 数据绑定和性能相关示例。

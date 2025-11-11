---
title: rem的原理
date: 2025/07/15
tags:
  - 移动端
  - rem
  - 响应式布局
categories:
  - 移动端开发
---

# rem的原理

## rem是什么

rem（root em）是CSS3新增的相对长度单位，相对于根元素（HTML标签）的字体大小（font-size）来计算。

**核心特点：**
- 1rem = HTML根元素的font-size值
- 所有使用rem单位的元素都会随根元素字体大小的变化而等比缩放
- 区别于em（相对于父元素字体大小）

## 实现原理

### 基本原理

rem响应式布局的核心思想是：**动态计算根元素的font-size，使所有以rem为单位的元素实现等比缩放**。

```javascript
// 基础公式
当前设备HTML的font-size = (当前设备宽度 / 设计稿宽度) * 基准font-size
```

### 实现步骤

**1. 设置基准换算比例**

通常设置 `html { font-size: 100px; }` 作为基准，方便计算：
- 设计稿测量值 / 100 = rem值
- 例如：设计稿中300px → CSS中写3rem

**2. 动态计算根元素字体大小**

```javascript
function setRem() {
  // 设计稿宽度（常见750px或640px）
  const designWidth = 750;
  // 基准font-size
  const baseFontSize = 100;
  
  // 获取当前设备宽度
  const clientWidth = document.documentElement.clientWidth || window.innerWidth;
  
  // 限制最大宽度（防止PC端显示过大）
  const maxWidth = 750;
  const targetWidth = clientWidth > maxWidth ? maxWidth : clientWidth;
  
  // 计算当前设备的font-size
  const currentFontSize = (targetWidth / designWidth) * baseFontSize;
  
  // 设置根元素字体大小
  document.documentElement.style.fontSize = currentFontSize + 'px';
}

// 初始化
setRem();

// 监听窗口变化
window.addEventListener('resize', setRem);
window.addEventListener('orientationchange', setRem);
```

**3. 使用rem单位编写样式**

```css
/* 设计稿宽度750px，基准100px */
html {
  font-size: 100px; /* 1rem = 100px (设计稿) */
}

.box {
  width: 3rem;        /* 设计稿300px */
  height: 2rem;       /* 设计稿200px */
  padding: 0.2rem;    /* 设计稿20px */
  font-size: 0.28rem; /* 设计稿28px */
}
```

### 计算案例

假设设计稿宽度750px，基准100px：

| 设备宽度 | 计算公式 | HTML的font-size | 1rem实际值 |
|---------|---------|----------------|-----------|
| 375px   | (375/750)*100 | 50px | 50px |
| 414px   | (414/750)*100 | 55.2px | 55.2px |
| 750px   | (750/750)*100 | 100px | 100px |

## 现有的库和工具

### 1. lib-flexible (淘宝方案)

**最流行的移动端适配方案**

```bash
npm install lib-flexible --save
```

```javascript
// main.js
import 'lib-flexible'
```

**特点：**
- 自动设置根元素font-size和viewport的scale
- 将屏幕分为10等份，1rem = 屏幕宽度/10
- 同时支持动态修改dpr（设备像素比）

### 2. postcss-pxtorem

**自动将px转换为rem**

```bash
npm install postcss-pxtorem --save-dev
```

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75,           // 设计稿宽度/10（配合lib-flexible）
      propList: ['*'],         // 需要转换的属性
      selectorBlackList: [],   // 不转换的选择器
      minPixelValue: 2         // 小于2px不转换
    }
  }
}
```

### 3. postcss-px-to-viewport

**将px转换为vw/vh视口单位**

```bash
npm install postcss-px-to-viewport --save-dev
```

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 750,      // 设计稿宽度
      viewportHeight: 1334,    // 设计稿高度
      unitPrecision: 5,        // 转换精度
      viewportUnit: 'vw',      // 使用的单位
      minPixelValue: 1,        // 最小转换值
      mediaQuery: false        // 是否转换媒体查询中的px
    }
  }
}
```

### 4. amfe-flexible

**lib-flexible的升级版**

```bash
npm install amfe-flexible --save
```

```javascript
// main.js
import 'amfe-flexible'
```

**改进：**
- 更好的dpr处理
- 支持viewport单位
- 更完善的兼容性

### 5. vw + rem 混合方案

**使用vw设置根元素字体大小**

```css
/* 设计稿750px，分成100份 */
html {
  font-size: 13.333333vw; /* 100/750 = 0.133333 */
}

/* 限制最大最小字体 */
@media screen and (min-width: 750px) {
  html {
    font-size: 100px;
  }
}

@media screen and (max-width: 320px) {
  html {
    font-size: 42.667px; /* (320/750)*100 */
  }
}
```

## 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|-----|------|------|---------|
| **手动rem** | 完全可控 | 需手动计算 | 小型项目 |
| **lib-flexible** | 成熟稳定，兼容性好 | 需配合构建工具 | 大多数移动端项目 |
| **postcss-pxtorem** | 自动转换，开发便捷 | 依赖构建工具 | 配合flexible使用 |
| **vw方案** | 纯CSS，无需JS | 兼容性稍差 | 现代浏览器 |
| **vw+rem混合** | 兼顾灵活性和兼容性 | 配置复杂 | 复杂适配需求 |

## 注意事项

1. **字体大小限制**
   - 浏览器有最小字体限制（通常12px）
   - 基准font-size不要设置太小

2. **第三方UI组件**
   - 某些组件使用固定px单位
   - 需要在配置中添加黑名单

3. **1px边框问题**
   - rem方案下1px会被缩放
   - 需要单独处理hairline边框

4. **性能考虑**
   - resize事件添加防抖
   - 避免频繁计算

```javascript
// 防抖优化
let timer = null;
function setRem() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const clientWidth = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = (clientWidth / 750) * 100 + 'px';
  }, 100);
}
```

## 推荐实践

**现代移动端项目推荐配置：**

```bash
npm install amfe-flexible postcss-pxtorem --save
```

```javascript
// main.js (Vue/React)
import 'amfe-flexible'

// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75,        // 设计稿宽度750，flexible将屏幕分为10份
      propList: ['*'],
      selectorBlackList: ['van-']  // vant组件不转换
    }
  }
}
```

这样配置后，可以直接按设计稿标注的px值编写代码，构建时会自动转换为rem。


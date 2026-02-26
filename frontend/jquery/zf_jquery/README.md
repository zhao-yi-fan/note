# jQuery 基础

## 类库、插件、UI组件、框架的区别

- **类库**：提供一些项目中常用的方法，任何项目都可以引入使用。如 jQuery、Zepto（Zepto是移动端版本，不考虑兼容性）
- **插件**：具备一定业务功能的封装，如轮播图、选项卡、模态框等。swiper、iscroll、jquery-dialog、jquery-datepicker、Echarts 等
- **UI组件**：把结构、CSS、JS全部封装好，直接引入使用即可，如 Bootstrap
- **框架**：具备一定编程思想，要求按框架规范开发。如 React、Vue、Angular、Backbone、Sea.js、Require.js

## jQuery 简介

jQuery 是一个优秀的"类库"，基于原生 JS 封装，提供了很多方法，且兼容所有浏览器。

### jQuery 版本

- **v1**：最常用的版本，常用版本有 1.8.3、1.9.3、1.11.3
- **v2**：为移动端设计，不支持 IE 低版本兼容
- **v3**：Vue/React 崛起后使用人数减少，和 v1 版本差不多

---

# jQuery 选择器

## JQ 选择器

基于各种选择器创建 JQ 实例（JQ 对象）。

- **selector**：选择器类型（字符串、函数或元素对象）
- **context**：获取元素时的上下文，默认 document

## JQ 对象

JQ 对象是一个类数组结构（JQ 实例），包含了获取到的元素。

```javascript
$('.tabBox')
// JQ对象(类数组)
// {
//     0: div.tabBox,
//     length: 1,
//     context: document,
//     selector: '.tabBox',
//     __proto__: jQuery.prototype
// }
```

## JQ 对象与原生 JS 对象

### 获取元素

1. **原生 JS**：基于原生 JS 提供的属性和方法获取
   - 可以使用 JS 内置属性和方法：className、onclick 等

2. **JQ 对象**：基于 JQ 选择器获取
   - 可以调用 JQ 原型上的方法：add、find 等

### 相互转换

**JQ → 原生 JS**：
```javascript
let $tabBox = $('.tabBox');
let tabBox = $tabBox[0];           // 基于索引获取
let tabBox = $tabBox.get(0);       // 使用 get 方法
let tabBox = $tabBox.eq(0);        // eq 返回 JQ 对象，get 返回原生 JS
```

**原生 JS → JQ**：
```javascript
let tabBox = document.querySelector('.tabBox');
let $tabBox = $(tabBox);           // 直接包裹
```

## 选择器参数类型

1. **string**：基于选择器获取元素
2. **元素对象**：把 JS 对象转换为 JQ 对象
3. **函数**：函数会自动执行，在页面 HTML 加载完成后执行

```javascript
$(function () {
    // 页面加载完成后执行
});

// 或者使用完整写法
jQuery(function ($) {
    // $ 就是 jQuery
});
```

## noConflict

转让 JQ 使用 `$` 的权利：

```javascript
jQuery.noConflict();        // 转让 $，之后 $ 不可用
let zz = jQuery.noConflict(true);  // 深度转让，jQuery 也不可用
```

---

# jQuery 常用方法

## 选择器字符串

选择器参数为字符串时支持两种格式：
1. 普通选择器
2. HTML 字符串：拼接 HTML 结构创建 JQ 对象

```javascript
$('<div id="AA"></div>').appendTo(document.body);
```

## each 遍历方法

JQ 中的 each 方法用于遍历数组、对象、类数组等。

### 三种 each

1. **$.each()**：jQuery 私有属性，遍历数组或对象
   ```javascript
   $.each([12, 23, 34], (index, item) => {
       console.log(index, item);
   });

   $.each({ name: 'xxx', age: 25 }, (key, value) => {
       console.log(key, value);
   });
   ```

2. **$(selector).each()**：实例方法，遍历 JQ 集合
   ```javascript
   $('.tabBox li').each(function (index, item) {
       // this === item（原生 JS 对象）
       $(this).click(function () {
           $(this).css({ color: 'red' });
       });
   });
   ```

3. **内置 each**：JQ 的 css、addClass 等方法会自动遍历
   ```javascript
   $('.tabBox li').css({ color: 'green' });
   $('.tabBox li').addClass('aaa');
   ```

## 筛选方法

- **filter**：同级筛选
- **children**：子集筛选
- **find**：后代筛选

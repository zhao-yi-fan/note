# react基础

## react的关系

`react` 和 `react-dom`/`react-vr`/`react-native`的关系

`react`用来处理核心逻辑，diff算法，虚拟dom对象的操作。

`react-dom`是浏览器中处理真实DOM的库，用于消费`react`所处理的结果

`react-natvie`是在ios/安卓中消费`react`所处理的结果


## @welldone-software/why-did-you-render

检测重复渲染的插件


在项目中安装好后，创建`wdyr.ts`

```typescript
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false, // 是否跟踪所有的函数组件
  });
}
```

在`src`目录的`index.ts`最上方引入 `import './wdyr';`

### 使用

所有函数组件全部跟踪  `trackAllPureComponents`为`true`

某个组件中使用

```javascript
// 函数式组件
export const ProjectListScreen = () => <></>
ProjectListScreen.whyDidYouRender = true;

// 类组件
class ProjectListScreen extends React.Component {
  static whyDidYouRender = true;
}
```
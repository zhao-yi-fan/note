---
title: webpack
date: 2020/09/25
tags:
  - 前端
  - 异步编程
  - Webpack
categories:
  - Web开发
---

# webpack

## 打包工具的选择
:::info
Vue React的封装都使用rollup打包，那rollup打包工具和项目开发使用的webpack打包工具的区别是什么？
:::
- Vue  github的package.json
![1563094729353](./media/vue.png)
- react github的package.json
![1563094729353](./media/react.png)

### rollup
- rollup的打包体积小
- rollup推荐开发者去写esm模块，esm模块适合做静态代码分析，做tree shaking减少代码体积，esm是浏览器除了script标签外，拥有的模块化能力。
  - rollup诞生在浏览器支持esm模块之后，esm是未来js的模块发展方向，rollup直接使用esm模式进行开发。
- 高版本浏览器原生支持esm模块，无需额外代码注入，打包后的代码结构清晰。
  - 不用像webpack写iife（自执行函数）

### webpack
- webpack的打包体积大，注入了很多的兼容代码。
  - webpack诞生在commonjs后，esm模块之前。
  - 浏览器当时只支持script标签代码引入，且都是自执行函数，webpack为了在浏览器端也有模块的引用，自己在浏览器端实现了一套commonjs语法__webpack_require__。
  - 后续浏览器支持了esm模块，但是webpack为了兼容之前的npm包，仍然延续了之前iife自执行函数和代码注入。
- webpack不能生成esm模块的包，对静态代码分析及 tree shaking不友好
- 适合做应用项目，对于引入、css、scss、图片、字体文件有更好的解析，用法多样化，生态大而全。

### 两者引用源代码模块的对比

|         | 纯esm              | 纯cjs                                           | 两者混用                                        |
| ------- | ------------------ | ----------------------------------------------- | ----------------------------------------------- |
| webpack | 支持（有代码注入） | 支持（有代码注入）                              | 支持（有代码注入）                              |
| rollup  | 支持（无注入）     | 原生不支持（需增加插件@rollup/plugin-commonjs） | 原生不支持（需增加插件@rollup/plugin-commonjs） |




## 项目中 webpack tree shaking 不生效的原因
:::info
注：先把sourcemap关闭，为了看到的是打包后的源码，而不是看到映射的源代码
:::
![1563094729353](./media/demo1.png)
>代码

```javascript
import { log } from '@xxx/sentry'

console.log(log, 'log====');
```
> `npm run dev` 项目启动后查看 打印内容


![1563094729353](./media/demo2.png)
:::info
结果代码并没有tree shaking，其他没有用到的方法也被打入了包中。
引入esm模块 按照命名导入，正常来说应该会tree shaking，此时却没有tree shaking，这是为什么？
:::

> 打包后的代码


![1563094729353](./media/demo3.png)
### webpack的 tree shaking 只在`production`模式生效
:::info
webpack的tree shaking，默认只在 使用 mode 为 production 的配置项以启用。
:::
> 此时`npm run build` 对打包结果本地启动服务跑项目查看。


![1563094729353](./media/demo4.png)
![1563094729353](./media/demo5.png)
### 批量导入后整体使用tree shaking不生效
如果使用了`* as sentry` 别名批量导入的写法时，由于是批量引入，也不会进行tree shaking。
如果`HxSentry.log()` 单独使用其中的一个方法是会进行tree shaking的。
> 代码


```javascript
import * as sentry from '@xxx/sentry'

console.log(sentry, 'sentry====');
```
> 打印结果

![1563094729353](./media/demo6.png)
> 打包后的代码

![1563094729353](./media/demo7.png)
### 批量导入后单独使用tree shaking生效

> 代码

```javascript
import * as sentry from '@xxx/sentry'

console.log(sentry.log, 'log====');
```
> 打印结果


![1563094729353](./media/demo8.png)
> 打包后的代码


![1563094729353](./media/demo9.png)













## webpack

webpack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。

![1563094729353](./media/1563094729353.png)

可以做的事情

> 代码转换、文件优化、代码分割、模块合并、自动刷新、代码校验、自动发布

## webpack基础配置

### webpack安装

- 安装本地webpack

> `webpack webpack-cli -D`

### webpack可以进行0配置

- 打包工具 -> 输出后的结果(js模块)
- 打包(支持我们的js的模块化)

如果当前目录下有node.exe执行程序，会用这个执行程序执行webpack\bin目录下的webpack.js文件

![1563095445080](./media/1563095445080.png)

![1563095577931](./media/1563095577931.png)

在开发时会用到`require()`来引入文件，但是如果放到浏览器时不支持node这种规范的，这样的js文件是不可以直接用于浏览器。打包之后是可以的，把语法全部转化为es5了，手动创建一个html文件，引入刚打包好的main.js文件就可以使用了

![1563096114045](./media/1563096114045.png)

### 手动配置webpack

- 默认配置文件的名字是webpack.config.js

```javascript
// webpack 是node写出来的 node的写法
let path = require('path');

module.exports = {
  mode: 'development', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'),// 路径必须是一个绝对路径，加__dirname是以当前目录下加一个dist目录
  }
}
```

`config.webpack.js`文件名是默认的，webpack会默认调用webpack-cli中bin下的yargs.js文件执行。`config.webpack.js`名字也是可以更改的。

![1563097791464](./media/1563097791464.png)

![1563097743345](./media/1563097743345.png)

## webpack打包出的文件解析

- 打包好之后的js文件

```javascript
(function (modules) { // webpackBootstrap
  // The module cache 先定义一个缓存
  var installedModules = {};
  // "./src/index.js" : {}
  // The require function 配置了 实现了require方法  因为require是不能在浏览器中运行的
  function __webpack_require__ (moduleId) { // "./src/index.js"
    // Check if module is in cache 检查这个模块是否在缓存中
    if (installedModules[moduleId]) { // 不在缓存中
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false, // 是否加载完成
      exports: {}
    };
    // Execute the module function 第一个参数this指向，然后是module模块， module.exports空对象
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
    module.l = true;
    // Return the exports of the module
    return module.exports;
  }

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js"); // 入口模块
})
  ({
    "./src/a.js": // key => 模块的路径
      (function (module, exports) { // value 函数
        eval("module.exports = 'zfpx'\n\n//# sourceURL=webpack:///./src/a.js?");
      }),
    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        eval("let str = __webpack_require__( \"./src/a.js\")\r\nconsole.log(str)\n\n//# sourceURL=webpack:///./src/index.js?");
      })
  });
```

- 需要自定义webpack.config.js名字

  - 直接在终端 `npx webpack --config [filename]`

  - 知道自己配置的文件名字直接在package.json文件中写
    `webpack --config [filename]`
    在终端需要

    `npm run build`

    ![1551320877018](./media/1551320877018.png)

    ![1551321001990](./media/1551321001990.png)

  - 如果不知道自己起的文件名字, 临时需要打包配置输入文件名

    在package.json文件中这样写

    `webpack`

    在终端需要在`--config`前面再加`--`，表示后面写的是字符串

    `npm run build -- --config [filename]`

    

    ![1551320974203](./media/1551320974203.png)

    ![1551321055652](./media/1551321055652.png)

## html插件 (HtmlWebpackPlugin)

每次打包完需要在手动打包后的文件夹中点击index.html在浏览器中打开，地址是`file:\\`，我们需要地址是`localhost:`，官方有`webpack-dev-server`，开发时直接打包进内存中，浏览器输入直接可以打开

webpack中有内置的express做的开发服务插件`webpack-dev-server`

安装

`npm i webpack-dev-server -D`

使用：并不会真的打包，会把打包好的存到内存中

命令行中：`npx webpack-dev-server`

package.json中：`npm run dev`

```json
{
  "name": "webpack-dev-1",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server" // npm run dev
  },
  "devDependencies": {
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.35.3",
    "webpack-cli": "^3.3.5",
    "webpack-dev-server": "^3.7.2"
  }
}
```

webpack.config.js中配置

```javascript
let path = require('path');

module.exports = {
  devServer: { // 开发服务器的配置
    port: 3000, //改端口号
    progress: true, // 加进度条
    contentBase: './build', // 在哪个文件夹下起服务
    open: true, // 自动打开浏览器
    compress: true, // gzip压缩
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  }
}
```

在打包的build文件夹中新建了index.html，引入指定的build.js，每次使用`webpack-dev-server`打包进内存，都是可以指定引入新的打包的build.js文件。但是，如果没有index.html呢，或许连build文件夹都没有。

**html-webpack-plugin**插件提供了打包后自动生成指定的自定义html模板并引入新打包的js文件，此时依然会产生两个文件，只是看不到

```javascript
// webpack.config.js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin

module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build',
    open: true,
    compress: true,
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins:[ // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以哪个html作为模板
      filename: 'index.html', // 设置打包后生成的html模板，不设置默认也是index.html
    })
  ]
}
```

配置各种参数：

```javascript
// webpack.config.js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build',
    open: true,
    compress: true,
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名 [hash]加入哈希，产生不同的文件，防止覆盖和出现缓存的问题 [hash:8]只显示8位
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: { // 简化html
        removeAttributeQuotes: true, // 删除属性的双引号
        collapseWhitespace: true, // 折叠空行
      },
      hash: true, // 引用文件加哈希戳 防止缓存的问题
    })
  ]
}
```

打包后文件的变化

![1563113688298](./media/1563113688298.png)

打包后模板引擎的变化

![1563113728014](./media/1563113728014.png)

## css-loader 和 style-loader 的使用

在index.html模板中是不允许引入css文件的，因为模板打包完会原封不动的到打包文件夹中，如果引入了css文件，此时会找不到打包文件夹外面的css文件，所以需要把css文件引入js文件中，一起打包，此时就需要css-loader，如果直接打包，js文件中是不会处理引入的 css文件的。

![1563192809497](./media/1563192809497.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <!-- 模板 -->
  <link rel="stylesheet" href="./index.css">不允许
</body>
</html>
```

打包提示需要引入loader

![1563192873373](./media/1563192873373.png)

- css-loader是解析css文件里专属的语法，比如@import

```css
/* a.css */
body {
  color: yellow;
}
/* index.css */
@import './a.css';
body {
  background: red;
}
```

- style-loader是把打包好的css文件插入到模板引擎中的

```javascript
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build',
    open: true,
    compress: true,
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      hash: true,
    })
  ],
  module: { // 模块
    rules: [ // 规则 css-loader  解析 @import这种语法的
      // style-loader 它是把css 插入到head的标签中
      // loader的特点 希望功能单一
      // loader的用法 一个loader就用字符串
      // { test: /\.css$/, use: 'css-loader' }
      // 多个loader需要用 []
      // loader的顺序 默认是从右向左执行  从下到上执行
      // 先使用css-loader打包好之后再使用style-loader插入模板
      // { test: /\.css$/, use: ['style-loader','css-loader'] }
      // loader还可以写成 对象方式，好处是可以再写一个参数
      {
        test: /\.css$/, use: [
          {
            loader: 'style-loader',
            options: {
            }
          },
          'css-loader']
      }
    ]
  }
}
```

- 我们自己在html模板head中写的样式优先级不是最高，可以配置style-loader的属性

![1563194277543](./media/1563194277543.png)

```javascript
{
    test: /\.css$/, use: [
        {
            loader: 'style-loader', // 插入模板head标签的位置
            options: {
                insertAt: 'top' // 插入head标签顶部
            }
        },
        'css-loader']
}
```

![1563195134306](./media/1563195134306.png)

- 配置less

安装`yarn add less less-loader -D`

`less-loader`需要用`less`来进行转化

```javascript
/*index.less*/
body {
  div {
    border: 1px solid #dadade;
  }
}
/*index.js*/
let str = require('./a.js')
console.log(str)
require('./index.css')
require('./index.less')
/*webpack.config.js*/
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'css-loader'
        ]
      },
      {  // 可以处理less文件
        test: /\.less$/,
        use: [
          { // 把css文件插入到模板中
            loader: 'style-loader',
            options: {
              insertAt: 'top' // 插入模板head标签的位置
            }
          },
          'css-loader', // @import 解析路径
          'less-loader' // 把less 解析成 css
        ]
      }
    ]
  }
```

同样可以配置`sass`需要安装`node-sass`和`sass-loader`，`sass-loader`需要放在下面先执行

`stylus`需要安装`stylus`和`stylus-loader`

## mini-css-extract-plugin 抽离 CSS

抽离模板中的style标签中css样式为link，抽离css插件`mini-css-extract-plugin`

安装`yarn add mini-css-extract-plugin -D`

- 引入同一个'mini-css-extract-plugin'

```javascript
/*webpack.config.js*/
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css' // 抽离出css文件名
    }),
  ],
  module: {
    rules: [
      { // 我们不希望css抽离出来再放到模板的style标签中，要把style-loader去掉
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      { // 引入同一个'mini-css-extract-plugin'会全都抽离成一个文件main.css。
      // 也可以拷贝，引入两个'mini-css-extract-plugin'，分别new两个实例和用这两个的loader。比如一个用来抽离.css文件到main.css，一个用来抽离.less文件到main1.css，虽然是不同的两个css文件，但他们内容是一样的。有可能.less文件less-loader完成之后，和.css文件一起css-loader。
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}

/*main.css*/
body {
  color: yellow;
}
body {
  background: red;
  transform: 45deg
}
body div {
  border: 1px solid #dadade;
}
```

![1563201113774](./media/1563201113774.png)

- 引入两个'mini-css-extract-plugin'，分别new两个实例和用这两个的loader

```javascript
/*webpack.config.js*/
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let MiniCssExtractPlugin1 = require('mini-css-extract-plugin');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new MiniCssExtractPlugin1({
      filename: 'main1.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin1.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
/*main.css*/
body {
  color: yellow;
}
body {
  background: red;
  transform: 45deg
}
body div {
  border: 1px solid #dadade;
}
/*main1.css*/
body {
  color: yellow;
}
body {
  background: red;
  transform: 45deg
}
body div {
  border: 1px solid #dadade;
}
```

- 希望添加的属性自动加前缀

插件包`autoprefixer`和loader`postcss-loader`

安装`yarn add postcss-loader autoprefixer`

需要新建`postcss.config.js`配置文件，这个配置文件里面要用到`autoprefixer`插件

![1563263760659](./media/1563263760659.png)

```javascript
/*webpack.config.js*/
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // 解析css之前就要加前缀
          'postcss-loader',
          
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}

/*postcss.config.js*/
module.exports = {
  plugins: [require('autoprefixer')({
    "browsers": [  // 9.6.0版本之后不能使用"browsers"
      "defaults",
      "not ie < 11",
      "last 2 versions",
      "> 1%",
      "iOS 7",
      "last 3 iOS versions"
    ]
  })
  ]
}
// 更改后
module.exports = {
  plugins: [require('autoprefixer')({
    "overrideBrowserslist": [
      "defaults",
      "not ie < 11",
      "last 2 versions",
      "> 1%",
      "iOS 7",
      "last 3 iOS versions"
    ]
  })
  ]
}
```

打包后的main.css

```css
/*main.css*/
body {
  color: yellow;
}
body {
  background: red;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg)
}
body div {
  border: 1px solid #dadade;
}
```

- 压缩css文件、js文件体积
  在npmjs中`mini-css-extract-plugin`包下推荐用`optimize-css-assets-webpack-plugin`压缩css文件体积，还有配套`terser-webpack-plugin`js文件压缩体积。

```javascript
/* webpack.config.js */
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss =  require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization:{ // 优化项
    minimizer:[
      new TerserJSPlugin({}), // 压缩js文件体积
      new OptimizeCss({}), // 压缩css文件体积
    ]
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // 解析css之前就要加前缀
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

## 转化es6语法 (babel-loader)

在js文件中如果用到了箭头函数，没有引入babel，打包之后没有变成普通函数，仍然是箭头函数。

需要把源文件转化的加载器，转化成另一种文件，就要用到`babel-loader`

转化需要babel的核心模块`@babel/core`，调用transform方法

需要`@babel/preset-env`告诉如何将es6转化es5的转化模块，可以将标准的语法转换成低级的语法

如果有`class A{}`语法，打包提示要安装`@babel/plugin-proposal-class-properties`插件

如果有`@log`语法，打包提示需要安装`@babel/plugin-proposal-class-properties`，去babel官网看，还需要安装`@babel/plugin-proposal-decorators`

```javascript
/* index.js */
let str = require('./a.js')
console.log(str)

require('./index.css')

require('./index.less')

fn = () => {
  console.log('sss')
}

@log // 类的装饰器 装饰类或者属性
class A { // new A() a=1 // es7写法
  a = 1;
}

let a = new A()
console.log(a.a)

function log (target) {
  console.log(target); // 查看被修饰的A类
}
```

```javascript
/* webpack.config.js */
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: 
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCss({}),
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { // options可以写在外面也可以写在里面 用babel-loader 需要把es6->es5
            presets: [ // 映射
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }] // 转化class A{}语法
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

## 处理js语法及校验

### 代码转换 (babel)

如果写了generator语法会报错

```javascript
// generator语法，处理异步
function* gen (params) {
  yield 1;
}
console.log(gen().next())
```

regeneratorRuntime is not defined

`@babel/plugin-transform-runtime`将更高级语法转化低级语法

![1564876556355](./media/1564876556355.png)

在生产环境需要`npm install --save @babel/runtime`

如果写`'aaa'.includes('a')`语法，上面的插件是不支持实例上的方法调用，还需要引入`@babel/runtime-corejs3`**这里没有实现，有问题**

`polyfill`这个选项在v7中通过将其设置为默认值而被删除。

```javascript
/* a.js */
module.exports = 'aaaaa'
require('core-js')
class B {

}

// generator语法，处理异步
function* gen (params) {
  yield 1;
}
console.log(gen().next())

'aaa'.includes('a')
```

```javascript
/* webpack.config.js */
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}),
      new OptimizeCss({}),
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 3, // [].includes这样的实例方法只适用于core-js@3。
                  proposals: true
                }
              ]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // 解析css之前就要加前缀
          'postcss-loader',

        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

### 校验规范 (eslint-loader)

可以到eslint官网自定义eslint配置后下载`eslintrc.json`文件，之后在文件前面加`.`使用

![1564896462662](./media/1564896462662.png)

需要引入`eslint`和`eslint-loader`

```javascript
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}), // 压缩js文件体积
      new OptimizeCss({}),
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  module: {
    rules: [ // loader 默认是从右边向左边执行 从下到上执行
      { // 为了代码解析和代码校验分开，写在两个对象中，也是可以写在一个{}中的，但是需要加enforce: 'pre'配置项；也可以代码校验写在代码解析的下边。
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre' // previous：强制执行顺序.js文件eslint-loader先执行 post：后执行
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              [
                "@babel/plugin-transform-runtime",
                // {
                //   corejs: 3,
                //   proposals: true
                // }
              ]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',

        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

## 全局变量引入问题

### loader的几种类型

`pre`：前面执行的loader

`normal`：普通loader

内联loader

`postloader`：后置loader

### 全局暴露变量 (expose-loader)

引入jquery被webpack打包之后是在闭包中，没有挂到window对象上，别的js文件并不能使用jquery。此时需要引入`expose-loader`。

1. expose-loader暴露到window上

- 不需要在`webpack.config.js`配置的情况

```javascript
// 把jquery使用expose-loader替换成$全局对象
import $ from 'expose-loader?$!jquery'
// expose-loader 暴露 全局的loader 内联的loader
console.log(window.$);
```

- 在`webpack.config.js`配置的情况

```javascript
// 使用
import $ from 'jquery'
console.log(window.$);
```

```javascript
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}),
      new OptimizeCss({}),
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  module: {
    rules: [
      {
        test: require.resolve('jquery'), // 只要引用了jquery就匹配到
        use: 'expose-loader?$'
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre'
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              [
                "@babel/plugin-transform-runtime",
                // {
                //   corejs: 3,
                //   proposals: true
                // }
              ]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',

        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

- ProvidePlugin 给每个模块中都注入$，但是没有在window上

```javascript
let webpack = require('webpack');// webpack.ProvidePlugin
module.exports = {
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}),
      new OptimizeCss({}),
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new webpack.ProvidePlugin({ // 在每个模块中都注入$
      $: 'jquery'
    })
  ],
}
```

```javascript
// 使用
console.log($); // 在每个模块中注入$对象，并没有在window上
```

3. 使用CDN在index.html引入jquery，可以在每一个模块使用window.$或者$

```html
<head>
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
</head>
<body>
    <!-- 模板 -->
    <div>内容区</div>
</body>
```

4. 引入不打包

如果已经把jquery变成每个模块都引入了，单个模块有强迫症，仍然要`import jquery from 'jquery'`，这样会把单独引入的jquery会打包，需要在webpack.config.js配置忽略打包。

```javascript
/* index.js */
import $ from 'jquery';
console.log($);
```

```html
<!-- index.html -->
<head>
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
</head>
<body>
    <!-- 模板 -->
    <div>内容区</div>
</body>
```

```javascript
/* webpack.config.js */
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}), 
      new OptimizeCss({}), 
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  externals: { // 打包时忽略
    jquery: '$'
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre'
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              [
                "@babel/plugin-transform-runtime",
                // {
                //   corejs: 3,
                //   proposals: true
                // }
              ]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',

        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

## 图片处理 (file-loader、url-loader、html-withimg-loader)

1. 在js中创建图片来引入

**如果直接`image.src='./logo.jpg'`打包会直接认为是个字符串**

需要引入`file-loader`，打包默认会在内部生成一张图片 到build目录下，把生成的图片的名字返回来

```javascript
import logo from './logo.jpg' // 打包时会生成一个哈希戳的图片名字到打包文件夹下。把图片引入，返回的结果是一个新的图片地址url
console.log(logo)
let image = new Image();
image.src = logo; // 就是一个普通的图片
document.body.appendChild(image);
```

```javascript
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}),
      new OptimizeCss({}),
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  externals: {
    jquery: '$'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              [
                "@babel/plugin-transform-runtime",
                // {
                //   corejs: 3,
                //   proposals: true
                // }
              ]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',

        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

2. 在css引入 background('url)

```javascript
/* index.js */
import './index.css'
```

```css
div{
  width: 100px;
  height: 100px;
  background: url('./logo.jpg') 
  /* css中直接引入，因为有file-loader了，相当于require("./logo.jpg") */
}
```

3. `<img src="" alt=""/>`在标签中引入图片，需要引入`html-withimg-loader`

```html
<body>
    <!-- 模板 -->
    <div>内容区</div>
    <img src="./logo.jpg" alt="">
</body>
```

```javascript
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}),
      new OptimizeCss({}),
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  externals: {
    jquery: '$'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              [
                "@babel/plugin-transform-runtime",
                // {
                //   corejs: 3,
                //   proposals: true
                // }
              ]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',

        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

- 对打包图片做限制，如果有些图片比较小，我们不希望图片发送http请求，直接用base64第一次就加载出来。我们的图片要小于多少k的时候 用base64 来转化，否则用file-loader产生真实的图片

```javascript
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}),
      new OptimizeCss({}),
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  externals: {
    jquery: '$'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        // 做一个限制 当我们的图片 小于多少k的时候 用base64 来转化
        // 否则用file-loader产生真实的图片
        // use: 'file-loader' // 打包把图片生成一个新图片
        use: {
          loader: 'url-loader', // 转化为base64
          options: {
            limit: 200 * 1024 // 图片小于2M的时候直接转化为base64，不会打包成一个新图片
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              [
                "@babel/plugin-transform-runtime",
                // {
                //   corejs: 3,
                //   proposals: true
                // }
              ]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',

        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```



## 打包文件分类

可以通过配置 `output.publicPath` 和 loader 的 `outputPath` 来对打包文件进行分类管理。

```javascript
module.exports = {
  output: {
    filename: 'js/bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            outputPath: 'img/' // 图片输出到img目录
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.css' // css输出到css目录
    })
  ]
}
```

## 打包多页应用

多页应用需要配置多个入口和多个 `HtmlWebpackPlugin` 实例。

```javascript
module.exports = {
  entry: {
    home: './src/home.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/home.html',
      filename: 'home.html',
      chunks: ['home'] // 只引入home.js
    }),
    new HtmlWebpackPlugin({
      template: './src/other.html',
      filename: 'other.html',
      chunks: ['other'] // 只引入other.js
    })
  ]
}
```

## 配置source-map

`devtool` 用于配置源码映射,方便调试代码。

```javascript
module.exports = {
  mode: 'development',
  devtool: 'source-map', // 会生成.map文件,显示行和列
  // devtool: 'eval-source-map', // 不会生成单独文件,但会显示行和列
  // devtool: 'cheap-module-source-map', // 不会产生列,但是是一个单独的映射文件
  // devtool: 'cheap-module-eval-source-map', // 不会产生文件也不会产生列
}
```

## watch的用法

监听文件变化,自动重新打包。

```javascript
module.exports = {
  watch: true,
  watchOptions: {
    poll: 1000, // 每秒问我1000次
    aggregateTimeout: 500, // 防抖,停止输入500ms后再打包
    ignored: /node_modules/ // 不需要监控的文件
  }
}
```

## webpack小插件应用 (CleanWebpackPlugin、CopyWebpackPlugin、BannerPlugin)

- `CleanWebpackPlugin`: 每次打包前清空输出目录
- `CopyWebpackPlugin`: 拷贝静态文件到输出目录
- `BannerPlugin`: webpack内置插件,给打包文件添加版权注释

```javascript
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'doc', to: './' }
      ]
    }),
    new webpack.BannerPlugin('版权所有 2023')
  ]
}
```

## webpack跨域问题

使用 `devServer.proxy` 配置代理解决开发环境跨域问题。

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'/api': ''}, // 重写路径
        changeOrigin: true // 改变源
      }
    }
  }
}
```

## resolve属性的配置

配置模块如何解析。

```javascript
module.exports = {
  resolve: {
    modules: [path.resolve('node_modules')], // 指定解析模块的目录
    extensions: ['.js', '.jsx', '.json', '.css'], // 自动解析扩展名
    alias: { // 别名
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

## 定义环境变量 (DefinePlugin)

使用 webpack 内置的 `DefinePlugin` 定义全局变量。

```javascript
let webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify('development'),
      FLAG: 'true',
      EXPRESSION: '1+1'
    })
  ]
}
// 使用: console.log(DEV) // 'development'
```

## 区分不同环境

通过不同的配置文件区分开发和生产环境。

```javascript
// webpack.base.js 公共配置
// webpack.dev.js 开发配置
// webpack.prod.js 生产配置

// 使用webpack-merge合并配置
let { merge } = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'development',
  devServer: {}
})
```

## noParse

不解析某个库的依赖,提高构建速度。

```javascript
module.exports = {
  module: {
    noParse: /jquery/, // 不去解析jquery中的依赖关系
    rules: []
  }
}
```

## IgnorePlugin

忽略某些模块,常用于忽略 moment 的语言包。

```javascript
let webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    })
  ]
}
// 手动引入需要的语言包: import 'moment/locale/zh-cn'
```

## dllPlugin

动态链接库,预先打包不常变化的第三方库,提高构建速度。

```javascript
// webpack.dll.js
let webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}
// 在webpack.config.js中引用
new webpack.DllReferencePlugin({
  manifest: path.resolve(__dirname, 'dist', 'manifest.json')
})
```

## happypack

多线程打包,提高构建速度。

```javascript
let Happypack = require('happypack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js'
      }
    ]
  },
  plugins: [
    new Happypack({
      id: 'js',
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }]
    })
  ]
}
```

## webpack自带优化

- `tree-shaking`: 生产模式自动开启,去除未引用代码
- `scope hoisting`: 作用域提升,减少函数声明

```javascript
module.exports = {
  mode: 'production', // 自动开启tree-shaking和scope hoisting
  optimization: {
    usedExports: true // 标记未使用的导出
  }
}
```

## 抽离公共代码 (splitChunks)

使用 `splitChunks` 抽离公共模块。

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { // 第三方模块
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
          priority: 1
        },
        common: { // 公共模块
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  }
}
```

## 懒加载

使用 ES6 的 `import()` 语法实现懒加载。

```javascript
// 点击按钮后才加载source.js
button.addEventListener('click', () => {
  import('./source.js').then(data => {
    console.log(data.default);
  })
})

// 使用vue-router懒加载
const Home = () => import('./views/Home.vue')
```

## 热更新 (HotModuleReplacementPlugin)

启用热模块替换,无需刷新页面即可更新模块。

```javascript
let webpack = require('webpack');

module.exports = {
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

## tapable介绍

`tapable` 是 webpack 的核心库,提供了插件系统的基础。webpack 中的钩子都是基于 tapable 实现的。

主要钩子类型:
- `SyncHook`: 同步钩子
- `SyncBailHook`: 同步熔断钩子
- `AsyncParallelHook`: 异步并行钩子
- `AsyncSeriesHook`: 异步串行钩子

## tapable 基础使用 (SyncHook)

同步钩子的基本使用。

```javascript
let { SyncHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node', name);
    })
    this.hooks.arch.tap('react', (name) => {
      console.log('react', name);
    })
  }
  start() {
    this.hooks.arch.call('jw');
  }
}
```

## AsyncParallelHook

异步并行钩子,注册的事件并行执行。

```javascript
let { AsyncParallelHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name);
        cb();
      }, 1000)
    })
  }
  start() {
    this.hooks.arch.callAsync('jw', () => {
      console.log('end');
    })
  }
}
```

## AsyncSeriesHook

异步串行钩子,注册的事件依次执行。

```javascript
let { AsyncSeriesHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name);
        cb();
      }, 1000)
    })
  }
  start() {
    this.hooks.arch.callAsync('jw', () => {
      console.log('end');
    })
  }
}
```

## AsyncSeriesWaterfallHook

异步串行瀑布钩子,上一个事件的返回值会传递给下一个事件。

```javascript
let { AsyncSeriesWaterfallHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name);
        cb(null, 'result');
      }, 1000)
    })
    this.hooks.arch.tapAsync('react', (data, cb) => {
      console.log('react', data);
      cb();
    })
  }
  start() {
    this.hooks.arch.callAsync('jw', () => {
      console.log('end');
    })
  }
}
```

## webpack手写

手写简易 webpack 的基本流程:
1. 读取入口文件
2. 分析模块依赖
3. 递归处理所有依赖
4. 生成打包后的代码

核心步骤包括: 分析模块、创建依赖关系、AST解析、生成打包结果。

## webpack分析及处理

读取配置文件和入口文件,开始处理。

```javascript
let fs = require('fs');
let path = require('path');

class Compiler {
  constructor(config) {
    this.config = config;
    this.entryId;
    this.modules = {};
    this.entry = config.entry;
    this.root = process.cwd();
  }
  run() {
    // 执行并创建模块的依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true);
    // 发射打包后的文件
    this.emitFile();
  }
}
```

## 创建依赖关系

构建模块并收集依赖。

```javascript
buildModule(modulePath, isEntry) {
  let source = this.getSource(modulePath);
  let moduleName = './' + path.relative(this.root, modulePath);
  
  if (isEntry) {
    this.entryId = moduleName;
  }
  
  let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
  this.modules[moduleName] = sourceCode;
  
  dependencies.forEach(dep => {
    this.buildModule(path.join(this.root, dep), false);
  })
}
```

## AST递归解析

使用 `@babel/parser` 和 `@babel/traverse` 解析源码。

```javascript
let babylon = require('@babel/parser');
let traverse = require('@babel/traverse').default;
let t = require('@babel/types');

parse(source, parentPath) {
  let ast = babylon.parse(source);
  let dependencies = [];
  
  traverse(ast, {
    CallExpression(p) {
      if (p.node.callee.name === 'require') {
        let moduleName = p.node.arguments[0].value;
        dependencies.push(moduleName);
        p.node.arguments = [t.stringLiteral('./' + path.join(parentPath, moduleName))];
      }
    }
  })
  
  let sourceCode = generator(ast).code;
  return { sourceCode, dependencies };
}
```

## 生成打包结果

生成最终的打包文件。

```javascript
emitFile() {
  let main = path.join(this.config.output.path, this.config.output.filename);
  
  let template = `(function(modules) {
    function require(moduleId) {
      function localRequire(relativePath) {
        return require(modules[moduleId][1][relativePath]);
      }
      var module = { exports: {} };
      modules[moduleId][0].call(module.exports, localRequire, module, module.exports);
      return module.exports;
    }
    require('${this.entryId}')
  })({${this.modules}})`;
  
  fs.writeFileSync(main, template);
}
```

## 增加loader

在 webpack 中集成 loader 处理。

```javascript
getSource(modulePath) {
  let content = fs.readFileSync(modulePath, 'utf8');
  let rules = this.config.module.rules;
  
  for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    let { test, use } = rule;
    if (test.test(modulePath)) {
      for (let j = use.length - 1; j >= 0; j--) {
        let loader = require(use[j]);
        content = loader(content);
      }
    }
  }
  return content;
}
```

## 增加plugins

在 webpack 中集成插件系统。

```javascript
constructor(config) {
  this.config = config;
  this.hooks = {
    entryOption: new SyncHook(),
    compile: new SyncHook(),
    afterCompile: new SyncHook(),
    emit: new SyncHook(),
    done: new SyncHook()
  }
  
  let plugins = this.config.plugins;
  if (Array.isArray(plugins)) {
    plugins.forEach(plugin => {
      plugin.apply(this);
    })
  }
}
```

## loader 基础

loader 本质是一个函数,接收源码,返回处理后的源码。

```javascript
// loader本质就是一个函数
function loader(source) {
  // source是源代码
  return source; // 返回处理后的代码
}

module.exports = loader;
```

## loader配置

配置自定义 loader 的路径。

```javascript
module.exports = {
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'my-loader' // 会在loaders目录下查找
      }
    ]
  }
}
```

## babel-loader实现

简易 babel-loader 实现。

```javascript
let babel = require('@babel/core');

function loader(source) {
  let options = this.query; // 获取配置的options
  let { code } = babel.transform(source, {
    ...options,
    sourceMap: true
  })
  return code;
}

module.exports = loader;
```

## banner-loader实现

在文件顶部添加注释的 loader。

```javascript
let loaderUtils = require('loader-utils');
let fs = require('fs');

function loader(source) {
  let options = loaderUtils.getOptions(this);
  let cb = this.async(); // 异步loader
  
  if (options.filename) {
    fs.readFile(options.filename, 'utf8', (err, data) => {
      cb(err, data + source);
    })
  } else {
    cb(null, options.text + source);
  }
}

module.exports = loader;
```

## 实现file-loader和url-loader

处理文件和转 base64 的 loader。

```javascript
// file-loader
let loaderUtils = require('loader-utils');

function loader(source) {
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source });
  this.emitFile(filename, source);
  return `module.exports = "${filename}"`;
}

loader.raw = true; // 处理二进制
module.exports = loader;

// url-loader
function loader(source) {
  let { limit } = loaderUtils.getOptions(this);
  if (limit && limit > source.length) {
    return `module.exports = "data:image/png;base64,${source.toString('base64')}"`;
  } else {
    return require('./file-loader').call(this, source);
  }
}
loader.raw = true;
module.exports = loader;
```

## less-loader和css-loader实现

处理样式的 loader。

```javascript
// less-loader
let less = require('less');

function loader(source) {
  let css = '';
  less.render(source, (err, output) => {
    css = output.css;
  })
  return css;
}

module.exports = loader;

// style-loader
function loader(source) {
  let str = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `;
  return str;
}

module.exports = loader;
```

## css-loader实现

处理 css 中 `@import` 和 `url()` 的 loader。

```javascript
function loader(source) {
  let reg = /url\((.+?)\)/g;
  let pos = 0;
  let arr = ['let list = []'];
  
  while(current = reg.exec(source)) {
    let [matchUrl, g] = current;
    let last = reg.lastIndex - matchUrl.length;
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
    arr.push(`list.push('url(' + require(${g}) + ')')`);
    pos = reg.lastIndex;
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
  arr.push(`module.exports = list.join('')`);
  return arr.join('\n');
}

module.exports = loader;
```

## webpack中的插件

插件是一个类,需要实现 apply 方法。

```javascript
class MyPlugin {
  constructor(options) {
    this.options = options;
  }
  
  apply(compiler) {
    compiler.hooks.emit.tap('MyPlugin', (compilation) => {
      // compilation 包含打包的所有信息
      console.log('emit');
    })
  }
}

module.exports = MyPlugin;
```

## 文件列表插件 (FileListPlugin)

生成打包文件列表的插件。

```javascript
class FileListPlugin {
  constructor(options) {
    this.filename = options.filename || 'filelist.md';
  }
  
  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      let assets = compilation.assets;
      let content = '## 文件列表\n';
      
      Object.keys(assets).forEach(filename => {
        content += `- ${filename}\n`;
      })
      
      assets[this.filename] = {
        source() { return content },
        size() { return content.length }
      }
    })
  }
}

module.exports = FileListPlugin;
```

## 内联webpack插件 (InlineSourcePlugin)

将外链资源内联到 HTML 中的插件。

```javascript
let HtmlWebpackPlugin = require('html-webpack-plugin');

class InlineSourcePlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'InlineSourcePlugin',
        (data, cb) => {
          data.headTags = data.headTags.map(tag => {
            if (tag.tagName === 'script') {
              tag = {
                tagName: 'script',
                innerHTML: compilation.assets[tag.attributes.src].source(),
                closeTag: true
              }
            }
            return tag;
          })
          cb(null, data);
        }
      )
    })
  }
}

module.exports = InlineSourcePlugin;
```

## 打包后自动发布

使用钩子在打包完成后自动发布。

```javascript
class UploadPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('UploadPlugin', (compilation, cb) => {
      // 打包完成后执行
      console.log('开始上传文件...');
      
      // 这里可以使用 scp、ftp 等方式上传文件
      // 例如使用 child_process 执行上传命令
      let { exec } = require('child_process');
      exec('scp -r ./dist/* user@server:/path', (err) => {
        if (err) console.log('上传失败', err);
        else console.log('上传成功');
        cb();
      })
    })
  }
}

module.exports = UploadPlugin;
```

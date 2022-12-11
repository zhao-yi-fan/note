
# npm

全称`node package manager`

## npm 命令行工具

npm 的第二层含义就是一个命令行工具, 只要你安装了 node 就已经安装了 npm

npm也有版本这个概念

可以通过在命令行中输入:

```shell
npm --version
```

升级 npm(自己升级自己)

```shell
npm install --global npm
```

## 常用命令

- `npm init [--yes]`               中括号表示可选项,写的话就去掉中括号只写里面的内容

  - npm init -y 可以跳过向导,快速生成    -y 是 --yes的简写

- `npm install`

  - 一次性把 dependencies 选项中的依赖项全部安装

- `npm install 包名`
  - 只下载
  - npm i 包名

- `npm install --save 包名`             --save在包名的前面后面都可以
  - 下载并且保存依赖项(package.json 文件中的 dependencies 选项)
  - `npm i -S 包名`

- `npm uninstall 包名`
  - 只删除, 如果有依赖项会依然保存
  - `npm un 包名`

- `npm uninstall --save 包名`
  - 删除的同时也会把依赖信息也去除
  - `npm un -S 包名`

- `npm help`

  - 查看使用帮助

- `npm 命令 --help`
  - 查看指定命令的使用帮助
  - 例如忘记了 uninstall 命令的简写了,可以输入`npm uninstall --help`来查看使用帮助

- 在npm中安装固定的版本号package，只需要在其后加 ‘@版本号’

```shell
npm install  --save  esri-loader@1.0.0
```

## 解决npm被墙问题

npm 存储包文件的服务器在国外, 有时候会被墙, 速度很慢

http://npm.taobao.org/ 淘宝的开发团队把 npm 在国内做了一个备份

安装淘宝的 cnpm:

```shell
# 在任意目录执行都可以
# --global 表示安装到全局,而非当前目录
# --global 不能省略, 否则不管用
npm install --global cnpm
```

接下来你安装包的时候把之前的`npm`替换成`cnpm`

例子:

```shell
# 这里还是走国外的 npm 服务器,速度比较慢
npm install jquery

# .使用 cnpm 就会通过淘宝的服务器来下载 jquery
cnpm install jquery
```

如果不想安装`cnpm`又想使用淘宝的的服务器来下载:

```shell
npm install jquery --registry=http://registry.npm.taobao.org
```

但是每一次手动这样加参数很麻烦,所以我们可以把这个选项加入配置文件中:

```shell
npm config set registry http://registry.npm.taobao.org

# 查看 npm 配置信息
npm config list
```

只要经过了上面命令的配置,则你以后所有的`npm install`都会默认通过淘宝的服务器来下载.

# package.json

 我们建议每一个项目都有一个`package.json`文件(包描述文件, 就像产品说明一样).

- `npm init`会出来package.json文件
```shell
c:\Users\99344\Desktop\2018web\study\14.node\day03>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (day03)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to c:\Users\99344\Desktop\2018web\study\14.node\day03\package.json:

{
  "name": "day03",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) yes
```


- `npm i --save jquery` i 和 install都可以,还有加了--save会在package.json文件有记录
- 建议执行 `npm install 包名`的时候都加上`--save`这个选项, 目的是用来保存依赖项信息
- 如果`node_modules`删除了也不用担心,只需要:`npm install`就会自动把`package,.json`中的`dependencies`中所有的依赖项都下载回来

对于目前来讲,最有用的是那个`dependencies`选项, 可以用来帮我们保存第三方包的依赖信息


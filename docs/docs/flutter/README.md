---
title: flutter相关对比
date: 2024/09/25
tags:
  - 其他
categories:
  - 其他
---

# flutter相关对比

## 适合WebApp的一些框架

`Cordova`

`Ionic`

`Dcloud`

`小程序`

`PWA`

- 优势：

1. 可以将app的快捷方式放置到桌面上，全屏运行，与原生app无异
2. 能够在各种网络环境下使用，包括网络差和断网条件下，不会显示undefined
3. 推送消息的能力
4. 其本质是一个网页，没有原生app的各种启动条件，快速响应用户指令

- 缺点

1. 支持率不高：现在ios手机端不支持pwa，IE也暂时不支持
2. Chrome在中国桌面版占有率还是不错的，安卓移动端上的占有率却很低
3. 各大厂商还未明确支持pwa
4. 依赖的GCM服务在国内无法使用
5. 微信小程序的竞争

`Instant App`

- 优势：

1. 相对于小程序来说，谷歌官网要求每个Instant App程序最大不得超过4M的大小，但是小程序没有严格限制。
2. Instant App从用户体验角度来看，要比小程序好很多，体验起来让用户感觉，有种“我并没有安装这个程序，就能体验到和程序同样的丝滑体验”的感觉。

- 缺点：科学上网：具有Google Service框架的手机；完整应用必须提前安装到Google Play上

## 适合移动端App的一些框架

`React Native`

- 特色：


1. Facebook出品的一个移动端开发框架，可以最大限度的接近原生的效果。
2. 能够在javascript和React的基础上获得完全一致的开发体验，构建原生APP
3. 仅需学习一次，编写任何平台。（Learn once, write anywhere）

- 缺点：

1. 初次学习成本很高
2. 必须在不同平台下写两套代码，依赖暴露的接口。

`Weex`

- 特点： 

1. Weex能够完美兼顾性能与动态性，让移动开发者通过简洁的前端语法写出
2. Native级别的性能体验，并支持iOS、安卓、YunOS及Web等多端部署。

- 缺点：

1. 控件太少，基本只能实现最基本的效果。
2. 上手难度大，如果是前端和移动端都比较懂则上手很快。
3. 随着项目变大，编译速度会指数型上升。

`flutter`

- 特点：

1. 免费开源
2. 利用保持状态的热重载（Hot Reload）、全新的响应式框架、丰富的控件以及集成的开发工具这些特点进行快速开发。
3. 通过可组合的控件集合、丰富的动画库以及分层可扩展的架构来实现富有感染力的灵活界面设计。
4. 借助可移植的GPU加速的渲染引擎以及高性能本地ARM代码运行时以达到跨设备跨平台的高质量用户体验。
5. 提高效率：使用一套代码同时开发Android和iOS。
6. 可扩展性很强：Flutter框架本身提供了丰富的Material Design和Cupertino（iOS-flavor）风格的控件，可自由扩展控件不受手机平台控件的限制。

# flutter

## 数据类型

- num：int、double
- String
- List
- Map
- bool
- dart中只有null，没有undefined

```dart
void main() {
    // var定义变量不要求数据类型，泛型
    // var会对数据类型自动识别
    var a = 1;
    a = 10;
    // a = "123";
    print(a);

    // 定义常量：var const final
    // 相同点：一旦定义，不能再赋值。声明和赋值必须同时进行
    // 不同点：final声明之后可以修改，const声明之后不能修改。
    // const要求更加严格，const定义的是编译器的常量，不能是运行结果，final就二者都行
    // final
    final b = {"name": "zf"};
    b["name"] = "zhufeng";
    print(b);
    // const
    const c = {"name": "zf"};
    ;
    c["name"] = "zhufeng";
    print(c);

    // 对象/map/键值对 取值必须用中括号

    final n1 = sum(1,2);
    print(n1);
    // const n2 = sum(1,2);
}

sum(m, n) => m + n;
```

## 变量命令

数字、字符串、下划线、$来组成，不能以数字开头，区分大小写

**下划线开头的话代表私有（慎用）**

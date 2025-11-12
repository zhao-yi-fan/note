---
title: 瀑布流
date: 2021/03/15
tags:
  - 其他
  - 异步编程
categories:
  - 其他
---

# 瀑布流
## 原理分析和数据获取

瀑布流：

- 效果：多列的不规则排列，每一列中有很多内容，每一项内容的高度不定，最后我们按照规则排列，三列之间不能相差太多高度
- 实现：首先获取需要展示的数据（假设有50条，共三列），把50条数据中的前三条依次插入到三列中（目前有的列高有的列低），接下来在拿出三条数据，但是本次插入不是依次插入，而是需要先把当前三列按照高矮进行排序，哪个最矮，先给哪个插入内容，以此类推，把50条数据都插入即可

`box-shadow: [inset|不写就是outset] h-shadow:水平阴影的位置 v-shadow:垂直阴影的位置 [blur:阴影模糊度] [spread：阴影模糊半径] [color：阴影的颜色];`

```javascript
$(function () {
  // 当html结构加载完成才会执行这里的代码（闭包）
  // 1.获取需要的数据
  // 真实项目中，我们第一页加载完成，当用户下拉到底部，开始获取第二页的内容。服务器端会给我们提供一个API获取数据的地址，并要求客户端把获取的是第几页的内容传递给服务器，服务器依照这个原理把对应不同的数据返回“分页技术”
  let page = 0,
    imgData = null;
  let queryData = () => {
    page++;
    $.ajax({
      url: `./json/data.json?page=${page}`,
      method: 'get',
      async: false, // 同步(真实项目中是异步)
      dataType: 'json', // 把从服务器端获取的JSON字符串转化为对象(jquery内部会帮我们转换)
      success: result => {
        imgData = result;
      },
    });
  };
  queryData();
  console.log(imgData);

  // 2.数据绑定
  let $boxList = $('.flowBox > li'),
    boxList = [].slice.call($boxList);
  // console.log($boxList.get()); // 把jq类数组对象转换为数组（get不能传参，传参数就是获取类数组中的某一项）
  let queryHTML = ({ id, pic, title, link } = {}) => {
    return `<a href="${link}">
    <div><img src="${pic}" alt=""></div>
    <span>${title}</span>
  </a>`;
  }
  for (let i = 0; i < imgData.length; i += 3) {
    // 分别获取每三个为一组，一组中的三个内容（存在的隐性风险：当前数据总长度不是3的倍数，那么最后一次训话你的时候，三个中的某一个会不存在，获取的item值是undefined）
    let item1 = imgData[i],
      item2 = imgData[i + 1],
      item3 = imgData[i + 2];
    // 我们接下来要把获取的item依次插入到每一个li中，但是绝对不是按照顺序插入，我们需要先按照每一个li的现有高度给li进行排序（小->大），按照最新的顺序依次插入即可
    boxList.sort((a, b) => a.offsetHeight - b.offsetHeight)
    if (item1) {
      boxList[0].innerHTML += queryHTML(item1);
    }
    if (item2) {
      boxList[1].innerHTML += queryHTML(item2);
    }
    if (item3) {
      boxList[2].innerHTML += queryHTML(item3);
    }
  }
})
```

## 数据绑定（实现瀑布流效果）

```javascript
$(function () {
  // 1.获取需要的数据
  let page = 0,
    imgData = null;
  let queryData = () => {
    page++;
    $.ajax({
      url: `./json/data.json?page=${page}`,
      method: 'get',
      async: false,
      dataType: 'json',
      success: result => {
        imgData = result;
      },
    });
  };
  queryData();
  console.log(imgData);

  // 2.数据绑定
  let $boxList = $('.flowBox > li'),
    boxList = [].slice.call($boxList);
  let queryHTML = ({ id, pic, title, link } = {}) => {
    if(typeof id === 'undefined'){
      return;
    }
    return `
      <a href="${link}">
        <div><img src="${pic}" alt=""></div>
        <span>${title}</span>
      </a>
    `;
  }
  for (let i = 0; i < imgData.length; i += 3) {
    let item1 = imgData[i],
      item2 = imgData[i + 1],
      item3 = imgData[i + 2];
    boxList.sort((a, b) => {
      return a.offsetHeight - b.offsetHeight;
    }).forEach((curLi, index) => {
      // eval('item' + (index + 1))
      curLi.innerHTML += queryHTML(eval(`item${index + 1}`))
    })
  }
})
```

## 数据绑定（基于JQ的方法优化代码）

```javascript
$(function () {
  // 1.获取需要的数据
  let page = 0,
    imgData = null;
  let queryData = () => {
    page++;
    $.ajax({
      url: `./json/data.json?page=${page}`,
      method: 'get',
      async: false,
      dataType: 'json',
      success: result => {
        imgData = result;
      },
    });
  };
  queryData();
  console.log(imgData);

  // 2.数据绑定
  let bindHTML = () => {
    let $boxList = $('.flowBox > li');
    for (let i = 0; i < imgData.length; i += 3) {
      $boxList.sort((a, b) => {
        return $(a).outerHeight() - $(b).outerHeight();
      }).each((index, curLi) => {
        let item = imgData[i + index];
        if (!item) return;
        let { id, link, pic, title } = item;
        $(curLi).append(`
        <a href="${link}">
            <div><img src="${pic}" alt=""></div>
            <span>${title}</span>
        </a>
      `)
      })
    }
  }
  bindHTML();
})
```

## 加载更多数据

```javascript
$(function () {
  // 1.获取需要的数据
  let page = 0,
    imgData = null,
    isRun = false;
  let queryData = () => {
    page++;
    $.ajax({
      url: `./json/data.json?page=${page}`,
      method: 'get',
      async: false,
      dataType: 'json',
      success: result => {
        imgData = result;
      },
    });
  };
  queryData();
  console.log(imgData);

  // 2.数据绑定
  let bindHTML = () => {
    let $boxList = $('.flowBox > li');
    for (let i = 0; i < imgData.length; i += 3) {
      $boxList.sort((a, b) => {
        return $(a).outerHeight() - $(b).outerHeight();
      }).each((index, curLi) => {
        let item = imgData[i + index];
        if (!item) return;
        let { id, link, pic, title } = item;
        $(curLi).append(`
        <a href="${link}">
            <div><img src="${pic}" alt=""></div>
            <span>${title}</span>
        </a>
      `)
      })
    }
    isRun = false; // 当前这一组数据绑定完成后，让isRun=false，代表运行完成了
  }
  bindHTML();
  // 3.当滚动到页面底部的时候，加载下一页的更多数据
  $(window).on('scroll', () => {
    // 页面当前的高度
    let winH = $(window).outerHeight(),
      // 页面真实的高度
      pageH = document.documentElement.scrollHeight || document.body.scrollHeight,
      // 当前页面距离顶部的高度
      scrollTop = $(window).scrollTop();
    //=>卷去的高度 大于 真实高度-一屏幕高度：距离底下还有100PX，我们让其开始加载更多的数据
    if ((scrollTop + 100) >= (pageH - winH)) {
      //隐性问题：认为操作滚动，这个在同一个操作内会被触发N次，也就是同一个时间段，获取数据会被执行N次，此时我们需要做“重复操作限定”
      if (isRun) return;//=>开始进行新一轮处理了
      isRun = true;
      if (page > 5) {
        alert('没有更多数据了！')
        return;
      }
      queryData();
      bindHTML();
    }
  })
})
```

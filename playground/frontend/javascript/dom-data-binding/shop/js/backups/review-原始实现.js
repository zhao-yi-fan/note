// 基于高级单例模式完成业务逻辑开发
//=> 自执行函数形成的私有作用域不销毁("闭包")
// 1. 里面的方法和变量等和外界不冲突(保护)
// 2. 里面创建的值也不会销毁(保存)
let productRender = (function () {
    let productData = null,
        productBox = document.querySelector('.productBox'),
        headerBox = document.querySelector('.headerBox'),
        linkList = headerBox.querySelectorAll('a'),
        productList = null;

    // productList = document.querySelectorAll('li');//=> 基于querySelectorAll获取到的节点集合不存在DOM映射机制(绑定完成后需要重新的获取元素才可以)

    //=> GET-DATA: 基于AJAX从服务器端获取数据
    let getData = function () {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                productData = JSON.parse(xhr.responseText);//=>把从服务器获取的JSON字符串转换为对象, 方便后续操作
            }
        };
        xhr.send(null);
    };
    //=> BIND-HTML: 完成数据绑定(基于ES6模板字符串)
    let bindHTML = function () {
        let str = ``;
        productData.forEach(({ title, price, hot, time, img }, index) => {
            // let {title, price, hot, time, img} = item; 直接放到形参中解构
            //=> ES6模板字符串中出现的${}里面存放的是JS代码(包含需要动态绑定数据的JS变量的值)
            str += `<li data-time="${time}" data-hot="${hot}" data-price="${price}">
                        <a href="#">
                            <img src="${img}" alt="">
                            <p title="${title}">${title}</p>
                            <span>￥${price}</span>
                            <span>时间: ${time}</span>
                            <span>热度: ${hot}</span>
                        </a>
                    </li>`
        });
        productBox.innerHTML = str;
        productList = document.querySelectorAll('li');
    };

    //=> BIND-CLICK: 给三个排序标签绑定点击事件
    let bindClick = function () {
        [].forEach.call(linkList, (curlink, index) => {
            //=> 循环三次, 执行三次这个方法, 每一次执行都会形成一个闭包, 每一个闭包中保存了当前这个A对应的索引indes
            curlink.flag = -1;
            curlink.onclick = function () {
                //1. 给productList进行排序(依据点击列的不同进行排序)

                //=> 点击的时候需要获取每一个li的价格/热度等信息, 此时我们可以在绑定的时候, 把这些信息存储到自定义属性上, 点击的时候根据自定义属性获取即可

                curlink.flag *= -1;

                //A: 根据点击li的索引,索引是谁按照谁排序
                let ary = ['data-time', 'data-price', 'data-hot'];
                productList = [].slice.call(productList);
                productList.sort((a, b) => {
                    let aInn = a.getAttribute(ary[index]);
                    let bInn = b.getAttribute(ary[index]);
                    if (index === 0) {//=> 对于日期来说, 需要去除字符串之间的'-',才能实现数学相减
                        aInn = aInn.replace(/-/g, '');
                        bInn = bInn.replace(/-/g, '');
                    }
                    return (aInn - bInn) * this.flag;
                });


                //2. 按照最新顺序依次添加到容器中
                productList.forEach(curList => {
                    productBox.appendChild(curList);
                });
            }
        });


    };

    return {
        init: function () {
            // init是当前模块的入口, 想要实现完整的业务逻辑, 我们执行init即可, 在init中, 我们根据具体的业务需求, 规划哪些方法先, 哪些方法后执行, init相当于当前模块的指挥官.("命令设计模式")
            getData();
            bindHTML();
            bindClick();
        }
    }
})();
productRender.init();




/*
forEach: 数组中的方法, 用来遍历数组中每一项内容的
 */
/* let ary = [12, 23, 34];
ary.forEach((item, index) => {
    // item: 当前遍历数组中这一项的值
    // index: 当前遍历这一项的索引
    // 数组中有多少项, 我们这个函数就被执行多少次, 保证数组中的每一项都可以得到遍历

    console.log(item, index);
    //=> 12 0
    //   23 1
    //   34 2

}) */





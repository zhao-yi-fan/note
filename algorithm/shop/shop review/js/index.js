let productRender = (function () {
    let productData = null,
        productBox = document.querySelector('.productBox'),
        headerBox = document.querySelector('.headerBox'),
        linkList = headerBox.querySelectorAll('a'),
        productList = null;

    //=> GET-DATA: 基于AJAX从服务器端获取数据
    let getData = function () {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                productData = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };

    //=> BIND-HTML: 完成数据绑定(基于ES6模板字符串)
    let bindHTML = function () {
        let str = ``;
        productData.forEach(({ title, price, hot, time, img }, index) => {
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
            curlink.flag = -1;
            curlink.onclick = function () {
                curlink.flag *= -1;
                let ary = ['data-time', 'data-price', 'data-hot'];
                productList = [].slice.call(productList);
                productList.sort((a, b) => {
                    let aInn = a.getAttribute(ary[index]);
                    let bInn = b.getAttribute(ary[index]);
                    if (index === 0) {
                        aInn = aInn.replace(/-/g, '');
                        bInn = bInn.replace(/-/g, '');
                    }
                    return (aInn - bInn) * this.flag;
                });

                //=> 基于文档碎片减少DOM回流
                let frg = new document.createDocumentFragment();
                productList.forEach(curList => {
                    frg.appendChild(curList);
                });
                productBox.appendChild(frg);
                frg = null;
            }
        });
    };

    return {
        init: function () {
            getData();
            bindHTML();
            bindClick();
        }
    }
})();
productRender.init();
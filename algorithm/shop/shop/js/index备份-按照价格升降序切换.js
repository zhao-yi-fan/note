let listBox = document.getElementById('list'),
    headerBox = document.getElementById('header'),
    linkList = headerBox.getElementsByTagName('a'),
    productList = listBox.getElementsByTagName('li');

~function () {
    //=> ajax
    let productData = null,
        xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/product.json', false);
    xhr.onreadystatechange = () => {
        xhr.readyState === 4 && xhr.status === 200 ? productData = xhr.responseText : null;

        // format data (格式化数据)
        productData ? productData = JSON.parse(productData) : null;
    };
    xhr.send(null);

    //=> BIND DATA
    let str = ``;
    for (let i = 0; i < productData.length; i++) {
        let {
            title,
            img,
            price,
            hot,
            time
        } = productData[i];

        str += `
        <li data-price="${price}"
            data-hot= "${hot}"
            data-time = "${time}">
        <a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>￥${price}</span>
        </a></li>    
        `;
    }
    listBox.innerHTML = str;
}();


//=> HANDLE CLICK
~function () {

    let sortList = function () {
        //=> this:当前操作的a标签
        let productAry = [].slice.call(productList);

        /* let _this = this;
        productAry.sort(function () {
            //this: window
            _this.flag
        }); */
        productAry.sort((a, b) => {
            //=> this:当前操作的a标签
            let aP = a.getAttribute('data-price'),
                bP = b.getAttribute('data-price');
            return (aP - bP) * this.flag;
        });
        for (let i = 0; i < productAry.length; i++) {
            let curLi = productAry[i];
            listBox.appendChild(curLi);
        }

    }

    linkList[1].flag = -1;
    linkList[1].onclick = function () {
        //=> this: 当前操作的a标签(价格a标签)
        this.flag *= -1;//=> 每次点击可以让flag的值从1~-1来回切换(第一次点击变为1, 第二次点击变为-1...)
        sortList.call(this);//=> 执行sortList, 让方法中的this关键字改为操作的a标签(箭头函数虽然很强大, 但是不可以乱用, 尤其是在需要改变函数中的this情况下, 箭头函数中的this不受管控, 都是默认继承上下文的, 我们用call也改不了)
    };

}();













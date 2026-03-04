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
            <span>￥${price}</span><br/>
            <span>${time}</span><br/>
            <span>${hot}</span>
        </a></li>    
        `;
    }
    listBox.innerHTML = str;
}();


//=> HANDLE CLICK
~function () {

    let sortList = function () {
        let { index: _index, flag: _flag } = this,
            productAry = [].slice.call(productList);
        productAry.sort((a, b) => {
            let ary = ['data-time', 'data-price', 'data-hot'];
            let aInn = a.getAttribute(ary[_index]),
                bInn = b.getAttribute(ary[_index]);
            if (_index === 0) {
                aInn = aInn.replace(/-/g, '');
                bInn = bInn.replace(/-/g, '');
            }
            return (aInn - bInn) * _flag;
        });
        for (let i = 0; i < productAry.length; i++) {
            let curLi = productAry[i];
            listBox.appendChild(curLi);
        }

    }

    for (let i = 0; i < linkList.length; i++) {
        let curLink = linkList[i];
        curLink.index = i;
        curLink.flag = -1;
        curLink.onclick = function () {
            for (let j = 0; j < linkList.length; j++) {
                let item = linkList[j];
                if (item !== this) {
                    item.flag = -1;
                }
            }
            this.flag *= -1;
            sortList.call(this);
        };
    }


}();













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
        //=>this: 点击的a标签
        let productAry = [].slice.call(productList);
        productAry.sort((a, b) => {
            let aInn,
                bInn;
            switch (this.index) {
                case 0:
                    aInn = a.getAttribute('data-time').replace(/-/g, '');
                    bInn = b.getAttribute('data-time').replace(/-/g, '');
                    break;
                case 1:
                    aInn = a.getAttribute('data-price');
                    bInn = b.getAttribute('data-price');
                    break;
                case 2:
                    aInn = a.getAttribute('data-hot');
                    bInn = b.getAttribute('data-hot');
                    break;
                
            }
            return (aInn - bInn) * this.flag;
        });
        for (let i = 0; i < productAry.length; i++) {
            let curLi = productAry[i];
            listBox.appendChild(curLi);
        }

    }
    
    //=> 给每一个link都绑定点击切换
    for(let i =0;i<linkList.length;i++){
        let curLink = linkList[i];
        curLink.index = i;//=> 设置自定义属性存储a的索引
        curLink.flag = -1;//=> 每一个a标签上都有一个flag属性, 能够在点击的时候实现1~-1之间的切换, 点击都要执行sortList, 同时方法中的this也都改为当前点击的a标签
        curLink.onclick = function () {
            this.flag *= -1;
            sortList.call(this);
        };
    }
    

}();













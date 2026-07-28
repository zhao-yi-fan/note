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

        //=> format data (格式化数据)
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
        //=> 自定义属性名最好叫做"data-xxx"
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

    let sortList = () => {
        //=> 按照价格升序排列
        //1. 基于getElementsBysTagName获取的元素集合是一个类数组, 不能直接使用数组中的sort方法(先把它转换为数组, 然后再排序)
        let productAry = [].slice.call(productList);//=> 用这种借用slice方式操作元素集合或者节点集合, 在IE6~8中不兼容. 但是用这种方式操作arguments, 所有浏览器都兼容.

        //2. 基于sort方法给所有的li按照其价格进行排序
        productAry.sort((a, b) => {
            //=> a: 数组中的当前项
            //=> b: 数组中的下一项

            // return a - b;//数组当前项减去下一项, 如果返回的值大于零, 则a,b交换位置, 否则小于等于零什么都不做

            //=> A是当前li, B是下一个li, 我么应该获取出每个li的价格, 让价格相减从而实现排序(首先数据绑定的时候, 我们可以把后面需要用到的"价格/日期/销量"等细心存储到li的自定义属性上[在解构中显示, 后期只能基于getAttribute这种模式获取到], 后期需要用到这个值的时候, 我们基于自定义属性获取到即可)
            let aP = a.getAttribute('data-price'),
                bP = b.getAttribute('data-price');
            return aP - bP;
        })

        //3. 按照排好序的数组, 我们把li重新增加到页面中
        for (let i = 0; i < productAry.length; i++) {
            let curLi = productAry[i];
            listBox.appendChild(curLi);
        }

    }

    
    linkList[1].onclick = function () {
        sortList();
    };


}();












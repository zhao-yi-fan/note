$.ajax({
    url: 'json/product.json',
    methid: 'GET',
    dataType: 'json',// dataType数据类型 text是字符串类型
    async: false,// 是否异步
    success: function (result) {
        console.log(result);
        
    }
})


//=> 常用的筛选方法
// filter: 同级筛选
// children: 子集筛选
// find: 后代筛选
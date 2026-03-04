$.ajax({
  url: "json/product.json",
  methid: "GET",
  dataType: "json", // dataType数据类型 text是字符串类型
  async: false, // 是否异步
  success: function (result) {
    console.log(result);
  },
});

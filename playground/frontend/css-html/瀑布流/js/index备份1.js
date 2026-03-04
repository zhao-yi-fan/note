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
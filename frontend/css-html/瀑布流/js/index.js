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
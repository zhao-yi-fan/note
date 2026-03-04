//=> 当HTML结构都加载完成执行函数
jQuery(function ($) {
    let $tabBox = $('.tabBox'),
        $tabList = $tabBox.find('ul>li');

    // let $tabList = $('.tabBox>.header>li'),
    //     $divList = $('.tabBox>div');

    //=> 基于JQ内置each机制, 给每个li都绑定了点击事件
    $tabList.on('click', function () {
        let index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active')
            .parent().nextAll()
            .eq(index).addClass('active')
            .siblings('div').removeClass('active');
    })
})

/* jQuery(function ($) {
    $('.tabBox>ul>li').on('click', function () {
        let index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active')
            .parent().nextAll()
            .eq(index).addClass('active')
            .siblings('div').removeClass('active');
    })
})
 */
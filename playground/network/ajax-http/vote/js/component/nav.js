/* 
导航插件: 导入插件后,可以动态向页面中MAN-BOX盒子的起始位置创建一个NAV-BOX,并且完成相关的业务处理
    1.进入到登录页面或者注册页面,都会记录FROM-URL,当登录或者注册成功的时候,跳转回到原有的页面
    2.验证是否已经登录,展示不同的信息
    3.完成其余的业务,例如: 退出,点击用户名进入到详情页面等
 */
//当页面相关资源都加载完成才会执行,页面没加载完不会执行,而且该自执行函数还是异步操作
$(function anonymous() {
    let $mainBox = $('.mainBox');

    //=> 检测是否登录
    axios.get('/checkLogin').then(result => {
        let code = parseFloat(result.code);
        
        $mainBox.prepend(`<nav class="navBox">
        <a href="index.html">首页</a>
        ${code === 0 ? `<a href="javascript:;">登录</a>
        <a href="javascript:;">注册</a>`: `<a href="detail.html"></a>
        <a href="javascript:;">退出</a>`}
        </nav>`);
    })
    
});


// 下面这样写也可以
/* ;(function anonymous($){

})(Zepto); */

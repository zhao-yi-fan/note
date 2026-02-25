/* 
    JQ选择器的selector可以是字符串, 字符串这种格式也有两种
        1. 选择器
        2. HTML字符串拼接的结构: 把拼接好的HTML字符串转换为JQ对象, 然后可以基于appendTo等方法追加到页面中
*/
// $('<div id="AA"></div>').appendTo(document.body);

/* 
    each: JQ中的each方法是用来进行遍历的(类似于数组的forEach)
        [可遍历内容]
            1. 数组
            2. 对象
            3. 类数组(JQ对象)
            ...
        
        [三种each]
            1. 给jQuery设置的私有属性 用法: $.each()
            2. 给实例设置的公有属性 用法: $([selector]).each()
            3. 内置的each
*/


//1. 给jQuery设置的私有属性 遍历数组
/* 
$.each([12, 23, 34], (index, item) => {
//=> 参数的顺序和内置的forEach相反
console.log(index, item);
}) 
*/

// 遍历对象
/* 
$.each({ name: 'xxxx', age: 25, 0: 100 }, (key, value) => {
//=> 原理其实就是FOR-IN循环
console.log(key,value);
}); 
*/

// 2. 给实例设置的公有属性
/* 
$('.tabBox li').each(function (index, item) {
    //=> 非箭头函数(因为箭头函数和上下文有关了): this===item, 当前遍历的这一项(原生js对象)
    //=> $(this)把当前遍历的这一项转换为JQ对象
    $(this).click(function () {
        //=> 给每一个遍历的li都绑定一个点击事件
        //this: 当前点击的li(原生js对象)
        $(this).css({
            color: 'red'
        })
    })
})
 */

// 3. 内置的each
/* 
$('.tabBox li').click(function () {
    //=> 获取的JQ集合中有三个, 我们此处相当于给三个li都绑定了点击事件(JQ在调取click的时候, 会默认的把集合进行EACH遍历, 把每一项都给click了)
});
// css和addClass都是自动each遍历
$('.tabBox li').css({
    color: 'green'
});
$('.tabBox li').addClass('aaa');
 */


// jQuery.noConflict();//=> 转让JQ使用$的权利
// console.log($);//=> undefined
// //还可以使用jQuery
// jQuery();

let zzz = jQuery.noConflict(true);//=> 深度转让: 把jQuery这个名字也让出去, 返回结果赋值给一个变量,  此时这个变量是新的JQ代言人
console.log(jQuery);//=> undefined
console.log(zzz);












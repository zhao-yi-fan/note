// 三：附加思考题（面试题）
// 1、以下代码的功能是要实现为5个input按钮循环绑定click点击事件，绑定完成后点击1、2、3、4、5五个按钮分别会alert输出0、1、2、3、4五个字符。（腾讯）

// 请问如下代码是否能实现？
// 如果不能实现那么现在的效果是什么样的？
// 应该做怎样的修改才能达到我们想要的效果，并说明原理？
{/* <div id="btnBox">
    <input type="button" value="button_1" />
    <input type="button" value="button_2" />
    <input type="button" value="button_3" />
</div>
    <script type="text/javascript">
        var btnBox=document.getElementById('btnBox'),
            inputs=btnBox.getElementsByTagName('input');
        var l=inputs.length;
        for(var i=0; i < l; i++){
            inputs[i].onclick = function () {
                alert(i);
            }
        }
    </script>
*/}



var btnBox=document.getElementById('btnBox'),
    inputs=btnBox.getElementsByTagName('input');

// 闭包
// for(var i=0; i < inputs.length; i++){
//     inputs[i].onclick = (function (i) {
//         return function () {
//             alert(i);
//         }
//     })(i)
// }


// ES6
// Es6和闭包的机制类似, ES6中使用LET创建变量, 会形成块级作用域, 当前案例中, 每一轮循环都会有一个子级的块级作用域, 把后续需要用到的索引i实现存储到自己的作用域中
for (let i = 0; i < inputs.length; i++) {
    inputs[i].onclick = function () {
        alert(i);
    }
}
/*
{
    i = 0;
    inputs[i].onclick = function () {
        alert(i);
    }
}
{
    i = 1;
    inputs[i].onclick = function () {
        alert(i);
    }
}
...
*/
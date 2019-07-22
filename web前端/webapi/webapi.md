## 获取节点

获取当前节点的父级节点`my$("uu").parentNode`

获取当前节点的父级元素`my$("uu").parentElement`

获取当前节点的子级节点`my$("uu").childNodes`

获取当前节点的子级元素`my$("uu").children`

获取当前节点的第一个子级节点`my$("uu").firstChild`

获取当前节点的第一个子级元素`my$("uu").firstElementChild`

获取当前节点的最后一个子级节点`my$("uu").lastChild`

获取当前节点的最后一个子级元素`my$("uu").lastElementChild`

sibling:兄弟 同胞

获取当前节点的前一个兄弟节点`my$("uu").previousSibling`

获取当前节点的前一个兄弟元素`my$("uu").previousElementSibling`

获取当前节点的后一个兄弟节点`my$("uu").nextSibling`

获取当前节点的后一个兄弟元素`my$("uu").nextElementSibling`

## innerText和textContent

设置标签中的文本内容,应该使用textContent属性,谷歌,火狐支持,IE8不支持

设置标签中的文本内容,应该使用innerText属性,谷歌,火狐,IE8都支持

如果这个属性在浏览器中不支持,那么这个属性的类型是undefined

判断这个属性的类型 是不是undefined,就知道浏览器是否支持

## 三大系列:

在style 标签 中设置的样式属性获取不到

style 属性 中设置的样式属性是可以获取到的

获取元素的样式,下面的方式不可用了

console.log(my$("dv1").style.width);

console.log(my$("dv1").style.height);

以后获取元素的宽和高,应该使用offset系列来获取

### offset系列

父级元素没有脱离文档流:

子级元素的`offsetLeft`或者`offsetTop`=父级元素margin+父级元素padding+父级元素border+自己的margin

父级元素脱离文档流:

子级元素的`offsetLeft`或者`OffsetTop`=自己的left和自己的margin

```javascript
offsetLeft/offsetTop:到左边和上边不算自己的边框

offsetWidth:获取元素的宽度(有边框)

offsetHeight:获取元素的高度(有边框)
```

#### offset系列浅析

1.offsetLeft:HTMLElement.offsetLeft(DOM对象的offsetLeft属性来获取left)是一个只读属性,**返回当前元素左上角相对于HTMLElement.offsetParent节点的左边界偏移的像素值.**
2.offsetWidth指当前元素的宽=border+padding+width;(宽含边框)
offsetHeight指当前元素的高=border+padding+height;(高含边框)

下面重点是offsetLeft和offsetTop的理解

##### 1.只有自己一个元素时

```javascript
加了定位(相对定位,绝对定位)后:
offsetLeft=left+(margin-left);
offsetTop=top+(margin-top);
没加定位后:
offsetLeft=margin-left;
offsetTop=margin-top;

不论是否定位:
offsetWidth指当前元素的宽=border+padding+width;(宽含边框)
offsetHeight指当前元素的高=border+padding+height;(高含边框)

```

##### 2.有父元素和子元素时,求子元素的offsetLeft和offsetTop

```javascript
<style>
    *{
        margin:0 ;
        padding: 0 ;
    }
    #bigdv {
        margin-left: 150px;
        margin-top: 50px;
        padding-left: 17px;
        padding-top: 23px;
        width: 300px;
        height: 300px;
        background-color: green;
        border:30px red solid;
        /*position: absolute;*/
    }
    #dv {
        margin-left: 100px;
        margin-top: 100px;
        padding-left: 13px;
        padding-top: 12px;
        width: 100px;
        height: 100px;
        background-color: pink;
        border:10px red solid;
        /*position: absolute;*/
    }
</style>
<body>
	<div id="bigdv">
		<div id="dv"></div>
	</div>
</body>
```

**分四种情况**

(1).当父元素 **没有** 定位,子元素 **没有** 定位时

包含当前dv元素的不是定位元素,那么offsetLeft或offsetTop是dv盒子外边界相对于根元素内边界的距离.(此时根元素就是body,body可能没有内外边界,暂就这么理解)

子元素#dv的:

offsetLeft=bigdv.(margin-left)+bigdv.(border-left)+bigdv.(padding-left)+dv.(margin-left)=150+30+17+100=297;

offsetTop=bigdv.(margin-top)+bigdv.(border-top)+bigdv.(padding-top)+dv.(margin-top)=50+30+23+100=203;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;(有左右border,左padding)

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

(2).当父元素 **有** 定位,子元素 **没有** 定位时

此时dv元素要相对于它的父元素,因为父元素定位了,不再相对于根元素.此时offsetLeft或offsetTop是dv盒子的外边界相对于父元素盒子的border内边界的距离.

子元素#dv的:

offsetLeft=bigdv.(padding-left)+dv.(margin-left)=17+100=117;

offsetTop=bigdv.(padding-top)+dv.(margin-top)=23+100=123;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

(3).当父元素 **有** 定位,子元素 **有** 定位时

父元素相对定位还是绝对定位都不会对子元素的offset类有影响.

下面两种是子元素绝对定位的情况

**第一种情况:子元素dv没有设置left和top值.**

子元素#dv的:

offsetLeft=bigdv.(padding-left)+dv.(margin-left)=17+100=117;

offsetTop=bigdv.(padding-top)+dv.(margin-top)=23+100=123;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

**第二种情况:子元素dv设置了left:10,top:10.**

```javascript
#dv {
    margin-left: 100px;
    margin-top: 100px;
    padding-left: 13px;
    padding-top: 12px;
    width: 100px;
    height: 100px;
    background-color: pink;
    border:10px red solid;
    position: absolute;
    left: 10px;
    top:10px;
}
```

子元素先定位,没有设置left的时候,父元素的padding-left还会有效果,(因为此时的left有一个默认值,默认值不是0,其实默认值就是padding-left的值).如果加了left:10,那么padding-left会失效,因为定位开始了,以left优先.top同理.

子元素#dv的:

offsetLeft=dv.left+dv.(margin-left)=10+100=110;

offsetTop=dv.top+dv.(margin-top)=10+100=110;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

下面两种是子元素相对定位的情况

**第一种情况:子元素dv没有设置left和top值.**

子元素#dv的:

offsetLeft=bigdv.(padding-left)+dv.(margin-left)=17+100=117;

offsetTop=bigdv.(padding-top)+dv.(margin-top)=23+100=123;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

**第二种情况:子元素dv设置了left:10,top:10.**

子元素#dv的:

offsetLeft=bigdv.(padding-left)+dv.left+dv.(margin-left)=17+10+100=127;

offsetTop=bigdv.(padding-top)+dv.top+dv.(margin-top)=23+10+100=133;

offsetWidth=dv.border+dv.padding+dv.width=133;

offsetHeight=dv.border+dv.padding+dv.height=132;

(4).当父元素 **没有** 定位,子元素 **有** 定位时

下面两种是子元素绝对定位的情况

**第一种情况:子元素dv没有设置left和top值.**

子元素#dv的:

offsetLeft=bigdv.(margin-left)+bigdv.(border-left)+bigdv.(padding-left)+dv.(margin-left)=150+30+17+100=297;

offsetTop=bigdv.(margin-top)+bigdv.(border-top)+bigdv.(padding-top)+dv.(margin-top)=50+30+23+100=203;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

**第二种情况:子元素dv设置了left:10,top:10.**

子元素#dv的:

offsetLeft=dv.left+dv.(margin-left)=10+100=110;

offsetTop=dv.top+dv.(margin-top)=10+100=110;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

下面两种是子元素相对定位的情况

**第一种情况:子元素dv没有设置left和top值.**

子元素#dv的:

offsetLeft=bigdv.(margin-left)+bigdv.(border-left)+bigdv.(padding-left)+dv.(margin-left)=150+30+17+100=297;

offsetTop=bigdv.(margin-top)+bigdv.(border-top)+bigdv.(padding-top)+dv.(margin-top)=50+30+23+100=203;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

**第二种情况:子元素dv设置了left:10,top:10.**

子元素#dv的:

offsetLeft=bigdv.(margin-left)+bigdv.(border-left)+bigdv.(padding-left)+dv.left+dv.(margin-left)=150+30+17+10+100=307;

offsetTop=bigdv.(margin-top)+bigdv.(border-top)+bigdv.(padding-top)+dv.top+dv.(margin-top)=50+30+23+10+100=213;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

### scroll系列:卷曲

```javascript
scrollLeft:元素向左卷曲出去的距离
scrollTop:元素向上卷曲出去的距离
scrollWidth:元素中内容的实际的宽度,如果没有内容,或者内容很少,元素的宽度
scrollHeight:元素中内容的实际的高度,如果没有内容,或者内容很少,元素的高度
//时时的获取向上卷曲出去的距离的值

//div的滚动事件
my$("dv").onscroll=function () {
console.log(this.scrollTop);
};

```

#### getScroll兼容代码

body、html、window的关系

window不能用scrollLeft(没有这个属性),用pageYOffset.而且pageYOffset属性是只读的,只能获取,不能设置.
`documentElement`就是html

`documentElement`和`body`有scrollLeft这个属性.

IE6 7 8需要用`documentElement`

谷歌需要用`body`

```javascript
function getScroll(){
    return {
        left:window.pageYOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    }
}
```

### client系列

`clientWidth`:可视区域的宽度,没有边框

`clientHeight`:可视区域的高度,没有边框

`clientLeft`:左边框的宽度

`clientTop`:上边框的宽度

`clientX`:可视区域的横坐标

`clientY`:可视区域的纵坐标




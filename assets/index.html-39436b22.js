import{_ as n,p as s,q as a,Z as e}from"./framework-fdd38eac.js";const p="/assets/1545929449448-297ce19f.png",t={},c=e(`<h1 id="less" tabindex="-1"><a class="header-anchor" href="#less" aria-hidden="true">#</a> less</h1><h2 id="less基础" tabindex="-1"><a class="header-anchor" href="#less基础" aria-hidden="true">#</a> less基础</h2><blockquote><p>它是css预编译语言, 和它类似的还有sass/stylus...</p></blockquote><blockquote><p>css是标记语言, 不是编程语言, 没有类、实例、函数、变量等东西;</p><p>less等预编译语言就是让css具备面向对象编程的思想;</p><p>而浏览器不能直接识别和渲染less代码, 需要我们把less代码预先编译为正常的css后, 再交给浏览器渲染解析;</p></blockquote><h2 id="less的编译" tabindex="-1"><a class="header-anchor" href="#less的编译" aria-hidden="true">#</a> less的编译</h2><h3 id="在开发环境下编译" tabindex="-1"><a class="header-anchor" href="#在开发环境下编译" aria-hidden="true">#</a> 在开发环境下编译</h3><blockquote><p>产品还没有开发完, 正在开发中, 这个是开发环境</p><p>导入less.js即可</p></blockquote><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- rel=&quot;stylesheet/less&quot; 这块有修改, 需要在最后加/less --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet/less<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>css/demo1.less<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 导入js文件即可 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>js/less-2.5.3.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在生产环境下编译" tabindex="-1"><a class="header-anchor" href="#在生产环境下编译" aria-hidden="true">#</a> 在生产环境下编译</h3><blockquote><p>产品开发完成了, 需要部署到服务器上</p><p>项目上线, 不能把less部署, 这样用户每一次打开页面都需要重新的编译, 非常耗性能, 我们部署到服务器上的是编译后的css</p><ol><li><p>在电脑的全局环境下安装less模块 $ npm install less -g 验证是否安装成功: $ lessc -v</p></li><li><p>基于命令把我们的less编译成css</p><p>$ lessc xxx/xxx.less xxx/xxx.min.css -x 把指定目录中的less编译称为css(并且实现了代码的压缩), 把编译后的css存入到具体指定路径中的文件里</p><p>然后调用编译后的css文件</p><link rel="stylesheet" href="css/demo1.min.css"></li></ol></blockquote><p><img src="`+p+`" alt="1545929449448"></p><ul><li>目前基于webpack和框架实现工程化开发的时候, 我们都是在webpack配置文件中, 配置出less的编译(需要安装less/less-loader等模块), 这样不管是开发环境下的预览, 还是部署到生产环境下, 都是基于webpack中的less模块编译的.</li></ul><h2 id="less中最常用的基础语法" tabindex="-1"><a class="header-anchor" href="#less中最常用的基础语法" aria-hidden="true">#</a> less中最常用的基础语法</h2><h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3><blockquote><p>用变量存储一个公共值, 后期需要使用这个值, 直接调取变量即可, 以后如果值需要修改, 只需要更改变量的值, 那么所有用到这个变量的地方都跟着修改了</p></blockquote><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">// 变量</span>
<span class="token variable">@link-color<span class="token punctuation">:</span></span> #222<span class="token punctuation">;</span>
<span class="token comment">// 使用</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token mixin-usage function">.centerPos</span><span class="token punctuation">(</span>200<span class="token punctuation">,</span> 200<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&quot;@{bg-src}/news_1.png&quot;</span><span class="token punctuation">)</span></span> no<span class="token operator">-</span>repeat<span class="token punctuation">;</span>
    <span class="token selector">a</span> <span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@link-color</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.hover</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@link-color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拼接" tabindex="-1"><a class="header-anchor" href="#拼接" aria-hidden="true">#</a> 拼接</h3><blockquote><p>url(&quot;@{bg-src}/news_1.png&quot;)</p><p>用<code>@{变量}</code>来拼接变量</p></blockquote><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">// 代码拼接</span>
<span class="token variable">@bg-src<span class="token punctuation">:</span></span> <span class="token string">&quot;../img&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// 使用</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token mixin-usage function">.centerPos</span><span class="token punctuation">(</span>200<span class="token punctuation">,</span> 200<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&quot;@{bg-src}/news_1.png&quot;</span><span class="token punctuation">)</span></span> no<span class="token operator">-</span>repeat<span class="token punctuation">;</span>

    <span class="token selector">a</span> <span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@link-color</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="嵌套-符号使用" tabindex="-1"><a class="header-anchor" href="#嵌套-符号使用" aria-hidden="true">#</a> 嵌套 &amp;符号使用</h3><blockquote><p>&amp;符号就表示紧贴着</p></blockquote><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">.pub</span> <span class="token punctuation">{</span>
    <span class="token selector">.bg</span> <span class="token punctuation">{</span><span class="token comment">/* .pub .bg 后代选择器*/</span>
        <span class="token selector">a</span> <span class="token punctuation">{</span>
           
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector">&amp; &gt; .bg</span> <span class="token punctuation">{</span><span class="token comment">/* .pub &gt; .bg 子代选择器*/</span>

    <span class="token punctuation">}</span>
    <span class="token selector">&amp;.bg</span> <span class="token punctuation">{</span><span class="token comment">/* .pub.bg 交集选择器*/</span>

    <span class="token punctuation">}</span>
    <span class="token selector">&amp;:hover</span> <span class="token punctuation">{</span><span class="token comment">/* .pub:hover 伪类选择器*/</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="作用域-作用域链-变量提升" tabindex="-1"><a class="header-anchor" href="#作用域-作用域链-变量提升" aria-hidden="true">#</a> 作用域 作用域链 变量提升</h3><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token variable">@H<span class="token punctuation">:</span></span> 200<span class="token punctuation">;</span>
<span class="token selector">.pub</span> <span class="token punctuation">{</span>
    <span class="token variable">@H<span class="token punctuation">:</span></span> 100<span class="token punctuation">;</span>
    <span class="token selector">.bg</span> <span class="token punctuation">{</span>
        <span class="token selector">a</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">unit</span><span class="token punctuation">(</span><span class="token variable">@H</span><span class="token punctuation">,</span> px<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">/* 300 和js一样,有变量提升, 作用域链*/</span>
        <span class="token punctuation">}</span>
        <span class="token variable">@H<span class="token punctuation">:</span></span> 300<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3><ul><li>.centerPos(@w:100, @h:100){}</li></ul><blockquote><p>冒号后面表示不传值的默认值.</p></blockquote><ul><li>unit方法</li></ul><blockquote><p>less提供了内置unit()方法, 用来数值和单位分离</p><p>eg: margin-top: unit(-(@h/2), px);</p></blockquote><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">.transition(<span class="token variable">@property</span>:all,<span class="token variable">@duration</span>: .5s,
<span class="token variable">@timing-function</span>: linear,<span class="token variable">@delay</span>:0s)</span><span class="token punctuation">{</span>
    <span class="token property">-webkit-transition</span><span class="token punctuation">:</span> <span class="token variable">@arguments</span><span class="token punctuation">;</span>
    <span class="token property">transition</span><span class="token punctuation">:</span> <span class="token variable">@arguments</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.centerPos(<span class="token variable">@w</span>:100, <span class="token variable">@h</span>:100)</span><span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> <span class="token function">unit</span><span class="token punctuation">(</span><span class="token function">-</span><span class="token punctuation">(</span><span class="token variable">@h</span><span class="token operator">/</span>2<span class="token punctuation">)</span><span class="token punctuation">,</span> px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> <span class="token function">unit</span><span class="token punctuation">(</span><span class="token function">-</span><span class="token punctuation">(</span><span class="token variable">@w</span><span class="token operator">/</span>2<span class="token punctuation">)</span><span class="token punctuation">,</span> px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 函数的使用</span>
<span class="token selector">.cc</span> <span class="token punctuation">{</span>
    <span class="token mixin-usage function">.transition</span><span class="token punctuation">;</span><span class="token comment">/* 默认值 */</span>
    .<span class="token function">transition</span><span class="token punctuation">(</span><span class="token variable">@duration<span class="token punctuation">:</span></span> 1s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token mixin-usage function">.centerPos</span><span class="token punctuation">(</span>200<span class="token punctuation">,</span> 200<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&quot;@{bg-src}/news_1.png&quot;</span><span class="token punctuation">)</span></span> no<span class="token operator">-</span>repeat<span class="token punctuation">;</span>

    <span class="token selector">a</span> <span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@link-color</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入公共部分" tabindex="-1"><a class="header-anchor" href="#导入公共部分" aria-hidden="true">#</a> 导入公共部分</h3><blockquote><p>@import (reference) &quot;common&quot;;</p><p>reference: 只把内容导入过来使用, 但是不会编译common中的内容</p></blockquote><blockquote><p>common.less文件</p></blockquote><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">// 函数</span>
<span class="token selector">.transition(<span class="token variable">@property</span>:all,<span class="token variable">@duration</span>: .5s,
<span class="token variable">@timing-function</span>: linear,<span class="token variable">@delay</span>:0s)</span><span class="token punctuation">{</span>
    <span class="token property">-webkit-transition</span><span class="token punctuation">:</span> <span class="token variable">@arguments</span><span class="token punctuation">;</span>
    <span class="token property">transition</span><span class="token punctuation">:</span> <span class="token variable">@arguments</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token selector">.centerPos(<span class="token variable">@w</span>:100, <span class="token variable">@h</span>:100)</span><span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> <span class="token function">unit</span><span class="token punctuation">(</span><span class="token function">-</span><span class="token punctuation">(</span><span class="token variable">@h</span><span class="token operator">/</span>2<span class="token punctuation">)</span><span class="token punctuation">,</span> px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> <span class="token function">unit</span><span class="token punctuation">(</span><span class="token function">-</span><span class="token punctuation">(</span><span class="token variable">@w</span><span class="token operator">/</span>2<span class="token punctuation">)</span><span class="token punctuation">,</span> px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>demo1.less文件</p></blockquote><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token variable">@import</span> <span class="token punctuation">(</span>reference<span class="token punctuation">)</span> <span class="token string">&quot;common&quot;</span><span class="token punctuation">;</span><span class="token comment">/* 只把内容导入过来使用, 但是不会编译common中的内容 */</span>

<span class="token selector">.cc</span> <span class="token punctuation">{</span>
    <span class="token mixin-usage function">.transition</span><span class="token punctuation">;</span><span class="token comment">/* 默认值 */</span>
    .<span class="token function">transition</span><span class="token punctuation">(</span><span class="token variable">@duration<span class="token punctuation">:</span></span> 1s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 变量</span>
<span class="token variable">@link-color<span class="token punctuation">:</span></span> #222<span class="token punctuation">;</span>

<span class="token comment">// 拼接</span>
<span class="token variable">@bg-src<span class="token punctuation">:</span></span> <span class="token string">&quot;../img&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 嵌套 作用域 作用域链 &amp;符号 </span>
<span class="token variable">@H<span class="token punctuation">:</span></span> 200<span class="token punctuation">;</span>
<span class="token selector">.pub</span> <span class="token punctuation">{</span>
    <span class="token variable">@H<span class="token punctuation">:</span></span> 100<span class="token punctuation">;</span>
    <span class="token selector">.bg</span> <span class="token punctuation">{</span><span class="token comment">/* .pub .bg */</span>
        <span class="token selector">a</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">unit</span><span class="token punctuation">(</span><span class="token variable">@H</span><span class="token punctuation">,</span> px<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">/* 300 和js一样,有变量提升, 作用域链*/</span>
        <span class="token punctuation">}</span>
        <span class="token variable">@H<span class="token punctuation">:</span></span> 300<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">&amp; &gt; .bg</span> <span class="token punctuation">{</span><span class="token comment">/* .pub &gt; .bg */</span>

    <span class="token punctuation">}</span>
    <span class="token selector">&amp;.bg</span> <span class="token punctuation">{</span><span class="token comment">/* .pub.bg */</span>

    <span class="token punctuation">}</span>
    <span class="token selector">&amp;:hover</span> <span class="token punctuation">{</span><span class="token comment">/* .pub:hover */</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token mixin-usage function">.centerPos</span><span class="token punctuation">(</span>200<span class="token punctuation">,</span> 200<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&quot;@{bg-src}/news_1.png&quot;</span><span class="token punctuation">)</span></span> no<span class="token operator">-</span>repeat<span class="token punctuation">;</span>

    <span class="token selector">a</span> <span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@link-color</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.hover</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@link-color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36),l=[c];function o(i,u){return s(),a("div",null,l)}const d=n(t,[["render",o],["__file","index.html.vue"]]);export{d as default};

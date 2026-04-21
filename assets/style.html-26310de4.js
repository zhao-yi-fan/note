import{_ as i,n as l,p as t,q as c,s as n,R as s,t as e,Z as o}from"./framework-fdd38eac.js";const p={},d=n("h1",{id:"代码风格",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#代码风格","aria-hidden":"true"},"#"),s(" 代码风格")],-1),m=n("p",null,"为了约定大家的代码风格,所以在社区中诞生了一些比较规范的代码风格规范:",-1),r={href:"https://standardjs.com/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/lin-123/javascript",target:"_blank",rel:"noopener noreferrer"},u=o(`<p><strong>不论采用哪种风格,无分号在这三种情况是需要加分号的</strong>:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>

<span class="token comment">//如果不加分号的话.</span>
<span class="token comment">//TypeError: say(...) is not a function      </span>
<span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">//分号写在这里,如果写在say();这里的话,可能say();后面还会继续写代码,还要继续加分号</span>
<span class="token comment">// ;(function () {</span>
<span class="token comment">//     console.log(&#39;hello&#39;);</span>
    
<span class="token comment">// })()</span>


<span class="token comment">// ;[&#39;苹果&#39;, &#39;香蕉&#39;].forEach(function (item) {</span>
<span class="token comment">//     console.log(item);</span>
    
<span class="token comment">// })</span>


<span class="token comment">// \` 是 EcmaScript 6中新增的一种字符串包裹方式, 叫做: 末班字符串</span>
<span class="token comment">//  它支持换行和非常方便拼接变量</span>
<span class="token comment">// var foo = \`</span>
<span class="token comment">// 大家好</span>
<span class="token comment">// hello            床前明月光</span>
<span class="token comment">// world</span>
<span class="token comment">// hhh\`</span>
<span class="token comment">// console.log(foo)</span>


<span class="token punctuation">;</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">hello</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token comment">//当你采用了无分号的代码风格的时候后,只需要注意以下情况就不会有上面的问题了</span>
<span class="token comment">//      当一行代码是以:</span>
<span class="token comment">//      (</span>
<span class="token comment">//      [</span>
<span class="token comment">//      \`</span>
<span class="token comment">//      开头的时候,则在前面补上一个分号用以避免一些语法解析错误.</span>
<span class="token comment">//  所以你会发现在一些第三方的代码中能够看到以上来就以一个 ; 开头.</span>
<span class="token comment">//  结论:</span>
<span class="token comment">//      无论你的代码是否有分号,都建议如果一行代码是以 ( [ \` 开头的,则最好都在其前面补上一个分号.</span>
<span class="token comment">//      有些人还喜欢玩一些花哨的东西,例如! # $ ,也和分号有一样的作用,但不推荐使用    !\`hello\`.toString()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function k(b,h){const a=l("ExternalLinkIcon");return t(),c("div",null,[d,m,n("ul",null,[n("li",null,[n("a",r,[s("JavaScript Standard Style"),e(a)]),s("用的人多")]),n("li",null,[n("a",v,[s("Airbnb JavaScript Style"),e(a)]),s(" 更严谨")])]),u])}const f=i(p,[["render",k],["__file","style.html.vue"]]);export{f as default};

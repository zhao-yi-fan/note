import{_ as a,p as e,q as t,Z as s,s as n}from"./framework-fdd38eac.js";const p={},o=s(`<h1 id="typescript" tabindex="-1"><a class="header-anchor" href="#typescript" aria-hidden="true">#</a> typescript</h1><h2 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">interface</span> <span class="token class-name">ISchool</span> <span class="token punctuation">{</span>
  readonly name<span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  address<span class="token operator">?.</span>string
<span class="token punctuation">}</span>

<span class="token keyword">let</span> <span class="token literal-property property">school</span><span class="token operator">:</span>ISchool <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;zf&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
  <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token string">&#39;回龙观东大街&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 接口进行扩展</span>
<span class="token keyword">interface</span> <span class="token class-name">IZhufeng</span> <span class="token keyword">extends</span> <span class="token class-name">ISchool</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token punctuation">[</span>key<span class="token operator">:</span>string<span class="token punctuation">]</span><span class="token operator">:</span>any <span class="token comment">// 任意类型</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> <span class="token literal-property property">zhufeng</span><span class="token operator">:</span>IZhufeng <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>school<span class="token punctuation">,</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span><span class="token number">2</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 函数主要关系返回值 和 参数</span>
<span class="token keyword">function</span> <span class="token function">sum1</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">a</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
<span class="token function">sum1</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span>

<span class="token comment">// 声明一个类型 可以做或操作</span>
type Sum <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">aa</span><span class="token operator">:</span> number<span class="token punctuation">,</span> <span class="token literal-property property">bb</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> number<span class="token punctuation">)</span> <span class="token operator">|</span> string

<span class="token comment">// 这种声明方式不可以或操作 但是可以继承</span>
<span class="token keyword">interface</span> <span class="token class-name">Sum1</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>a<span class="token operator">:</span> number<span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> number<span class="token punctuation">)</span><span class="token operator">:</span> number
<span class="token punctuation">}</span>

<span class="token comment">// type仅仅是一个别名 一般在定义联合类型，定义临时变量时可以用</span>
<span class="token keyword">let</span> <span class="token literal-property property">sum2</span><span class="token operator">:</span> Sum <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> number<span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> number<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token parameter">number</span> <span class="token operator">=&gt;</span> a <span class="token operator">+</span> b



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型" aria-hidden="true">#</a> 泛型</h2><p>用来在代码执行时传入的类型，来确定结果</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> createArray<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>len<span class="token operator">:</span>number<span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span>

<span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token function">createArray</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="as-const" tabindex="-1"><a class="header-anchor" href="#as-const" aria-hidden="true">#</a> as const</h2>`,9),c=n("div",{class:"custom-container info"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"INFO"),n("p",null,"对于数组和对象，可以使用 as const 来将其转换为只读类型")],-1),l=s(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">/* 
类型提示
const a: (string | number | {
  gender: string;
})[] 
 */</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> gender<span class="token operator">:</span> <span class="token string">&quot;male&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">/* 
类型提示
const b: readonly [&quot;jack&quot;, 123, {
    readonly gender: &quot;male&quot;;
}]
 */</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> gender<span class="token operator">:</span> <span class="token string">&quot;male&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定义一个固定格式的数组" tabindex="-1"><a class="header-anchor" href="#定义一个固定格式的数组" aria-hidden="true">#</a> 定义一个固定格式的数组</h2><p>一个方法传入一个字符串数组，返回一个对象，对象的key是数组的每一项，value是数组的每一项</p><p>初始值使用 <code>as { [key in K]: string }</code> 来定义</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> getArray <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">string</span></span><span class="token operator">&gt;</span><span class="token punctuation">(</span>keys<span class="token operator">:</span> <span class="token constant">K</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> keys<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>pre<span class="token punctuation">,</span> cur<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token operator">...</span>pre<span class="token punctuation">,</span> <span class="token punctuation">[</span>cur<span class="token punctuation">]</span><span class="token operator">:</span> cur <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">/* 
getArray的类型提示:
const getArray: &lt;&quot;name&quot; | &quot;age&quot;&gt;(keys: (&quot;name&quot; | &quot;age&quot;)[]) =&gt; {
    name: string;
    age: string;
}

newArr的类型提示:
const newArr: {
    name: string;
    age: string;
}
 */</span>
<span class="token keyword">const</span> newArr <span class="token operator">=</span> <span class="token function">getArray</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),i=[o,c,l];function r(u,d){return e(),t("div",null,i)}const v=a(p,[["render",r],["__file","index.html.vue"]]);export{v as default};

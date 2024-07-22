import{_ as s,p as a,q as t,s as n,Z as p}from"./framework-fdd38eac.js";const e={},o=n("div",{class:"custom-container info"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"INFO"),n("p",null,"基本类型、组件状态(useState)可以放到依赖里，但是对象、数组、函数等引用类型不可以放到依赖里")],-1),c=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;app&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script type<span class="token operator">=</span><span class="token string">&quot;text/babel&quot;</span><span class="token operator">&gt;</span>
  <span class="token comment">// 基本类型、组件状态(useState)可以放到依赖里，但是对象、数组、函数等引用类型不可以放到依赖里</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> useEffect<span class="token punctuation">,</span> useMemo<span class="token punctuation">,</span> useState <span class="token punctuation">}</span> <span class="token operator">=</span> React<span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">App</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>num<span class="token punctuation">,</span> setNum<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token comment">// let dep = { name: &#39;jack&#39; } // 无限循环</span>
    <span class="token comment">// let dep = [] // 无限循环</span>
    <span class="token keyword">let</span> dep <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 不无限循环</span>
    <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;App useEffect&#39;</span><span class="token punctuation">)</span>
      <span class="token function">setNum</span><span class="token punctuation">(</span>num <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>dep<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">}</span>

  ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;app&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),l=[o,c];function i(u,r){return a(),t("div",null,l)}const d=s(e,[["render",i],["__file","0206.html.vue"]]);export{d as default};
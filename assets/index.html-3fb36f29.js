import{_ as t,n as l,p,q as o,s as n,R as s,t as i,Z as a}from"./framework-fdd38eac.js";const c="/assets/node终端-137e5d82.png",u="/assets/15-cffb157c.png",d="/assets/ip地址和端口号-867834bd.png",r="/assets/Content-Type-9bd183d4.png",m="/assets/服务端渲染-211f8815.png",v="/assets/客户端渲染-a55b2d2b.png",k={},b=a('<h1 id="node-js" tabindex="-1"><a class="header-anchor" href="#node-js" aria-hidden="true">#</a> node.js</h1><h2 id="node-js介绍" tabindex="-1"><a class="header-anchor" href="#node-js介绍" aria-hidden="true">#</a> node.js介绍</h2><h3 id="node-js是什么" tabindex="-1"><a class="header-anchor" href="#node-js是什么" aria-hidden="true">#</a> node.js是什么?</h3><p>node.js是技术, 不是后台的语言</p><p>安装了node 之后,开始菜单的 node.js 中 Node.js 进程和浏览器的 Console 一样</p><p>菜单的 Node.js command prompt 是 Node 命令行窗口</p><p>服务器端:java php Python Ruby .Net C# Node.js</p><p>官网nodejs.org有三点定义:</p>',8),h={href:"https://developers.google.com/v8/",target:"_blank",rel:"noopener noreferrer"},f=a('<p>翻译:</p><ul><li><p>node.js不是一门语言,node.js不是库,不是框架,node.js是一个JavaScript运行时环境,简单点来讲就是Node.js可以解析和执行JavaScript代码.</p></li><li><p>以前只有浏览器可以解析执行JavaScript代码</p></li><li><p>也就是说现在的JavaScript可以完全脱离浏览器来运行,一切都归功于:Node.js</p></li></ul><p><code>浏览器中的JavaScript:</code></p><ul><li>EcmaScript 基本的语法,if,var function Object Array</li><li>BOM</li><li>DOM</li></ul><p><code>Node.js中的JavaScript</code></p><ul><li>没有BOM,DOM</li><li>EcmaScript 基本的JavaScript语法部分</li><li>在Node中 为JavaScript执行环境提供了一些服务器级别的操作API <ul><li>例如文件读写</li><li>网络服务的构建</li><li>网络通信</li><li>http服务器</li><li>等处理..</li></ul></li></ul><p>构建在Chrome的V8引擎执行</p><ul><li>代码只是具有特定个数的字符串而已</li><li>引擎可以认识它,引擎可以帮你去解析和执行</li><li>Google Chrome的V8引擎室目前公认的解析执行Javascript代码最快的</li><li>Node.js的作者把Google Chrome中的V8引擎移植了出来,开发了一个独立的JavaScript运行时环境.</li></ul><p>2.Node.js uses an event-driven,non-blacking I/O model that makes It lightweight and efficient.</p><p>翻译:</p><ul><li>event-driven 事件驱动</li><li>non-blocking I/O model非阻塞IO模型(异步)</li><li>lightweight and efficient轻量和高效</li></ul><p>3.Node.js&#39;package ecosystem, npm, is the largest ecosystem of open source libraries in the world.</p><p>翻译:</p><ul><li>npm是世界上最大的开源库生态系统</li><li>绝大多数JavaScript相关的包都存放在npm上,这样做的目的是为了让开发人员更方便的去下载使用.</li><li><code>npm install jquery</code></li></ul><h3 id="node-js能做什么" tabindex="-1"><a class="header-anchor" href="#node-js能做什么" aria-hidden="true">#</a> Node.js能做什么</h3><ul><li><p>Web服务器后台</p></li><li><p>命令行工具</p><ul><li><p>npm(node)</p></li><li><p>git(c语言)</p></li><li><p>hexo(node)</p></li><li><p>...</p></li></ul></li><li><p>对于前端开发工程师来讲,接触node最多的是它的命令行工具</p><ul><li>自己写的很少,主要是使用别人开发的:</li><li>webpack</li><li>gulp</li><li>npm</li></ul></li></ul><h3 id="能学到什么" tabindex="-1"><a class="header-anchor" href="#能学到什么" aria-hidden="true">#</a> 能学到什么:</h3><ul><li>B/S变成模型 <ul><li>Browser - Server</li><li>back-end</li><li>任何服务端技术这种BS编程模型都是一样,和语言无关</li><li>Node知识作为我们学习BS变成模型的一个工具而已</li></ul></li><li>模块化编程 <ul><li><code>@import(文件路径)</code></li><li>以前认知的JavaScript只能通过<code>script</code>标签来加载</li><li>在Node中可以像<code>@import()</code>一样来引用加载JavaScript脚本文件</li><li>Node常用API</li><li>异步编程 <ul><li>回调函数</li><li>Promise</li><li>async</li><li>generator</li></ul></li><li>Express Web开发框架</li><li>EcmaScript 6 <ul><li>只是一个新语法</li></ul></li><li>学习Node不仅会帮助打开服务器端黑盒子,还会学习以后的高级内容 <ul><li>Vue.js</li><li>React</li><li>angular</li></ul></li></ul></li></ul><h2 id="核心模块" tabindex="-1"><a class="header-anchor" href="#核心模块" aria-hidden="true">#</a> 核心模块</h2><h3 id="fs-文件系统" tabindex="-1"><a class="header-anchor" href="#fs-文件系统" aria-hidden="true">#</a> fs-文件系统</h3><ol><li><p>fs.readFileSync()是同步读取</p></li><li><p>fs.readFile()是异步读取</p></li></ol><p>fs.readFile(path[, options], callback)</p>',22),g=n("li",null,[n("code",null,"path"),s(" string | Buffer | URL | integer 文件名或文件描述符。")],-1),j=n("code",null,"options",-1),x=n("li",null,[n("code",null,"encoding"),s(" string | null 默认为 "),n("code",null,"null"),s("。")],-1),y=n("code",null,"flag",-1),w={href:"http://nodejs.cn/s/JjbY8n",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"'r'",-1),S=n("li",null,[n("code",null,"callback"),s(" Function "),n("ul",null,[n("li",null,[n("code",null,"err"),s(" Error")]),n("li",null,[n("code",null,"data"),s(" string | Buffer")])])],-1),q=a(`<p>异步地读取文件的内容。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;/etc/passwd&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>callback</code> 有两个参数 <code>(err, data)</code>，其中 <code>data</code> 是文件的内容。</p><p>如果没有指定 <code>encoding</code>，则返回原始的 buffer。</p><p>如果 <code>options</code> 是一个字符串，则指定字符编码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;/etc/passwd&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utf8&#39;</span><span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>node.js 中通常操作都有同步和异步, 同步操作会阻塞进程, 导致代码不往下面继续执行, 建议使用异步版本</p></blockquote><ol start="3"><li>读取失败抛出异常:</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;文件路径&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span> <span class="token comment">//抛出错误, 后面的代码不会执行</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>读取文件会自动创建Buffer缓存,把文件内容存到缓存中,以十六进制的形式存储.</li></ol><p>若想转回字符串</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span><span class="token string">&#39;./笔记.md&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;同步读取&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// data.toString()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="buffer-内存" tabindex="-1"><a class="header-anchor" href="#buffer-内存" aria-hidden="true">#</a> Buffer-内存</h3><ol><li><p>就是内存的地址,每个内存地址都有编号,相当于内存中的内存地址</p></li><li><p>buffer是全局模块.用buffer不用require</p></li><li><p>文件流中读取系统会自动创建Buffer.</p></li><li><p>如果想要自己创建:</p></li></ol><p>Buffer.alloc(size[, fill[, encoding]])</p><blockquote><p><code>size</code> integer 新建的 <code>Buffer</code> 的长度。</p><p><code>fill</code> string | Buffer | integer 预填充 <code>Buffer</code> 的值。默认为 <code>0</code>。</p><p><code>encoding</code> string 如果 <code>fill</code> 是字符串，则指定 <code>fill</code> 的字符编码。默认为 <code>&#39;utf8&#39;</code>。</p></blockquote><p>创建一个大小为 size <strong>字节</strong>的 Buffer。 如果 fill 为 undefined，则用 0 填充 Buffer。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> buf1 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// &lt;Buffer 00 00 00 00 00 00 00 00 00 00&gt;</span>

<span class="token keyword">const</span> buf1 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// &lt;Buffer 0a 0a 0a 0a 0a 0a 0a 0a 0a 0a&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Buffer.from(array) 使用字节数组 <code>array</code> 创建 <code>Buffer</code>。</p><blockquote><p><code>array</code> integer</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 输入的如果是十进制的话, 会把十进制转成十六进制</span>
<span class="token keyword">const</span> buf2 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">01</span><span class="token punctuation">,</span> <span class="token number">02</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf2<span class="token punctuation">)</span>
<span class="token comment">// &lt;Buffer 01 02 0d&gt;</span>

<span class="token comment">// 输入的直接是十六进制会直接输出</span>
<span class="token keyword">const</span> buf3 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0x62</span><span class="token punctuation">,</span> <span class="token number">0x75</span><span class="token punctuation">,</span> <span class="token number">0x66</span><span class="token punctuation">,</span> <span class="token number">0x66</span><span class="token punctuation">,</span> <span class="token number">0x65</span><span class="token punctuation">,</span> <span class="token number">0x72</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf3<span class="token punctuation">)</span>
<span class="token comment">//&lt;Buffer 62 75 66 66 65 72&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Buffer.from(string[, encoding]) 创建一个包含 <code>string</code> 的 <code>Buffer</code>。</p><p><code>string</code> string 要编码的字符串。</p><p><code>encoding</code> string <code>string</code> 的字符编码。默认为 <code>&#39;utf8&#39;</code>。</p><p>注意: 转二进制的编码格式默认是utf8,如果编码格式为ASCII, 中文转换为二进制就会编码有错误, 虽然二进制看不出结果.然后输出的时候用toString(),toString()方法有隐式转换编码格式默认使用utf8.可以手动更改.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> buf4 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;hello node.js中文&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf4<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 输出: hello node.js中文</span>

<span class="token keyword">const</span> buf4 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;hello node.js中文&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ascii&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf4<span class="token punctuation">)</span>
<span class="token comment">// 输出: &lt;Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 2e 6a 73 2d 87&gt;</span>

<span class="token keyword">const</span> buf4 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;hello node.js中文&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ascii&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf4<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// hello node.js-�       </span>

<span class="token keyword">const</span> buf5 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;this is a test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> buf6 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;7468697320697320612074c3a97374&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hex&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf5<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 输出: this is a test</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf6<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 输出: this is a test</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf5<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;ascii&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 输出: this is a tC)st</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>不是缓存, 是内存. 不会自动消失, 除非关闭服务器, 会清除占用的内存.</li></ol><h3 id="stream-数据流" tabindex="-1"><a class="header-anchor" href="#stream-数据流" aria-hidden="true">#</a> Stream-数据流</h3><h2 id="起步" tabindex="-1"><a class="header-anchor" href="#起步" aria-hidden="true">#</a> 起步</h2><h3 id="安装node环境" tabindex="-1"><a class="header-anchor" href="#安装node环境" aria-hidden="true">#</a> 安装Node环境</h3><ul><li>查看当前是否有node</li></ul><p>cmd-&gt;&gt;node --version 可以查看版本号</p><ul><li>下载:https://nodejs.org/en/download/ <ul><li>LTS版本:long time support长期支持版本,稳定版</li><li>current版本:体验版,最新特性版</li><li>别的版本就点download里,选别的平台的版本</li></ul></li><li>安装 <ul><li>如果已经安装过,继续安装就会把原来的旧版本覆盖,进行升级</li><li>傻瓜式一路<code>next</code></li></ul></li><li>确认Node环境是否安装成功 <ul><li>打开命令行,输入<code>node --version</code></li><li>或者<code>node -v</code></li></ul></li><li>环境变量</li></ul><h3 id="repl" tabindex="-1"><a class="header-anchor" href="#repl" aria-hidden="true">#</a> REPL</h3><ul><li>read 读取</li><li>eval 执行</li><li>print 输出</li><li>loop 循环</li></ul><p>在终端输入人<code>node</code>命令直接敲回车,退出是ctrl+c两次</p><p><img src="`+c+`" alt=""></p><p>这个环境的作用只是用来帮助做一些辅助测试,例如在里面可以直接使用node中的核心模块而不需要require 加载.</p><h3 id="hello-world" tabindex="-1"><a class="header-anchor" href="#hello-world" aria-hidden="true">#</a> Hello World</h3><h4 id="解析执行javascript" tabindex="-1"><a class="header-anchor" href="#解析执行javascript" aria-hidden="true">#</a> 解析执行JavaScript</h4><p>1.创建编写JavaSCript脚本文件</p><p>2.打开终端,定位到脚本文件所属目录</p><p>3.输入<code>node 文件名</code>执行对应的文件</p><p>注意:</p><p>文件名不要使用<code>node.js</code>来命名,也就是说除了<code>node</code>这个名字随便起(会直接打开文件),最好也不要用中文</p><p>用<code>cmd</code>、<code>Git Bash</code>、<code>cld</code> 都可以、在js文件目录按shift+鼠标右键、或者在sublime中装terminal插件</p><p><code>cls</code>清屏</p><h4 id="读写文件" tabindex="-1"><a class="header-anchor" href="#读写文件" aria-hidden="true">#</a> 读写文件</h4><p>文件读取:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//浏览器中的JavaScript是没有文件操作的能力的</span>
<span class="token comment">//但是Node中的JavaSCript具有文件操作的能力的</span>

<span class="token comment">//fs 是file-System 的简写,就是文件系统 意思</span>
<span class="token comment">//在Node中想文件操作,必须引入fs核心模块</span>
<span class="token comment">//fs这个核心模块提供了所有文件相关的API</span>
<span class="token comment">//例如:fs.readFile就是读取文件的</span>

<span class="token keyword">var</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//2.读取文件</span>
<span class="token comment">//第一个参数是要读取的文件路径</span>
<span class="token comment">//第二个参数是一个回调函数</span>
<span class="token comment">//      error</span>
<span class="token comment">//          如果读取成功,error 是 null</span>
<span class="token comment">//          如果读取失败,error 是 错误对象</span>
<span class="token comment">//      data</span>
<span class="token comment">//          如果读取成功,data 是 读到的数据</span>
<span class="token comment">//          如果读取失败,data 是 undefined没有数据</span>
fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;./data/hello.txt&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//console.log(data)</span>
    <span class="token comment">//&lt;Buffer 76 61 72 20 66 6f 6f 20 3d 20 27 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 27 0d 0a 0d 0a 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 66 6f 6f 29&gt;</span>
    <span class="token comment">//文件中存储的其实都是二进制数据 0 1 </span>
    <span class="token comment">//这里为什么看到的不是0 1 ?是因为二进制转成了16进制了</span>
    <span class="token comment">//但是无论是二进制还是16进制,人都不认识</span>
    <span class="token comment">//需要用toString方法把其转为我们能认识的字符</span>
    <span class="token comment">//console.log(data.toString());</span>

   

    <span class="token comment">//读文件需要判断error是否有错误发生</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;读取文件失败了&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文件写入</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>

<span class="token comment">//第一个参数:文件路径</span>
<span class="token comment">//第二个参数:文件内容</span>
<span class="token comment">//第三个参数:回调函数</span>
<span class="token comment">//      回调函数只有一个参数error</span>

<span class="token comment">//      成功: </span>
<span class="token comment">//          error 是 null</span>
<span class="token comment">//      失败:</span>
<span class="token comment">//          error就是错误对象</span>
fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span><span class="token string">&#39;./data/你好.md&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;大家好,我是Node.js&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//console.log(error);</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//如果文件名有特殊符号,会写入失败</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;写入失败&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">//如果文件有,会覆盖原来的</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;写入成功了&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="http" tabindex="-1"><a class="header-anchor" href="#http" aria-hidden="true">#</a> http</h4><p>很傻的服务器:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//可以使用Node非常轻松的构建一个Web服务器</span>
<span class="token comment">//Node中专门提供了一个核心模块:http</span>
<span class="token comment">//http模块就是帮你创建编写服务器的</span>

<span class="token comment">//1.加载http核心模块</span>
<span class="token keyword">var</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;http&#39;</span><span class="token punctuation">)</span>

<span class="token comment">//2.使用http.createServer() 方法创建一个Web服务器</span>
<span class="token comment">//返回一个 Server 实例</span>
<span class="token keyword">var</span> server <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">//3.服务器要干嘛?</span>
<span class="token comment">//提供服务: 对 数据 的服务</span>
<span class="token comment">//发请求</span>
<span class="token comment">//接收请求</span>
<span class="token comment">//处理请求</span>
<span class="token comment">//给个反馈(发送响应)</span>

<span class="token comment">//注册 request 请求事件</span>
<span class="token comment">//当客户端请求过来,会自动触发服务器的request请求时间,然后执行第二个参数,回调处理</span>
server<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;request&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;收到客户端的请求了&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//4.绑定端口号,启动服务器</span>
server<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;服务器启动成功了,可以通过 http://127.0.0.1:3000/ 来进行访问&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+u+`" alt=""></p><p>关闭服务器:ctrl + c</p><p>http+fs:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 1. 导入 http 模块</span>
<span class="token keyword">const</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;http&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 2. 引入文件系统 file system 模块</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> server <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 该回调函数在每次收到请求时调用</span>
    <span class="token comment">// req指请求对象</span>
    <span class="token comment">// res 指响应对象</span>
    <span class="token comment">//使用 res.writeHead() 设置响应头    </span>
    <span class="token keyword">const</span> url <span class="token operator">=</span> req<span class="token punctuation">.</span>url<span class="token punctuation">;</span>
    <span class="token keyword">const</span> method <span class="token operator">=</span> req<span class="token punctuation">.</span>method<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>url <span class="token operator">===</span> <span class="token string">&#39;/&#39;</span> <span class="token operator">&amp;&amp;</span> method <span class="token operator">===</span> <span class="token string">&#39;GET&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 异步读取首页文件</span>
        fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;./index.html&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 错误处理</span>
                res<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/plain&#39;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token comment">// 返回页面数据</span>
                res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">&#39;500, Server Internal Error&#39;</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span> <span class="token comment">//服务器错误就不会向下继续执行</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 设置响应头</span>
            res<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/html&#39;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token comment">// 返回页面数据</span>
            res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>  
            
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 监听指定端口</span>
server<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="node中的javascript" tabindex="-1"><a class="header-anchor" href="#node中的javascript" aria-hidden="true">#</a> Node中的JavaScript</h2><ul><li>EcmaScript <ul><li>没有 DOM, BOM</li><li>变量</li><li>方法</li><li>数据类型</li><li>内置对象</li><li>Array</li><li>Object</li><li>Date</li><li>Math</li></ul></li><li>模块系统 <ul><li>在Node中没有全局作用域的概念</li><li>在Node中,只能通过require方法来加载执行多个JavaScript脚本文件</li><li>require加载只能是执行其中的代码,文件与文件之间由于是模块作用域,所以不会有污染的问题 <ul><li>模块完全是封闭的</li><li>外部无法访问内部</li><li>内部也无法访问外部</li></ul></li><li>模块作用域固然带来了一些好处,可以加载执行多个文件,完全可以避免变量命名冲突污染的问题</li><li>但是某些情况下,模块与模块是需要进行通信的</li><li>在每一个模块中,都提供了一个对象:<code>exports</code></li><li>该对象默认是一个空对象</li><li>你要做的就是把需要被外部访问使用的成员手动的挂在到<code>exports</code>接口对象中</li><li>然后谁来<code>require</code>这个模块,谁就可以得到模块内部的<code>exports</code>接口对象</li><li>还有其他的一些规则,后面总结,以及如何在项目中使用这种编程方式,会通过后面的案例来处理</li></ul></li><li>第三方模块</li><li>用户自定义模块</li></ul><h3 id="核心模块-1" tabindex="-1"><a class="header-anchor" href="#核心模块-1" aria-hidden="true">#</a> 核心模块</h3><p>​ 核心模块是由Node提供的一个个的的具名的模块,它们都有自己特殊的名称标识,例如:</p><ul><li><p>fs文件操作模块</p></li><li><p>http网络服务构建模块</p></li><li><p>os操作系统信息模块</p></li><li><p>path 路径处理模块</p></li><li><p>...</p><p>所有核心模块在使用的时候都必须手动的先使用<code>require</code>方法来加载,然后才可以使用,例如</p></li><li><p><code>var fs = require(&#39;fs&#39;)</code></p></li></ul><p>Node 为 JavaScript提供了很多服务器级别的API,这些API绝大多数都被包装到一个具名的核心模块中了.</p><p>例如文件操作的<code>fs</code>核心模块,http服务构建的<code>http</code>模块,<code>path</code>路径操作模块,<code>os</code>操作系统信息模块....</p><p>以后只要是核心模块,就必须:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;http&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用户自定义模块" tabindex="-1"><a class="header-anchor" href="#用户自定义模块" aria-hidden="true">#</a> 用户自定义模块</h3><h3 id="第三方模块" tabindex="-1"><a class="header-anchor" href="#第三方模块" aria-hidden="true">#</a> 第三方模块</h3><ul><li><p>第三方模块的标识就是第三方模块的名称 (不可能有第三方模块和核心模块名字一致)</p></li><li><p>主要通过 npm 安装</p><ul><li>开发人员可以把写好的框架, 库发布到 npm 上</li><li>使用者在使用的时候就可以很方便的通过 npm 来下载</li></ul></li><li><p>使用方式: <code>var 名字 = require(&#39;npm install 的那个包名&#39;)</code></p></li><li><p>node_modules</p></li><li><p>node_modules/express</p></li><li><p>node_modules/express/package.json</p></li><li><p>node_modules/express/package.json 里面的main</p></li><li><p>如果 package.json 或者 package.json main 不成立, 则查找备选项: index.js</p></li><li><p>如果以上条件都不成立, 则继续进入上一级目录中的 node_modules 按照上面的规则继续查找</p></li><li><p>如果直到当前文件模块所属磁盘根目录都找不到, 最后报错: <code>can not find module xxx</code></p></li><li><p>在Node中使用 art-template 模板引擎</p><ul><li>安装</li><li>加载</li><li>template.render()</li></ul></li></ul><h2 id="web服务器开发" tabindex="-1"><a class="header-anchor" href="#web服务器开发" aria-hidden="true">#</a> Web服务器开发</h2><h3 id="ip-地址和端口号" tabindex="-1"><a class="header-anchor" href="#ip-地址和端口号" aria-hidden="true">#</a> ip 地址和端口号</h3><ul><li>ip地址用来定位计算机</li><li>端口号用来定位具体的应用程序</li><li>一切需要联网通信的软件都会占用一个端口号</li><li>端口号的范围在0-65536之间</li><li>在计算机中有一些默认端口号,最好不要去使用 <ul><li>例如http服务的80</li></ul></li><li>我们在开发过程中使用一些简单好记的就可以了,例如3000, 5000等没什么含义的</li><li>可以同时开启多个服务,但一定要确保不同服务占用的端口号不一致</li><li>在一台计算机中同一个端口号,同一时间只能被同一个程序占用</li></ul><p><img src="`+d+`" alt=""></p><p>查看自己电脑的ip地址:cmd -&gt;&gt;ipconfig--&gt;&gt;以太网适配器 以太网 中的 IPv4 地址:</p><h3 id="content-type" tabindex="-1"><a class="header-anchor" href="#content-type" aria-hidden="true">#</a> Content-Type</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 响应头</span>
res<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/plain&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常见值:</p><p>html页面: &#39;text/html&#39;</p><p>json数据: &#39;application/json&#39;</p><p>纯文本: &#39;text/plain&#39;</p><ul><li>服务器最好把每次相应的数据是什么内容类型都告诉客户端,而且要正确的告诉</li><li>不同的资源对应的Content-Type是不一样的,具体参照:https://www.oschina.net/</li></ul><img src="`+r+'"><ul><li>对于不同的文本类型的数据,最好都加上编码,目的是为了防止中文解析乱码问题</li></ul><h3 id="通过网络发送文件" tabindex="-1"><a class="header-anchor" href="#通过网络发送文件" aria-hidden="true">#</a> 通过网络发送文件</h3><ul><li>发送的并不是文件,本质上来讲发送的是文件的内容</li><li>当浏览器收到服务器相应内容之后,就会根据你的Content-Type进行对应的解析处理</li></ul><h2 id="服务端渲染" tabindex="-1"><a class="header-anchor" href="#服务端渲染" aria-hidden="true">#</a> 服务端渲染</h2><ul><li>在服务端使用模板引擎</li><li>模板引擎最早诞生于服务端,后来才发展到了前端</li></ul><p><strong>服务端和客户端的模板引擎:</strong></p><ul><li>服务端渲染不利于 SEO 搜索引擎优化</li><li>服务端渲染是可以被爬虫抓取到的, 客户端异步渲染是很难被爬虫抓取的</li><li>所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的</li><li>而是两者结合来做的</li><li>例如京东的商品列表就采用的是服务端渲染,目的是为了 SEO 搜索引擎优化</li><li>而它的商品评论列表为了用户体验,而且也不需要SEO优化,所以采用是客户端渲染</li></ul><p><strong>客户端渲染和服务端渲染的区别</strong></p><ul><li>最少两次请求,发起 ajax 在客户端使用模板引擎渲染.</li><li>客户端拿到的是服务端已经渲染好的</li></ul><p>服务端渲染:</p><img src="'+m+'"><p>客户端渲染:</p><img src="'+v+`"><h2 id="如何解析请求路径中的查询字符串" tabindex="-1"><a class="header-anchor" href="#如何解析请求路径中的查询字符串" aria-hidden="true">#</a> 如何解析请求路径中的查询字符串</h2><ul><li>url.parse()</li></ul><h2 id="如何在-node-实现服务器重定向" tabindex="-1"><a class="header-anchor" href="#如何在-node-实现服务器重定向" aria-hidden="true">#</a> 如何在 Node 实现服务器重定向</h2><ul><li>header(&#39;location&#39;) <ul><li>301 永久重定向 浏览器会记住 <ul><li>a.com b.com</li><li>a 浏览器不会请求 a 了</li><li>直接去跳到 b 了</li><li>例子: www.sina.com会直接跳到www.sina.com.cn,域名其实是.com.cn的,访问www.sina.com会先找缓存有没有到.com.cn的,如果有缓存就不会下载,会直接加载缓存跳到.com.cn.</li></ul></li><li>302 临时重定向 浏览器不记忆 <ul><li>a.com b.com</li><li>a.com 还会请求 a</li><li>a 告诉浏览器你往 b</li></ul></li></ul></li></ul><h2 id="node中的模块系统" tabindex="-1"><a class="header-anchor" href="#node中的模块系统" aria-hidden="true">#</a> Node中的模块系统</h2><p>使用 Node 编写应用程序主要就是在使用:</p><ul><li>EcmaScript语言 <ul><li>和浏览器不一样,在Node中没有 BOM,DOM</li></ul></li><li>核心模块 <ul><li>文件操作的 fs</li><li>http 服务的 http</li><li>url路径操作模块</li><li>path 路径处理模块</li><li>os 操作系统信息</li></ul></li><li>第三方模块 <ul><li>art-template</li><li>bootstrap虽然是从npm上安装的,但不是服务于node的,是服务于客户端的</li><li>必须通过npm来下载才可以使用</li></ul></li><li>咱们自己写的模块 <ul><li>自己创建的文件</li></ul></li></ul><h3 id="什么是模块化" tabindex="-1"><a class="header-anchor" href="#什么是模块化" aria-hidden="true">#</a> 什么是模块化</h3><ul><li>文件作用域</li><li>通信规则 <ul><li>加载 require</li><li>导出</li></ul></li></ul><h3 id="commonjs模块规范" tabindex="-1"><a class="header-anchor" href="#commonjs模块规范" aria-hidden="true">#</a> commonjs模块规范</h3><p>在 Node 中的 JavaScript还有一个很重要的概念: 模块系统.</p><ul><li>模块作用域</li><li>使用require方法用来加载模块</li><li>使用exports接口对象用来导出模块中的成员</li></ul><h4 id="加载require" tabindex="-1"><a class="header-anchor" href="#加载require" aria-hidden="true">#</a> 加载<code>require</code></h4><p>语法:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> 自定义变量名称<span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;模块&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>两个作用:</p><ul><li>执行被加载模块中的代码</li><li>得到被加载模块中的<code>exports</code>导出接口对象</li></ul><h4 id="导出exports" tabindex="-1"><a class="header-anchor" href="#导出exports" aria-hidden="true">#</a> 导出<code>exports</code></h4><ul><li>Node 中是模块作用域, 默认文件中所有的成员只在当前文件模块有效</li><li>对于希望可以被其它模块访问的成员,我们就需要把这些公开的成员都挂载到<code>exports</code>接口对象中就可以了</li></ul><p>导出多个成员(必须在对象中):</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">exports</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">123</span>
<span class="token keyword">exports</span><span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token char">&#39;hello&#39;</span>
<span class="token keyword">exports</span><span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token function">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token char">&#39;ccc&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">exports</span><span class="token punctuation">.</span>d <span class="token operator">=</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token char">&#39;bar&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导出单个成员(拿到的就是:函数,字符串):</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span>

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下情况会覆盖:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span>

<span class="token comment">//以这个为准, 后者会覆盖前者</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以这样来导出多个成员</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">add</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> x <span class="token operator">+</span> y
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">str</span><span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="require-方法加载规则" tabindex="-1"><a class="header-anchor" href="#require-方法加载规则" aria-hidden="true">#</a> require 方法加载规则</h4>`,125),N={href:"https://www.infoq.cn/article/nodejs-module-mechanism",target:"_blank",rel:"noopener noreferrer"},B=n("p",null,"如果想要了解更多底层细节,可以自行参考: 《深入浅出 Node.js》中的模块系统 章节",-1),J=a(`<ul><li>核心模块 <ul><li>模块名</li></ul></li><li>第三方模块 <ul><li>模块名</li></ul></li><li>用户自己写的 <ul><li>路径</li></ul></li><li>优先从缓存加载</li><li>判断模块标识 <ul><li>核心模块</li><li>第三方模块</li><li>自己写的模块</li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>blog
	a 
    	node_modules
    b
    	main<span class="token punctuation">.</span>js
b中的main<span class="token punctuation">.</span>js不会找到a中的 node_modules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>blog
	a 
		node_modules
			art-template
		foo.js
	b
		../a/foo.js
		a 中的第三方包是不能通过 require(&#39;art-template&#39;) 方式来加载
		require(&#39;../a/node_modules/art-template/index.js&#39;)可以用路径的方式加载在a路径下的第三方包
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 如果是非路径形式的模块标识</span>
<span class="token comment">//路径形式的模块</span>
<span class="token comment">// ./ 当前目录,不可省略</span>
<span class="token comment">// ../ 上一级目录, 不可省略</span>
<span class="token comment">// /xxx 几乎不用</span>
<span class="token comment">// d:/a/foo.js 几乎不用</span>
<span class="token comment">// 首位的 / 在这里标识的是当前文件模块所属磁盘根路径</span>
<span class="token comment">// .js后缀名可以省略</span>
<span class="token comment">// require(&#39;./foo.js&#39;)</span>


<span class="token comment">// 核心模块的本质也是文件</span>
<span class="token comment">// 在github上可以看到</span>
<span class="token comment">// 核心模块文件已经被编译到了二进制文件中了,我们只需要按照名字来加载就可以了</span>
<span class="token comment">// require(&#39;fs)</span>
<span class="token comment">// require(&#39;http&#39;)</span>

<span class="token comment">// 第三方模块</span>
<span class="token comment">// 凡是第三方模块都必须通过 npm 来下载</span>
<span class="token comment">// 使用的时候就可以通过 require(&#39;包名&#39;) 的方式来进行加载才可以使用</span>
<span class="token comment">// 不可能有任何一个第三方包的核心模块的名字是一样的</span>
<span class="token comment">// 既不是核心模块也不是路径形式的模块</span>
<span class="token comment">//      先找到当前文件所属目录中的 node_modules 目录</span>
<span class="token comment">//      node_modules/art-template</span>
<span class="token comment">//      node_modules/art-template/package.json 文件</span>
<span class="token comment">//      node_modules/art-template/package.json 文件中的main 属性</span>
<span class="token comment">//      main 属性中就记录了 art-template 的入口模块</span>
<span class="token comment">//      然后加载使用这个第三方包</span>
<span class="token comment">//      实际上最终加载的还是文件</span>

<span class="token comment">// 如果 package.json 文件不存在或者 main 指定的入口模块也没有</span>
<span class="token comment">// 则 node 会自动找该目录下的index.js</span>
<span class="token comment">// 也就是说 index.js 会作为一个默认备选项,加载包a,以上两种情况发生,会加载index.js</span>


<span class="token comment">// 如果以上所有的一个条件都不成立,则会进入上一级目录中的 node_modules 目录查找</span>
<span class="token comment">// 如果上一级还没有,则继续往上上一级查找</span>
<span class="token comment">// ...</span>
<span class="token comment">// 如果直到当前磁盘根目录还找不到, 最后报错:</span>
<span class="token comment">//   can not find module xxx</span>

<span class="token comment">// var template = require(&#39;art-template&#39;)</span>


<span class="token comment">//加载自己创建的包a,模拟第三方包的规则,只要输入了包名,会进入a这个包,然后进入package.json,里面的main</span>
<span class="token comment">//指向了foo.js,最终还是会加载到foo.js,虽然一开始加载的是创建的包a</span>
<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 注意: 我们一个项目有且只有一个 node_modules, 放在项目根目录中,这样的话项目中所有的子目录中的代码都可以加载到第三方包</span>
<span class="token comment">// 不会出现有多个 node_modules</span>


<span class="token comment">// 模块查找机制</span>
<span class="token comment">//      优先从缓存加载</span>
<span class="token comment">//      核心模块</span>
<span class="token comment">//      路径形式的文件模块</span>
<span class="token comment">//      第三方模块</span>
<span class="token comment">//          node_modules/art-template</span>
<span class="token comment">//          node_modules/art-template/package.json</span>
<span class="token comment">//          node_modules/art-template/package.json/main</span>
<span class="token comment">//          index.js 备选项</span>
<span class="token comment">//          进入上一级目录找 node_modules</span>
<span class="token comment">//          按照这个规则一次往上找, 知道磁盘根目录还找不到, 最后报错: Can not find module xxx</span>
<span class="token comment">//      一个项目有且仅有一个 node_modules 而且是存放到目录的根目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h2><h3 id="文件操作路径和模块路径" tabindex="-1"><a class="header-anchor" href="#文件操作路径和模块路径" aria-hidden="true">#</a> 文件操作路径和模块路径</h3><p>文件操作路径</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 在操作文件的相对路径中</span>
<span class="token comment">// ./data/a.txt 相对于当前文件</span>
<span class="token comment">// data/a.txt   相对于当前文件</span>
<span class="token comment">// /data/a.txt  绝对路径, 当前文件模块所处磁盘根目录</span>
<span class="token comment">// c:/xx/xx...  绝对路径</span>
<span class="token comment">// fs.readFile(&#39;/data/a.txt&#39;, function (err, data) {</span>
<span class="token comment">//     // 如果找文件以 / 开头,会到存储该文件的根目录去寻找</span>
<span class="token comment">//     console.log(err);</span>
<span class="token comment">//     // { [Error: ENOENT: no such file or directory, open &#39;c:\\data\\a.txt&#39;]</span>
<span class="token comment">//     // errno: -4058,</span>
<span class="token comment">//     // code: &#39;ENOENT&#39;,</span>
<span class="token comment">//     // syscall: &#39;open&#39;,</span>
<span class="token comment">//     // path: &#39;c:\\\\data\\\\a.txt&#39; }</span>
    
<span class="token comment">//         if (err) {</span>
<span class="token comment">//             return console.log(&#39;读取失败&#39;);</span>
            
<span class="token comment">//         }</span>
<span class="token comment">// })</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模块操作路径:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 相对路径
// require(&#39;./data/foo.js&#39;)

// 这里如果忽略了. 则也是磁盘根目录 是绝对路径
require(&#39;/data/foo.js&#39;)

// 在模块加载中, 相对路径中的 ./ 不能省略
// Error: Cannot find module &#39;data/foo.js&#39;
// require(&#39;data/foo.js&#39;)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nodemon" tabindex="-1"><a class="header-anchor" href="#nodemon" aria-hidden="true">#</a> nodemon</h3><p>我们这里可以使用一个第三方命令行工具, <code>nodemon</code> 来帮我们解决频繁修改代码重启服务器问题/</p><p><code>nodemon</code> 是一个基于Node.js 开发的一个第三方命令行工具, 我们使用的时候需要独立安装:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在任意目录执行该命令都可以</span>
<span class="token comment"># 也就是说, 所有需要 --global 来安装的包都可以在任意目录运行</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--global</span> nodemon
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完毕之后, 使用:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 原来</span>
<span class="token function">node</span> app.js

<span class="token comment"># 使用 nodemon</span>
nodemon app.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只要是通过<code>nodemon app.js</code>启动的服务, 则它会监视你的文件变化, 当文件发生变化的时候, 自动帮你重启服务器.</p>`,17);function E(C,O){const e=l("ExternalLinkIcon");return p(),o("div",null,[b,n("p",null,[s("1.Node.js® is a JavaScript runtime built on "),n("a",h,[s("Chrome's V8 JavaScript engine"),i(e)]),s(".")]),f,n("ul",null,[g,n("li",null,[j,s(" Object | string "),n("ul",null,[x,n("li",null,[y,s(" string详见"),n("a",w,[s("支持的 flag"),i(e)]),s("。默认为 "),_,s("。")])])]),S]),q,n("blockquote",null,[n("p",null,[n("a",N,[s("深入浅出Node.js (三) : 深入Node.js的模块机制"),i(e)])]),B]),J])}const F=t(k,[["render",E],["__file","index.html.vue"]]);export{F as default};

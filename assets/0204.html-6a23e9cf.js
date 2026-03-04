import{_ as s,n as t,p as i,q as l,s as e,R as a,t as d,Z as r}from"./framework-fdd38eac.js";const c={},o=r(`<h2 id="语义化版本-semantic-versioning" tabindex="-1"><a class="header-anchor" href="#语义化版本-semantic-versioning" aria-hidden="true">#</a> 语义化版本（Semantic Versioning）</h2><p>语义化版本是目前最广泛使用的版本号规范，格式为：<strong>主版本号.次版本号.修订号</strong>（MAJOR.MINOR.PATCH）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>版本格式：X.Y.Z

X: 主版本号（Major）- 不兼容的 API 修改
Y: 次版本号（Minor）- 向下兼容的功能性新增
Z: 修订号（Patch）  - 向下兼容的问题修正
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例说明" tabindex="-1"><a class="header-anchor" href="#示例说明" aria-hidden="true">#</a> 示例说明</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.0.0  →  首次正式发布
1.0.1  →  修复了一些 bug，向下兼容
1.1.0  →  新增了功能，向下兼容
2.0.0  →  有破坏性更新，不向下兼容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="版本号递增规则" tabindex="-1"><a class="header-anchor" href="#版本号递增规则" aria-hidden="true">#</a> 版本号递增规则</h3><ol><li><p><strong>修订号（Patch）</strong>：修复 bug，不影响 API</p><ul><li><code>1.0.0</code> → <code>1.0.1</code></li><li>例如：修复内存泄漏、样式问题等</li></ul></li><li><p><strong>次版本号（Minor）</strong>：新增功能，但向下兼容</p><ul><li><code>1.0.1</code> → <code>1.1.0</code></li><li>例如：新增 API、新增组件等</li><li>修订号归零</li></ul></li><li><p><strong>主版本号（Major）</strong>：重大更新，不兼容旧版本</p><ul><li><code>1.1.0</code> → <code>2.0.0</code></li><li>例如：API 重构、删除废弃功能等</li><li>次版本号和修订号都归零</li></ul></li></ol><h2 id="npm-版本符号详解" tabindex="-1"><a class="header-anchor" href="#npm-版本符号详解" aria-hidden="true">#</a> npm 版本符号详解</h2><p>在 <code>package.json</code> 中，版本号前的符号决定了依赖包的更新策略：</p><table><thead><tr><th>符号</th><th>说明</th><th>示例</th><th>允许安装的版本范围</th></tr></thead><tbody><tr><td><code>^</code>（插入符）</td><td>兼容补丁和次要版本更新</td><td><code>^1.2.3</code></td><td><code>&gt;=1.2.3</code> <code>&lt;2.0.0</code></td></tr><tr><td><code>~</code>（波浪符）</td><td>只兼容补丁版本更新</td><td><code>~1.2.3</code></td><td><code>&gt;=1.2.3</code> <code>&lt;1.3.0</code></td></tr><tr><td><code>*</code></td><td>接受任何版本</td><td><code>*</code></td><td>任何版本</td></tr><tr><td><code>&gt;</code></td><td>大于某个版本</td><td><code>&gt;1.2.3</code></td><td><code>&gt;1.2.3</code></td></tr><tr><td><code>&gt;=</code></td><td>大于或等于某个版本</td><td><code>&gt;=1.2.3</code></td><td><code>&gt;=1.2.3</code></td></tr><tr><td><code>&lt;</code></td><td>小于某个版本</td><td><code>&lt;1.2.3</code></td><td><code>&lt;1.2.3</code></td></tr><tr><td><code>&lt;=</code></td><td>小于或等于某个版本</td><td><code>&lt;=1.2.3</code></td><td><code>&lt;=1.2.3</code></td></tr><tr><td>无符号</td><td>精确匹配</td><td><code>1.2.3</code></td><td><code>1.2.3</code>（完全匹配）</td></tr><tr><td><code>-</code></td><td>版本范围</td><td><code>1.2.3 - 2.3.4</code></td><td><code>&gt;=1.2.3</code> <code>&lt;=2.3.4</code></td></tr><tr><td><code>||</code></td><td>或</td><td><code>^1.0.0 || ^2.0.0</code></td><td>1.x.x 或 2.x.x</td></tr></tbody></table><h3 id="常用符号详解" tabindex="-1"><a class="header-anchor" href="#常用符号详解" aria-hidden="true">#</a> 常用符号详解</h3><p><strong>插入符 <code>^</code>（最常用）</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.2.0&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>允许更新次版本号和修订号</li><li><code>^3.2.0</code> 可以安装 <code>3.2.0</code> 到 <code>3.x.x</code>（但不包括 <code>4.0.0</code>）</li><li><strong>npm install 默认使用 <code>^</code></strong></li></ul><p><strong>波浪符 <code>~</code>（更严格）</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;axios&quot;</span><span class="token operator">:</span> <span class="token string">&quot;~1.2.0&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>只允许更新修订号</li><li><code>~1.2.0</code> 可以安装 <code>1.2.0</code> 到 <code>1.2.x</code>（但不包括 <code>1.3.0</code>）</li><li>适合对稳定性要求高的场景</li></ul><p><strong>精确版本（最严格）</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;react&quot;</span><span class="token operator">:</span> <span class="token string">&quot;18.2.0&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>完全锁定版本，不允许任何更新</li><li>适合生产环境或对版本极其敏感的依赖</li></ul><h2 id="预发布版本标识" tabindex="-1"><a class="header-anchor" href="#预发布版本标识" aria-hidden="true">#</a> 预发布版本标识</h2><p>预发布版本通过在版本号后添加连字符和标识符来表示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.0.0-alpha.1   → Alpha 内测版本
1.0.0-beta.1    → Beta 公测版本
1.0.0-rc.1      → Release Candidate 候选版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="版本阶段说明" tabindex="-1"><a class="header-anchor" href="#版本阶段说明" aria-hidden="true">#</a> 版本阶段说明</h3><table><thead><tr><th>版本标识</th><th>全称</th><th>说明</th><th>适用场景</th></tr></thead><tbody><tr><td><code>alpha</code></td><td>Alpha（内测版）</td><td>内部测试版本，功能不完整，存在较多 bug</td><td>开发团队内部测试</td></tr><tr><td><code>beta</code></td><td>Beta（公测版）</td><td>公开测试版本，功能基本完整，会持续加入新功能</td><td>公开测试，收集反馈</td></tr><tr><td><code>rc</code></td><td>Release Candidate</td><td>发布候选版本，功能完整，不再增加新功能，主要修复 bug</td><td>正式发布前的最后测试</td></tr><tr><td><code>stable</code></td><td>Stable（稳定版）</td><td>正式发布的稳定版本</td><td>生产环境使用</td></tr><tr><td><code>lts</code></td><td>Long Term Support</td><td>长期支持版本，会持续维护和修复 bug</td><td>对稳定性要求高的项目</td></tr><tr><td><code>next</code></td><td>Next（下一代版本）</td><td>下一个大版本的开发版本</td><td>尝鲜最新特性</td></tr><tr><td><code>canary</code></td><td>Canary（金丝雀版）</td><td>每日构建版本，包含最新提交的代码</td><td>开发者测试最新功能</td></tr></tbody></table><h3 id="版本发布流程" tabindex="-1"><a class="header-anchor" href="#版本发布流程" aria-hidden="true">#</a> 版本发布流程</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>开发阶段
  ↓
1.0.0-alpha.1  → 内部测试，功能开发中
  ↓
1.0.0-alpha.2  → 修复 bug，继续开发
  ↓
1.0.0-beta.1   → 公开测试，功能基本完成
  ↓
1.0.0-beta.2   → 修复 bug，优化性能
  ↓
1.0.0-rc.1     → 发布候选，准备发布
  ↓
1.0.0-rc.2     → 最后的 bug 修复
  ↓
1.0.0          → 正式发布 🎉
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实际应用示例" tabindex="-1"><a class="header-anchor" href="#实际应用示例" aria-hidden="true">#</a> 实际应用示例</h2><h3 id="vue-3-的版本发布" tabindex="-1"><a class="header-anchor" href="#vue-3-的版本发布" aria-hidden="true">#</a> Vue 3 的版本发布</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>3.0.0-alpha.0   → 2020-01-16  第一个内测版
3.0.0-alpha.13  → 2020-07-18  最后一个内测版
3.0.0-beta.1    → 2020-04-16  第一个公测版
3.0.0-beta.24   → 2020-08-20  最后一个公测版
3.0.0-rc.1      → 2020-07-18  第一个候选版
3.0.0-rc.13     → 2020-09-17  最后一个候选版
3.0.0           → 2020-09-18  正式发布
3.0.1           → 2020-09-19  修复 bug
3.1.0           → 2021-06-07  新增功能
3.2.0           → 2021-08-09  新增功能
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="react-的版本策略" tabindex="-1"><a class="header-anchor" href="#react-的版本策略" aria-hidden="true">#</a> React 的版本策略</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>16.8.0  → 引入 Hooks
17.0.0  → 无新功能，专注于升级便利性
18.0.0  → 引入并发特性，重大更新
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践" aria-hidden="true">#</a> 最佳实践</h2><h3 id="_1-选择合适的版本符号" tabindex="-1"><a class="header-anchor" href="#_1-选择合适的版本符号" aria-hidden="true">#</a> 1. 选择合适的版本符号</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 推荐：对于成熟的库使用 ^</span>
    <span class="token property">&quot;vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.2.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;react&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^18.2.0&quot;</span><span class="token punctuation">,</span>
  
    <span class="token comment">// 严格：对稳定性要求高的使用 ~</span>
    <span class="token property">&quot;axios&quot;</span><span class="token operator">:</span> <span class="token string">&quot;~1.2.0&quot;</span><span class="token punctuation">,</span>
  
    <span class="token comment">// 锁定：生产环境关键依赖</span>
    <span class="token property">&quot;typescript&quot;</span><span class="token operator">:</span> <span class="token string">&quot;5.0.4&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 开发依赖可以放宽限制</span>
    <span class="token property">&quot;vite&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.0&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-使用-package-lock-json" tabindex="-1"><a class="header-anchor" href="#_2-使用-package-lock-json" aria-hidden="true">#</a> 2. 使用 package-lock.json</h3><ul><li>锁定所有依赖的精确版本</li><li>确保团队成员安装相同的依赖版本</li><li>避免 &quot;在我机器上能运行&quot; 的问题</li></ul><h3 id="_3-定期更新依赖" tabindex="-1"><a class="header-anchor" href="#_3-定期更新依赖" aria-hidden="true">#</a> 3. 定期更新依赖</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看可更新的依赖</span>
<span class="token function">npm</span> outdated

<span class="token comment"># 更新所有依赖到符合规则的最新版本</span>
<span class="token function">npm</span> update

<span class="token comment"># 更新到最新版本（可能包含破坏性更新）</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token operator">&lt;</span>package<span class="token operator">&gt;</span>@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-发布自己的包时" tabindex="-1"><a class="header-anchor" href="#_4-发布自己的包时" aria-hidden="true">#</a> 4. 发布自己的包时</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 发布修订版本（bug 修复）</span>
<span class="token function">npm</span> version patch  <span class="token comment"># 1.0.0 → 1.0.1</span>

<span class="token comment"># 发布次版本（新功能）</span>
<span class="token function">npm</span> version minor  <span class="token comment"># 1.0.1 → 1.1.0</span>

<span class="token comment"># 发布主版本（破坏性更新）</span>
<span class="token function">npm</span> version major  <span class="token comment"># 1.1.0 → 2.0.0</span>

<span class="token comment"># 发布预发布版本</span>
<span class="token function">npm</span> version prerelease <span class="token parameter variable">--preid</span><span class="token operator">=</span>alpha  <span class="token comment"># 1.0.0 → 1.0.1-alpha.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他概念" tabindex="-1"><a class="header-anchor" href="#其他概念" aria-hidden="true">#</a> 其他概念</h2><h3 id="rtm-release-to-manufacturing" tabindex="-1"><a class="header-anchor" href="#rtm-release-to-manufacturing" aria-hidden="true">#</a> RTM（Release to Manufacturing）</h3><p>制造发布版本，软件正式交付给生产商制造的版本，通常就是正式版。</p><h3 id="lts-long-term-support" tabindex="-1"><a class="header-anchor" href="#lts-long-term-support" aria-hidden="true">#</a> LTS（Long Term Support）</h3><p>长期支持版本，会持续提供安全更新和 bug 修复，适合生产环境：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Node.js LTS 版本：
- 12.x  → 2019-10 到 2022-04
- 14.x  → 2020-10 到 2023-04
- 16.x  → 2021-10 到 2024-04
- 18.x  → 2022-10 到 2025-04
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nightly-build-canary" tabindex="-1"><a class="header-anchor" href="#nightly-build-canary" aria-hidden="true">#</a> Nightly Build / Canary</h3><p>每日构建版本，包含最新提交的代码，用于测试最新功能：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Chrome Canary  → 每日更新的 Chrome 版本
Next.js Canary → next@canary
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>✅ <strong>使用语义化版本</strong>：遵循 <code>主.次.修订</code> 规范</li><li>✅ <strong>理解版本符号</strong>：<code>^</code> 用于常规依赖，<code>~</code> 用于严格场景</li><li>✅ <strong>关注预发布版本</strong>：了解 alpha、beta、rc 的区别</li><li>✅ <strong>锁定依赖版本</strong>：使用 <code>package-lock.json</code></li><li>✅ <strong>定期更新依赖</strong>：保持依赖的安全性和稳定性</li></ul><h2 id="参考资源" tabindex="-1"><a class="header-anchor" href="#参考资源" aria-hidden="true">#</a> 参考资源</h2>`,53),u={href:"https://semver.org/lang/zh-CN/",target:"_blank",rel:"noopener noreferrer"},p={href:"https://docs.npmjs.com/cli/v9/configuring-npm/package-json#dependencies",target:"_blank",rel:"noopener noreferrer"},v={href:"https://docs.npmjs.com/cli/v9/commands/npm-version",target:"_blank",rel:"noopener noreferrer"};function h(m,b){const n=t("ExternalLinkIcon");return i(),l("div",null,[o,e("ul",null,[e("li",null,[e("a",u,[a("Semantic Versioning 官方文档"),d(n)])]),e("li",null,[e("a",p,[a("npm 版本号文档"),d(n)])]),e("li",null,[e("a",v,[a("npm version 命令"),d(n)])])])])}const k=s(c,[["render",h],["__file","0204.html.vue"]]);export{k as default};

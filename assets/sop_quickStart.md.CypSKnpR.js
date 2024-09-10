import{_ as s,o as a,c as i,a7 as t}from"./chunks/framework.BxGR69Ut.js";const b=JSON.parse('{"title":"快速上手","description":"1分钟内完成自己的博客创建","frontmatter":{"sticky":999,"description":"1分钟内完成自己的博客创建","descriptionHTML":" <span style=\\"color:var(--description-font-color);\\">1分钟内完成自己的博客创建</span> <pre style=\\"background-color: #292b30; padding: 15px; border-radius: 10px;\\" class=\\"shiki material-theme-palenight\\"><code> <span class=\\"line\\"><span style=\\"color:#FFCB6B;\\">npm</span><span style=\\"color:#A6ACCD;\\"> </span><span style=\\"color:#C3E88D;\\">create</span><span style=\\"color:#A6ACCD;\\"> </span><span style=\\"color:#C3E88D;\\">@sugarat/theme@latest</span></span> <br/> <br/> <span class=\\"line\\"><span style=\\"color:#B392F0;\\">bun create</span><span style=\\"color:#E1E4E8;\\"> </span><span style=\\"color:#9ECBFF;\\">@sugarat/theme</span><span style=\\"color:#E1E4E8;\\"> </span></span> </code> </pre>","tag":["SOP"],"top":1,"sidebar":false},"headers":[],"relativePath":"sop/quickStart.md","filePath":"zh/sop/quickStart.md","lastUpdated":1725993304000}'),e={name:"sop/quickStart.md"},p=t(`<h1 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h1><p>1分钟内完成自己的博客创建</p><div class="warning custom-block"><p class="custom-block-title">注意事项</p><p>使用 <a href="https://pnpm.io" target="_blank" rel="noreferrer">pnpm</a>，<a href="https://www.npmjs.com/package/yarn" target="_blank" rel="noreferrer">yarn</a>，<a href="https://bun.sh/" target="_blank" rel="noreferrer">bun</a> ，需要单独安装</p><p><strong>如果喜欢尝鲜，想体验更快的启动和构建速度，推荐使用 bun</strong>（<i style="color:red;">windows 用户不建议使用 bun</i>）</p><p>其它情况推荐使用 pnpm，<em>不推荐使用 yarn</em></p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-zWWI1" id="tab-I9Szw0S" checked><label for="tab-I9Szw0S">安装 PNPM</label><input type="radio" name="group-zWWI1" id="tab-f5vKmMk"><label for="tab-f5vKmMk">安装 bun</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pnpm</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bun</span></span></code></pre></div></div></div></div><h2 id="快速创建项目" tabindex="-1">快速创建项目 <a class="header-anchor" href="#快速创建项目" aria-label="Permalink to &quot;快速创建项目&quot;">​</a></h2><p>使用 <a href="https://github.com/ATQQ/sugar-blog/tree/master/packages/create-theme" target="_blank" rel="noreferrer">@sugarat/create-theme</a> 快速创建模板项目</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-qw69P" id="tab--fCWWyL" checked><label for="tab--fCWWyL">npm</label><input type="radio" name="group-qw69P" id="tab-V87v5hS"><label for="tab-V87v5hS">yarn</label><input type="radio" name="group-qw69P" id="tab-oWC4XBg"><label for="tab-oWC4XBg">pnpm</label><input type="radio" name="group-qw69P" id="tab-Z3uarkf"><label for="tab-Z3uarkf">bun</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @sugarat/theme@latest</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @sugarat/theme</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @sugarat/theme</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @sugarat/theme</span></span></code></pre></div></div></div><details class="details custom-block"><summary>bun创建的项目不一样之处</summary><p>① 会多出一个配置文件 <code>bunfig.toml</code>，默认配置了淘宝镜像源</p><p>② 安装依赖后对应lock文件 <code>bun.lockb</code></p><p>③ 运行命令需添加一个 <code>--bun</code> 参数，不加就是Node运行，体验不到快速(未来官方会做优化)</p></details><p>当然你也可以自定义项目名创建</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-iOtVG" id="tab-rWBP7Gb" checked><label for="tab-rWBP7Gb">npm</label><input type="radio" name="group-iOtVG" id="tab-BjMWZuK"><label for="tab-BjMWZuK">yarn</label><input type="radio" name="group-iOtVG" id="tab--yeUkQK"><label for="tab--yeUkQK">pnpm</label><input type="radio" name="group-iOtVG" id="tab-nkbZJJK"><label for="tab-nkbZJJK">bun</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @sugarat/theme@latest</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-first-blog</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @sugarat/theme</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-first-blog</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @sugarat/theme</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-first-blog</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @sugarat/theme</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-first-blog</span></span></code></pre></div></div></div><p>接下来按照 <a href="https://app.warp.dev/block/lZAFeRnRFgOcsRSUOU5ApV" target="_blank" rel="noreferrer">操作指引</a> 进行操作即可</p><table tabindex="0"><thead><tr><th style="text-align:center;">npm/yarn/pnpm</th><th style="text-align:center;">bun</th></tr></thead><tbody><tr><td style="text-align:center;"><img src="https://img.cdn.sugarat.top/mdImg/MTY4OTQyMDE1NTcxMA==689420155710" alt=""></td><td style="text-align:center;"><img src="https://img.cdn.sugarat.top/mdImg/MTY5NjE0NzY1NDEwMA==696147654100" alt=""></td></tr></tbody></table><p>① 切换到项目的目录</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-blog</span></span></code></pre></div><p>② 安装依赖</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-zQf1G" id="tab-g9On2Jl" checked><label for="tab-g9On2Jl">pnpm</label><input type="radio" name="group-zQf1G" id="tab-H17sWIH"><label for="tab-H17sWIH">bun</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div></div></div><p>③ 开发启动</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Rw-s-" id="tab-oamTocs" checked><label for="tab-oamTocs">pnpm</label><input type="radio" name="group-Rw-s-" id="tab-qxMgEXO"><label for="tab-qxMgEXO">bun</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div></div></div><p><img src="https://img.cdn.sugarat.top/mdImg/MTY5NTIxODUyMDU4MQ==695218520581" alt=""></p><p>你就会得到一个这样的页面</p><p><img src="https://img.cdn.sugarat.top/mdImg/MTY3Njk4OTk2Mjc0Nw==676989962747" alt=""></p><p>④ 构建产物</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-0G62w" id="tab-Lu6IKEq" checked><label for="tab-Lu6IKEq">pnpm</label><input type="radio" name="group-0G62w" id="tab-6fbSsHx"><label for="tab-6fbSsHx">bun</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div></div></div><p><img src="https://img.cdn.sugarat.top/mdImg/MTY5NTIxODYwNzA3Nw==695218607077" alt=""></p><p>默认会开启内置的离线全文搜索（基于 <code>pagefind</code> 实现）</p><p>如果不需要可以在 <code>docs/.vitepress/blog-theme.ts</code> 中关闭</p><ul><li>如果<code>npx pagefind</code> 时间过长，可以手动将其安装为项目依赖 <code>pnpm add pagefind</code></li></ul><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> blogTheme</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getThemeConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 如果npx pagefind 时间过长，可以手动将其安装为项目依赖 pnpm add pagefind</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  search: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>⑤ 预览构建产物</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-gT1iV" id="tab-vRNl1zD" checked><label for="tab-vRNl1zD">pnpm</label><input type="radio" name="group-gT1iV" id="tab-fiZ7cQc"><label for="tab-fiZ7cQc">bun</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> serve</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> serve</span></span></code></pre></div></div></div><p><img src="https://img.cdn.sugarat.top/mdImg/MTY5NTIxODY1NzAzNg==695218657036" alt=""></p><h2 id="升级" tabindex="-1">升级 <a class="header-anchor" href="#升级" aria-label="Permalink to &quot;升级&quot;">​</a></h2><p>如果主题更新了，升级主题，原项目只需执行如下指令即可</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-s05iN" id="tab-UKA2Hth" checked><label for="tab-UKA2Hth">pnpm</label><input type="radio" name="group-s05iN" id="tab-1yd5X2d"><label for="tab-1yd5X2d">bun</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @sugarat/theme@latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 更新 vitepress 版本（通常安装最新的即可，主题包每次更新不出意外都会使用最新的VitePress）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress@latest</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @sugarat/theme</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 更新 vitepress 版本（通常安装最新的即可，主题包每次更新不出意外都会使用最新的VitePress）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress@latest</span></span></code></pre></div></div></div><h2 id="更多" tabindex="-1">更多 <a class="header-anchor" href="#更多" aria-label="Permalink to &quot;更多&quot;">​</a></h2><ul><li><a href="https://theme.sugarat.top/config/frontmatter.html" target="_blank" rel="noreferrer">主题配置：首页&amp;文章</a> - 主题提供的一些 <code>frontmatter</code></li><li><a href="https://theme.sugarat.top/config/global.html" target="_blank" rel="noreferrer">主题配置：全局</a> - 主题提供的额外能力</li><li><a href="https://theme.sugarat.top/config/style.html" target="_blank" rel="noreferrer">主题配置：样式</a> - 自定义博客样式介绍</li><li><a href="https://theme.sugarat.top/config/component.html" target="_blank" rel="noreferrer">主题配置：组件能力</a> - 自定义博客样式介绍</li></ul>`,35),l=[p];function n(h,d,r,o,c,k){return a(),i("div",{"data-pagefind-body":!0},l)}const u=s(e,[["render",n]]);export{b as __pageData,u as default};

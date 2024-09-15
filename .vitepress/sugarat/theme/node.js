"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/node.ts
var node_exports = {};
__export(node_exports, {
  defineConfig: () => defineConfig,
  footerHTML: () => footerHTML,
  getThemeConfig: () => getThemeConfig,
  tabsMarkdownPlugin: () => tabsPlugin
});
module.exports = __toCommonJS(node_exports);

// src/utils/node/mdPlugins.ts
var import_module = require("module");

// ../../node_modules/.pnpm/vitepress-plugin-tabs@0.2.0_vitepress@1.3.4_@algolia+client-search@4.19.1_@types+node@20.6.3__ovjzvjgjmyeesvgttjdmi2b3dm/node_modules/vitepress-plugin-tabs/dist/index.js
var tabsMarker = "=tabs";
var tabsMarkerLen = tabsMarker.length;
var ruleBlockTabs = (state, startLine, endLine, silent) => {
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (pos + 3 > max) {
    return false;
  }
  const marker = state.src.charCodeAt(pos);
  if (marker !== 58) {
    return false;
  }
  const mem = pos;
  pos = state.skipChars(pos, marker);
  let len = pos - mem;
  if (len < 3) {
    return false;
  }
  if (state.src.slice(pos, pos + tabsMarkerLen) !== tabsMarker) {
    return false;
  }
  pos += tabsMarkerLen;
  if (silent) {
    return true;
  }
  const markup = state.src.slice(mem, pos);
  const params = state.src.slice(pos, max);
  let nextLine = startLine;
  let haveEndMarker = false;
  for (; ; ) {
    nextLine++;
    if (nextLine >= endLine) {
      break;
    }
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    const mem2 = pos;
    max = state.eMarks[nextLine];
    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    if (state.src.charCodeAt(pos) !== marker) {
      continue;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      continue;
    }
    pos = state.skipChars(pos, marker);
    if (pos - mem2 < len) {
      continue;
    }
    pos = state.skipSpaces(pos);
    if (pos < max) {
      continue;
    }
    haveEndMarker = true;
    break;
  }
  len = state.sCount[startLine];
  state.line = nextLine + (haveEndMarker ? 1 : 0);
  const token = state.push("tabs", "div", 0);
  token.info = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup = markup;
  token.map = [startLine, state.line];
  return true;
};
var tabBreakRE = /^\s*::(.+)$/;
var forbiddenCharsInSlotNames = /[ '"]/;
var parseTabBreakLine = (line) => {
  const m = line.match(tabBreakRE);
  if (!m)
    return null;
  const trimmed = m[1].trim();
  if (forbiddenCharsInSlotNames.test(trimmed)) {
    throw new Error(
      `contains forbidden chars in slot names (space and quotes) (${JSON.stringify(
        line
      )})`
    );
  }
  return trimmed;
};
var lastLineBreakRE = /\n$/;
var parseTabsContent = (content) => {
  const lines = content.replace(lastLineBreakRE, "").split("\n");
  const tabInfos = [];
  const tabLabels = /* @__PURE__ */ new Set();
  let currentTab = null;
  const createTabInfo = (label) => {
    if (tabLabels.has(label)) {
      throw new Error(`a tab labelled ${JSON.stringify(label)} already exists`);
    }
    const newTab = { label, content: [] };
    tabInfos.push(newTab);
    tabLabels.add(label);
    return newTab;
  };
  for (const line of lines) {
    const tabLabel = parseTabBreakLine(line);
    if (currentTab === null) {
      if (tabLabel === null) {
        throw new Error(
          `tabs should start with \`::\${tabLabel}\` (e.g. "::foo"). (received: ${JSON.stringify(
            line
          )})`
        );
      }
      currentTab = createTabInfo(tabLabel);
      continue;
    }
    if (tabLabel === null) {
      currentTab.content.push(line);
    } else {
      currentTab = createTabInfo(tabLabel);
    }
  }
  if (tabInfos.length < 0) {
    throw new Error("tabs should include at least one tab");
  }
  return tabInfos.map((info) => ({
    label: info.label,
    content: info.content.join("\n").replace(lastLineBreakRE, "")
  }));
};
var parseParams = (input) => {
  if (!input.startsWith("=")) {
    return {
      shareStateKey: void 0
    };
  }
  const splitted = input.split("=");
  return {
    shareStateKey: splitted[1]
  };
};
var tabsPlugin = (md) => {
  md.block.ruler.before("fence", "=tabs", ruleBlockTabs, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  md.renderer.rules.tabs = (tokens, index, _options, env) => {
    const token = tokens[index];
    const tabs = parseTabsContent(token.content);
    const renderedTabs = tabs.map((tab) => ({
      label: tab.label,
      content: md.render(tab.content, env)
    }));
    const params = parseParams(token.info);
    const tabLabelsProp = `:tabLabels="${md.utils.escapeHtml(
      JSON.stringify(tabs.map((tab) => tab.label))
    )}"`;
    const shareStateKeyProp = params.shareStateKey ? `sharedStateKey="${md.utils.escapeHtml(params.shareStateKey)}"` : "";
    const slots = renderedTabs.map(
      (tab) => `<template #${tab.label}>${tab.content}</template>`
    );
    return `<PluginTabs ${tabLabelsProp} ${shareStateKeyProp}>${slots.join(
      ""
    )}</PluginTabs>`;
  };
};

// src/utils/node/mdPlugins.ts
var import_vitepress_markdown_timeline = __toESM(require("vitepress-markdown-timeline"));

// src/utils/node/index.ts
var import_node_path = __toESM(require("path"));
var import_theme_shared = require("@sugarat/theme-shared");
function aliasObjectToArray(obj) {
  return Object.entries(obj).map(([find, replacement]) => ({
    find,
    replacement
  }));
}
function isBase64ImageURL(url) {
  const regex = /^data:image\/[a-z]+;base64,/;
  return regex.test(url);
}
var imageRegex = /!\[.*?\]\((.*?)\s*(".*?")?\)/;
function getFirstImagURLFromMD(content, route) {
  const url = content.match(imageRegex)?.[1];
  const isHTTPSource = url && url.startsWith("http");
  if (!url) {
    return "";
  }
  if (isHTTPSource || isBase64ImageURL(url)) {
    return url;
  }
  const paths = (0, import_theme_shared.joinPath)("/", route).split("/");
  paths.splice(paths.length - 1, 1);
  const relativePath = url.startsWith("/") ? url : import_node_path.default.join(paths.join("/") || "", url);
  return (0, import_theme_shared.joinPath)("/", relativePath);
}
function debounce(func, delay = 1e3) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...rest);
    }, delay);
  };
}
function isEqual(obj1, obj2, excludeKeys = []) {
  const keys1 = Object.keys(obj1).filter((key) => !excludeKeys.includes(key));
  const keys2 = Object.keys(obj2).filter((key) => !excludeKeys.includes(key));
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !isEqual(val1, val2, excludeKeys) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
}
function isObject(obj) {
  return obj != null && typeof obj === "object";
}

// src/utils/node/mdPlugins.ts
var import_meta = {};
function _require(module2) {
  return (typeof import_meta?.url !== "undefined" ? (0, import_module.createRequire)(import_meta.url) : require)(module2);
}
function getMarkdownPlugins(cfg) {
  const markdownPlugin = [];
  if (cfg?.tabs !== false) {
    markdownPlugin.push(tabsPlugin);
  }
  if (cfg?.mermaid !== false) {
    const { MermaidMarkdown } = _require("vitepress-plugin-mermaid");
    markdownPlugin.push(MermaidMarkdown);
  }
  if (cfg?.taskCheckbox !== false) {
    markdownPlugin.push(taskCheckboxPlugin(typeof cfg?.taskCheckbox === "boolean" ? {} : cfg?.taskCheckbox));
  }
  if (cfg?.timeline !== false) {
    markdownPlugin.push(import_vitepress_markdown_timeline.default);
  }
  return markdownPlugin;
}
function taskCheckboxPlugin(ops) {
  return (md) => {
    md.use(_require("markdown-it-task-checkbox"), ops);
  };
}
function registerMdPlugins(vpCfg, plugins) {
  if (plugins.length) {
    vpCfg.markdown = {
      config(...rest) {
        plugins.forEach((plugin) => {
          plugin?.(...rest);
        });
      }
    };
  }
}
function patchMermaidPluginCfg(config) {
  if (!config.vite.resolve)
    config.vite.resolve = {};
  if (!config.vite.resolve.alias)
    config.vite.resolve.alias = {};
  config.vite.resolve.alias = [
    ...aliasObjectToArray({
      ...config.vite.resolve.alias,
      "cytoscape/dist/cytoscape.umd.js": "cytoscape/dist/cytoscape.esm.js",
      "mermaid": "mermaid/dist/mermaid.esm.mjs"
    }),
    { find: /^dayjs\/(.*).js/, replacement: "dayjs/esm/$1" }
  ];
}
function patchOptimizeDeps(config) {
  if (!config.vite.optimizeDeps) {
    config.vite.optimizeDeps = {};
  }
  config.vite.optimizeDeps.exclude = ["vitepress-plugin-tabs", "@sugarat/theme"];
  config.vite.optimizeDeps.include = ["element-plus"];
}

// src/utils/node/theme.ts
var import_node_fs = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));
var import_node_process = __toESM(require("process"));
var import_fast_glob = __toESM(require("fast-glob"));
var import_theme_shared2 = require("@sugarat/theme-shared");

// src/utils/client/index.ts
function formatDate(d, fmt = "yyyy-MM-dd hh:mm:ss") {
  if (!(d instanceof Date)) {
    d = new Date(d);
  }
  const o = {
    "M+": d.getMonth() + 1,
    // 月份
    "d+": d.getDate(),
    // 日
    "h+": d.getHours(),
    // 小时
    "m+": d.getMinutes(),
    // 分
    "s+": d.getSeconds(),
    // 秒
    "q+": Math.floor((d.getMonth() + 3) / 3),
    // 季度
    "S": d.getMilliseconds()
    // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${d.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  }
  return fmt;
}

// src/utils/node/theme.ts
function patchDefaultThemeSideBar(cfg) {
  return cfg?.blog !== false && cfg?.recommend !== false ? {
    sidebar: [
      {
        text: "",
        items: []
      }
    ]
  } : void 0;
}
function getPageRoute(filepath, srcDir) {
  const route = (0, import_theme_shared2.normalizePath)(import_node_path2.default.relative(srcDir, filepath)).replace(/\.md$/, "");
  return `/${route}`;
}
var defaultTimeZoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset() / -60;
async function getArticleMeta(filepath, route, timeZone = defaultTimeZoneOffset) {
  const fileContent = await import_node_fs.default.promises.readFile(filepath, "utf-8");
  const { data: frontmatter, excerpt, content } = (0, import_theme_shared2.grayMatter)(fileContent, {
    excerpt: true
  });
  const meta = {
    ...frontmatter
  };
  if (!meta.title) {
    meta.title = (0, import_theme_shared2.getDefaultTitle)(content);
  }
  const date = await (meta.date && /* @__PURE__ */ new Date(`${new Date(meta.date).toUTCString()}+${timeZone}`) || (0, import_theme_shared2.getFileLastModifyTime)(filepath));
  meta.date = formatDate(date || /* @__PURE__ */ new Date());
  meta.categories = typeof meta.categories === "string" ? [meta.categories] : meta.categories;
  meta.tags = typeof meta.tags === "string" ? [meta.tags] : meta.tags;
  meta.tag = [meta.tag || []].flat().concat([
    .../* @__PURE__ */ new Set([...meta.categories || [], ...meta.tags || []])
  ]);
  meta.description = meta.description || (0, import_theme_shared2.getTextSummary)(content, 100) || excerpt;
  meta.cover = meta.cover ?? getFirstImagURLFromMD(fileContent, route);
  if (meta.publish === false) {
    meta.hidden = true;
    meta.recommend = false;
  }
  return meta;
}
async function getArticles(cfg, vpConfig) {
  const srcDir = cfg?.srcDir || vpConfig.srcDir.replace(vpConfig.root, "").replace(/^\//, "") || import_node_process.default.argv.slice(2)?.[1] || ".";
  const files = import_fast_glob.default.sync(`${srcDir}/**/*.md`, { ignore: ["node_modules"], absolute: true });
  const metaResults = files.reduce((prev, curr) => {
    const route = getPageRoute(curr, vpConfig.srcDir);
    const metaPromise = getArticleMeta(curr, route, cfg?.timeZone);
    prev[curr] = {
      route,
      metaPromise
    };
    return prev;
  }, {});
  const pageData = [];
  for (const file of files) {
    const { route, metaPromise } = metaResults[file];
    const meta = await metaPromise;
    if (meta.layout === "home") {
      continue;
    }
    pageData.push({
      route,
      meta
    });
  }
  return pageData;
}
function patchVPConfig(vpConfig, cfg) {
  vpConfig.head = vpConfig.head || [];
  if (cfg?.comment && "type" in cfg.comment && cfg?.comment?.type === "artalk") {
    const server = cfg.comment?.options?.server;
    if (server) {
      vpConfig.head.push(["link", { href: `${server}/dist/Artalk.css`, rel: "stylesheet" }]);
      vpConfig.head.push(["script", { src: `${server}/dist/Artalk.js`, id: "artalk-script" }]);
    }
  }
}
function patchVPThemeConfig(cfg, vpThemeConfig = {}) {
  vpThemeConfig.sidebar = patchDefaultThemeSideBar(cfg)?.sidebar;
  return vpThemeConfig;
}
function checkConfig(cfg) {
}

// src/utils/node/vitePlugins.ts
var import_node_path3 = __toESM(require("path"));
var import_node_fs2 = require("fs");
var import_node_buffer = require("buffer");
var import_vitepress_plugin_pagefind = require("vitepress-plugin-pagefind");
var import_vitepress_plugin_rss = require("vitepress-plugin-rss");
var import_theme_shared3 = require("@sugarat/theme-shared");

// src/utils/node/hot-reload-plugin.ts
function themeReloadPlugin() {
  let blogConfig;
  let vitepressConfig;
  let docsDir;
  const generateRoute = (filepath) => {
    return filepath.replace(docsDir, "").replace(".md", "");
  };
  return {
    name: "@sugarat/theme-reload",
    apply: "serve",
    configureServer(server) {
      const restart = debounce(() => {
        server.restart();
      }, 500);
      server.watcher.on("add", async (path4) => {
        const route = generateRoute(path4);
        const meta = await getArticleMeta(path4, route, blogConfig?.timeZone);
        blogConfig.pagesData.push({
          route,
          meta
        });
        restart();
      });
      server.watcher.on("change", async (path4) => {
        const route = generateRoute(path4);
        const meta = await getArticleMeta(path4, route, blogConfig?.timeZone);
        const matched = blogConfig.pagesData.find((v) => v.route === route);
        if (matched && !isEqual(matched.meta, meta, ["date", "description"])) {
          matched.meta = meta;
          restart();
        }
      });
      server.watcher.on("unlink", (path4) => {
        const route = generateRoute(path4);
        const idx = blogConfig.pagesData.findIndex((v) => v.route === route);
        if (idx >= 0) {
          blogConfig.pagesData.splice(idx, 1);
          restart();
        }
      });
    },
    configResolved(config) {
      vitepressConfig = config.vitepress;
      docsDir = vitepressConfig.srcDir;
      blogConfig = config.vitepress.site.themeConfig.blog;
    }
  };
}

// src/utils/node/vitePlugins.ts
function getVitePlugins(cfg = {}) {
  const plugins = [];
  plugins.push(coverImgTransform());
  if (cfg.themeColor) {
    plugins.push(setThemeScript(cfg.themeColor));
  }
  plugins.push(themeReloadPlugin());
  plugins.push(providePageData(cfg));
  if (cfg && cfg.search !== false) {
    const ops = cfg.search instanceof Object ? cfg.search : {};
    plugins.push(
      (0, import_vitepress_plugin_pagefind.pagefindPlugin)({
        ...ops
      })
    );
  }
  if (cfg?.mermaid !== false) {
    const { MermaidPlugin } = _require("vitepress-plugin-mermaid");
    plugins.push(inlineInjectMermaidClient());
    plugins.push(MermaidPlugin(cfg?.mermaid === true ? {} : cfg?.mermaid ?? {}));
  }
  if (cfg?.RSS) {
    ;
    [cfg?.RSS].flat().forEach((rssConfig) => plugins.push((0, import_vitepress_plugin_rss.RssPlugin)(rssConfig)));
  }
  return plugins;
}
function registerVitePlugins(vpCfg, plugins) {
  vpCfg.vite = {
    plugins
  };
}
function inlineInjectMermaidClient() {
  return {
    name: "@sugarat/theme-plugin-inline-inject-mermaid-client",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith("src/index.ts") && code.startsWith("// @sugarat/theme index")) {
        return code.replace("// replace-mermaid-import-code", "import Mermaid from 'vitepress-plugin-mermaid/Mermaid.vue'").replace("// replace-mermaid-mounted-code", "if (!ctx.app.component('Mermaid')) { ctx.app.component('Mermaid', Mermaid as any) }");
      }
      return code;
    }
  };
}
function coverImgTransform() {
  let blogConfig;
  let vitepressConfig;
  let assetsDir;
  return {
    name: "@sugarat/theme-plugin-cover-transform",
    apply: "build",
    enforce: "pre",
    configResolved(config) {
      vitepressConfig = config.vitepress;
      assetsDir = vitepressConfig.assetsDir;
      blogConfig = config.vitepress.site.themeConfig.blog;
    },
    async generateBundle(_, bundle) {
      const assetsMap = Object.entries(bundle).filter(([key]) => {
        return key.startsWith(assetsDir);
      }).map(([_2, value]) => {
        return value;
      });
      for (const page of blogConfig.pagesData) {
        const { cover } = page.meta;
        if (!cover?.startsWith?.("/")) {
          continue;
        }
        try {
          const realPath = import_node_path3.default.join(vitepressConfig.root, cover);
          if (!(0, import_node_fs2.existsSync)(realPath)) {
            continue;
          }
          const fileBuffer = (0, import_node_fs2.readFileSync)(realPath);
          const matchAsset = assetsMap.find((v) => import_node_buffer.Buffer.compare(fileBuffer, v.source) === 0);
          if (matchAsset) {
            page.meta.cover = (0, import_theme_shared3.joinPath)("/", matchAsset.fileName);
          }
        } catch (e) {
          vitepressConfig.logger.warn(e?.message);
        }
      }
    }
  };
}
function providePageData(cfg) {
  return {
    name: "@sugarat/theme-plugin-provide-page-data",
    async config(config) {
      const pagesData = await getArticles(cfg, config.vitepress);
      config.vitepress.site.themeConfig.blog.pagesData = pagesData;
    }
  };
}
function setThemeScript(themeColor) {
  let resolveConfig;
  const pluginOps = {
    name: "@sugarat/theme-plugin-theme-color-script",
    enforce: "pre",
    configResolved(config) {
      if (resolveConfig) {
        return;
      }
      resolveConfig = config;
      const vitepressConfig = config.vitepress;
      if (!vitepressConfig) {
        return;
      }
      const selfTransformHead = vitepressConfig.transformHead;
      vitepressConfig.transformHead = async (ctx) => {
        const selfHead = await Promise.resolve(selfTransformHead?.(ctx)) || [];
        return selfHead.concat([
          ["script", { type: "text/javascript" }, `;(function() {
            document.documentElement.setAttribute("theme", "${themeColor}");
          })()`]
        ]);
      };
    }
  };
  return pluginOps;
}

// src/node.ts
function getThemeConfig(cfg = {}) {
  checkConfig(cfg);
  cfg.mermaid = cfg.mermaid ?? false;
  const pagesData = [];
  const extraVPConfig = {
    vite: {}
  };
  const vitePlugins = getVitePlugins(cfg);
  registerVitePlugins(extraVPConfig, vitePlugins);
  const markdownPlugin = getMarkdownPlugins(cfg);
  registerMdPlugins(extraVPConfig, markdownPlugin);
  if (cfg?.mermaid !== false) {
    patchMermaidPluginCfg(extraVPConfig);
  }
  patchOptimizeDeps(extraVPConfig);
  patchVPConfig(extraVPConfig, cfg);
  return {
    themeConfig: {
      blog: {
        pagesData,
        ...cfg
      },
      // 补充一些额外的配置用于继承
      ...patchVPThemeConfig(cfg)
    },
    ...extraVPConfig
  };
}
function defineConfig(config) {
  return config;
}
function footerHTML(footerData) {
  const data = [footerData || []].flat();
  return data.map((d) => {
    const { icon, text, link } = d;
    return `<span class="footer-item">
    ${icon ? `<i>${icon}</i>` : ""}
    ${link ? `<a href="${link}" target="_blank" rel="noopener noreferrer">${text}</a>` : `<span>${text}</span>`}
</span>`;
  }).join("");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defineConfig,
  footerHTML,
  getThemeConfig,
  tabsMarkdownPlugin
});

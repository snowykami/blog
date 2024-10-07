"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogTheme = void 0;
// 主题独有配置
const node_1 = require("@sugarat/theme/node");
const friend_links_json_1 = __importDefault(require("./data/friend-links.json"));
const baseUrl = 'https://sfkm.me';
const RSS = {
    title: "Snowykami's Blog RSS",
    baseUrl,
    copyright: `Copyright (c) ${new Date().getFullYear()} Snowykami`,
    description: 'Snowykami的个人博客RSS订阅',
    language: 'zh-cn',
    favicon: 'https://sfkm.me/favicon.ico',
};
// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = (0, node_1.getThemeConfig)({
    timeline: true,
    // 开启RSS支持
    RSS,
    // 搜索
    // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
    // search: false,
    // markdown 图表支持（会增加一定的构建耗时）
    // mermaid: true
    // 页脚
    footer: [
        {
            version: false,
            copyright: {
                message: `${new Date().getFullYear()} Snowykami`,
                link: "https://github.com/snowykami/blog",
            },
            bottomMessage: [
                "Power by <a href='https://vitepress.dev/' target='_blank'>VitePress</a>  <a href='https://theme.sugarat.top/' target='_blank'>sugarat/theme</a>",
                "Serve by <a href='https://vercel.com' target='_blank'>Vercel</a> and <a href='https://github.com/liteyuki-flow' target='_blank'>liteyuki-flow</a>",
            ]
        }
    ],
    // 主题色修改
    themeColor: 'el-blue',
    // 文章默认作者
    author: 'Snowykami',
    comment: {
        repo: 'snowykami/blog',
        repoId: 'R_kgDOMupitg',
        category: 'Announcements',
        categoryId: 'DIC_kwDOMupits4Civ6i',
        inputPosition: 'top',
    },
    // 友链
    friend: {
        list: friend_links_json_1.default,
        limit: 6,
        random: true
    },
    // 公告
    popover: {
        mobileMinify: true,
        title: 'popover.title',
        body: [
            {
                type: 'button',
                content: 'popover.content.liteyukibotdev',
                link: 'https://bot.liteyuki.icu'
            },
        ],
        duration: 0
    },
});
exports.blogTheme = blogTheme;

// 主题独有配置
import {getThemeConfig} from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
import type {Theme} from '@sugarat/theme'
import friendLinkJson from './data/friend-links.json';
import {useData} from "vitepress";

const baseUrl = 'https://sfkm.me'
const RSS: Theme.RSSOptions = {
    title: "Snowykami's Blog RSS",
    baseUrl,
    copyright: `Copyright (c) ${new Date().getFullYear()} Snowykami`,
    description: 'Snowykami的个人博客RSS订阅',
    language: 'zh-cn',
    favicon: 'https://sfkm.me/favicon.ico',
}

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
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
                message: 'Snowykami',
                link: "https://github.com/snowykami/blog",
            },
            bottomMessage: [
                "Power by <a href='https://vitepress.dev/'>VitePress</a>",
                "Serve by <a href='https://vercel.com'>Vercel</a> and <a href='https://liteyuki.icu'>liteyuki-flow</a>",
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
        list: friendLinkJson,
        limit: 6,
        scrollSpeed:0,
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
})
export {blogTheme}

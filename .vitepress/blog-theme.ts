// 主题独有配置
import {getThemeConfig} from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
import type {Theme} from '@sugarat/theme'
import {getTextComputed, getTextRef} from "./utils/i18nRef";
import {getText} from "./utils/i18n";

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
                "Serve by Vercel and Liteyuki Cloud",
            ]
        }
    ],

    // 主题色修改
    themeColor: 'el-blue',

    // 文章默认作者
    author: 'Snowykami',

    // 友链
    friend: {
        limit: 6,
        list: [
            // github 头像地址 https://github.com/{username}.png?size=80
            // 高清 https://github.com/{username}.png
            {
                nickname: 'partnerLink.liteyukiIndexSite.nickname',
                des: 'partnerLink.liteyukiIndexSite.des',
                avatar: 'https://cdn.liteyuki.icu/static/img/liteyuki_icon_640.png',
                url: 'https://liteyuki.icu/',
            },
            {   // RedrockTeam
                nickname: 'partnerLink.redrockteam.nickname',
                des: 'partnerLink.redrockteam.des',
                avatar: 'https://gitlab.redrock.team/uploads/-/system/appearance/header_logo/1/Redrock.png',
                url: 'https://redrock.team/',
            },
            {   // 白鼠的小站
                nickname: 'partnerLink.cys2004.nickname',
                des: 'partnerLink.cys2004.des',
                avatar: 'https://github.com/cys2004.png',
                url: 'https://tcea.top/',
            },
            {   // 律回彼境
                nickname: 'partnerLink.aicorein.nickname',
                des: 'partnerLink.aicorein.des',
                avatar: 'https://github.com/aicorein.png',
                url: 'https://www.glowmem.com/',
            },
            {   // Dexera
                nickname: 'partnerLink.dexera.nickname',
                des: 'partnerLink.dexera.des',
                avatar: 'https://github.com/DexerMatters.png',
                url: 'https://dexera.online/',
            },
            {   // 音卡机器人
                nickname: 'partnerLink.inkarsuki.nickname',
                des: 'partnerLink.inkarsuki.des',
                avatar: 'https://github.com/HornCopper.png',
                url: 'https://tcea.top/',
            },
            {   // 饼干的blog
                nickname: 'partnerLink.lgc2333.nickname',
                des: 'partnerLink.lgc2333.des',
                avatar: 'https://github.com/lgc2333.png',
                url: 'https://blog.lgc2333.top/',
            },
            {   // EDream的小破站
                nickname: 'partnerLink.edream.nickname',
                des: 'partnerLink.edream.des',
                avatar: 'https://github.com/EDream.png',
                url: 'https://blog.edmc.cn/',
            },
            {   // 可爱就对了-西井
                nickname: 'partnerLink.Executor-Cheng.nickname',
                des: 'partnerLink.Executor-Cheng.des',
                avatar: 'https://github.com/Executor-Cheng.png',
                url: 'https://dream.day/',
            },
            {   // Viki写东西的地方
                nickname: 'partnerLink.vikiboss.nickname',
                des: 'partnerLink.vikiboss.des',
                avatar: 'https://github.com/vikiboss.png',
                url: 'https://viki.moe/',
            }
        ],
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

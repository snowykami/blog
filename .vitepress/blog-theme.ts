// 主题独有配置
import {getThemeConfig} from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '粥里有勺糖',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 粥里有勺糖',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
    // 开启RSS支持
    // RSS,

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
                link: "https://snowykami.github.io/",
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
    friend: [
        {
            nickname: '轻雪索引站',
            des: '轻雪相关内容及友链索引',
            avatar: 'https://cdn.liteyuki.icu/static/img/liteyuki_icon_640.png',
            url: 'https://liteyuki.icu/',
        }
    ],

    // 公告
    popover: {
        title: '动态',
        body: [
            // { type: 'text', content: '👇公众号👇---👇 微信 👇' },
            // {
            //   type: 'image',
            //   src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210~fmt.webp'
            // },
            // {
            //   type: 'text',
            //   content: '欢迎大家加群&私信交流'
            // },
            // {
            //   type: 'text',
            //   content: '文章首/文尾有群二维码',
            //   style: 'padding-top:0'
            // },
            {
              type: 'button',
              content: '轻雪机器人开发...',
              link: 'https://bot.lieyuki.icu'
            },
            // {
            //   type: 'button',
            //   content: '加群交流',
            //   props: {
            //     type: 'success'
            //   },
            //   link: 'https://theme.sugarat.top/group.html',
            // }
        ],
        duration: 0
    },
})

export {blogTheme}

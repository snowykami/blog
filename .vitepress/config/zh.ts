import {defineConfig} from 'vitepress'
import {ThemeConfig} from "./utils";

export const zh = defineConfig({
    lang: "zh-Hans",
    title: "Snowykami",
    description: "Snowykami's blog",
    themeConfig: {
        nav: [
            {text: '文章及内容', link: '/post'},
            {text: '趋势及动态', link: '/trend'},
            {text: '关于及联络', link: '/about'},
        ],
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        editLink: ThemeConfig.getEditLink(
            '在 GitHub 上编辑这页',
        ),
        footer: {
            message: '由 <a href="https://vitepress.dev/">VitePress</a> 构建 | 服务由 <a href="https://liteyuki.icu">Liteyuki Cloud</a> 提供',
            copyright: ThemeConfig.copyright
        },
        outline: ThemeConfig.getOutLine("页面内容"),

        langMenuLabel: '语言',
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '轻色模式',
        darkModeSwitchTitle: '深色模式',
    },
})
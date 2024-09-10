import {defineConfig} from 'vitepress'
import {ThemeConfig} from "./utils";

export const en = defineConfig({
    lang: "en-US",
    title: "Snowykami",
    description: "Snowykami's blog",
    themeConfig: {
        nav: [
            {text: 'Posts', link: '/post'},
            {text: 'Trends', link: '/trend'},
            {text: 'About', link: '/about'},
        ],
        docFooter: {
            prev: 'Prev page',
            next: 'Next page'
        },
        editLink: ThemeConfig.getEditLink(
            'Edit this page on GitHub',
        ),
        footer: {
            message: 'Built by <a href="https://vitepress.dev/">VitePress</a> | Service provided by <a href="https://liteyuki.icu">Liteyuki Cloud</a>',
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
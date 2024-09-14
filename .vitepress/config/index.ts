import {defineConfig} from 'vitepress'

// 导入主题的配置
import {blogTheme} from '../blog-theme'
import {socialLinks} from "./data";

import {zh} from "./zh";
import {en} from "./en";

const defaultLocaleRouter = 'zh'

export default defineConfig({
    extends: blogTheme,
    // base,
    rewrites: {
        [`${defaultLocaleRouter}/:rest*`]: ':rest*',
    },
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],
    themeConfig: {
        socialLinks: socialLinks,
    },
    lastUpdated: true,
    locales: {
        root: {
            label: '简体中文',
            ...zh,
        },
        en: {
            label: 'English',
            ...en
        }
    }
})

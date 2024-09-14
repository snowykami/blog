import {defineConfig} from 'vitepress'
// 导入主题的配置
import {blogTheme} from '../blog-theme'
import {socialLinks} from "./data";

import {zh} from "./zh";
import {en} from "./en";

const defaultLocaleRouter = 'en'    // 修改后记得修改语言路由

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
        zh: {
            label: '简体中文',
            ...zh,
        },
        root: {
            label: 'English',
            ...en
        }
    }
})

import {loadLangData} from "./i18nConf";
loadLangData()  // 加载语言们
import {defineConfig} from 'vitepress'
// 导入主题的配置
import {blogTheme} from '../blog-theme'
import {socialLinks} from "./data";
import {zh} from "./zh";
import {en} from "./en";
import {defaultLang} from "../sugarat/theme/src/composables/config/i18n";

export default defineConfig({
    extends: blogTheme,
    // base,
    rewrites: {
        [`${defaultLang}/:rest*`]: ':rest*',
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

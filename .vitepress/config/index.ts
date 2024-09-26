import {defineConfig} from 'vitepress'
import {blogTheme} from '../blog-theme'
import {socialLinks} from "./data";

import {zh} from "./zh";
import {en} from "./en";
import {defaultLang} from "../sugarat/theme/src/composables/config/i18n";


export default defineConfig({
    ignoreDeadLinks: true,
    extends: blogTheme,
    // base,
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],
    themeConfig: {
        socialLinks: socialLinks,
    },
    cleanUrls: true,
    srcExclude: ["README.md"],
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
    },
})

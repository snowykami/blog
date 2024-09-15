import {defineConfig} from 'vitepress'
import {getText} from "../sugarat/theme/src/composables/config/i18n";
import {ThemeConfig, getNav} from "../utils/themeConfig";

const lang = 'en'
export const en  = defineConfig({
    lang: 'en',
    title: "Snowykami",
    description: "Snowykami's blog",
    themeConfig: {
        outline: {
            level: [2, 3],
            label: getText(lang, 'directory')
        },
        returnToTopLabel: getText(lang, 'backToTop'),
        sidebarMenuLabel: getText(lang, 'relatedArticles'),
        logo: 'https://q.qlogo.cn/g?b=qq&nk=2751454815&s=640',
        editLink: ThemeConfig.getEditLink(getText(lang, 'editPage')),
        nav: getNav(lang),
    }
})
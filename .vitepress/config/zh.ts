import {defineConfig} from 'vitepress'
import {getText} from "../utils/i18n";
import {ThemeConfig} from "../utils/themeConfig";

const lang = 'zh'
export const zh  = defineConfig({
    lang: 'zh-cn',
    title: "Snowykami",
    description: "Snowykami的博客",
    themeConfig: {
        outline: {
            level: [2, 3],
            label: getText(lang, 'directory')
        },
        returnToTopLabel: getText(lang, 'backToTop'),
        sidebarMenuLabel: getText(lang, 'relatedArticles'),
        logo: 'https://q.qlogo.cn/g?b=qq&nk=2751454815&s=640',
        editLink: ThemeConfig.getEditLink(getText(lang, 'editPage')),
        nav: [
            {text: getText(lang, 'homepage'), link: '/'},
            {text: getText(lang, 'about'), link: './about'}
        ],
    }
})
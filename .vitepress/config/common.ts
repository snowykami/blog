// 共有配置项，导入index用

import {defineConfig} from 'vitepress'
import {generateSidebar} from 'vitepress-sidebar';
import {socialLinks} from "./data";
import {zh} from "./zh";
import {en} from "./en";

let defaultLocale = 'zh';
const commonSidebarOptions = {
    collapsed: true,
    convertSameNameSubFileToGroupIndexPage: true,
    useTitleFromFrontmatter: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    includeFolderIndexFile: true,
    sortMenusByFrontmatterOrder: true,
    rootGroupText: 'Blog',
}

/**
 * Generate sidebar config
 * multiple languages and sections
 * @returns {any[]}
 */
function generateSidebarConfig(): any[] {
    let sections = ["about", "post", "trend"]
    let languages = ['zh', 'en']
    let ret = []
    for (let language of languages) {
        for (let section of sections) {
            if (language === defaultLocale) {
                ret.push({
                    basePath: `/${section}/`,
                    scanStartPath: `${language}/${section}`,
                    resolvePath: `/${section}/`,
                    ...commonSidebarOptions
                })
            } else {
                ret.push({
                    basePath: `/${language}/${section}/`,
                    scanStartPath: `${language}/${section}`,
                    resolvePath: `/${language}/${section}/`,
                    ...commonSidebarOptions
                })
            }
        }
    }
    return ret
}

console.log(generateSidebarConfig())

// @ts-ignore
export const common = defineConfig({
    head: [
        // 配置favicon.ico
        ['link', {rel: 'icon', type: 'image/x-icon', href: 'favicon.ico'}],
        ['link', {
            rel: 'stylesheet',
            href: 'https://fonts.font.im/css?family=Cousine:400,400i,700,700i|Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'
        }],
    ],
    rewrites: {
        [`${defaultLocale}/:rest*`]: ":rest*",
    },
    themeConfig: {
        logo: {
            light: 'https://q.qlogo.cn/g?b=qq&nk=2751454815&s=640',
            dark: 'https://q.qlogo.cn/g?b=qq&nk=2751454815&s=640',
            alt: 'LiteyukiBot Logo'
        },
        sidebar: generateSidebar(
            [
                ...generateSidebarConfig()
            ]
        ),
        socialLinks: socialLinks,
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索内容',
                                buttonAriaLabel: '打开搜索框',
                            },
                            modal: {
                                noResultsText: '没有找到搜索结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                }
                            }
                        },
                    },
                    en: {
                        translations: {
                            button: {
                                buttonText: 'Search',
                                buttonAriaLabel: 'Search',
                            },
                            modal: {
                                noResultsText: 'No results found',
                                resetButtonTitle: 'Reset search query',
                                footer: {
                                    selectText: 'Select',
                                    navigateText: 'Navigate',
                                }
                            }
                        }
                    },
                }
            }
        }
    },
    sitemap: {
        hostname: 'https://bot.liteyuki.icu'
    },
    lastUpdated: true,
    locales: {
        root: {label: "简体中文", ...zh},
        en: {label: "English", ...en},
    },

})
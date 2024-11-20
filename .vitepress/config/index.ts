import { defineConfig } from 'vitepress'
import { blogTheme } from '../blog-theme'
import { socialLinks } from "./data";

import { zh } from "./zh";
import { en } from "./en";

import { withMermaid } from "vitepress-plugin-mermaid";

const config = defineConfig({
    ignoreDeadLinks: true,
    extends: blogTheme,
    // base,
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
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

export default withMermaid(
    {
        ...config,
        mermaid: {},
        mermaidPlugin: {}
    }

)
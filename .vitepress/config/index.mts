import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from '../blog-theme'
import {socialLinks} from "./data";

// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: blogTheme,
  // base,
  lang: 'zh-cn',
  title: "Snowykami",
  description: "Snowykami's blog",
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',

    logo: 'https://q.qlogo.cn/g?b=qq&nk=2751454815&s=640',
    editLink: {
      text: '于 Github 上编辑这页'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '关于作者', link: './about' }
    ],
    socialLinks: socialLinks
  }
})

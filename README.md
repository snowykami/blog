# Snowykami's Blog

## 介绍
- 平时写点东西什么的

## 使用工具
- 博客使用主题：[@sugarat/theme](https://atqq.github.io/vitepress-blog-sugar-template/)
- 构建工具：[VitePress](https://vitepress.dev/)
- 部分后端服务由[轻雪云 Liteyuki Cloud](https://liteyuki.icu)提供

## 注意
- 该博客的路由中文重写有稀奇古怪的问题，所以我在[sugarat/theme/src/utils/client/index.ts](./.vitepress/sugarat/theme/src/utils/client/index.ts#L179)生成路由链接时进行了手动重写

## 友链申请
- 添加友链请准备以下内容
  - 网站标题：中英
  - 网站描述：中英
  - 网站链接：仅https协议
  - 网站图链：仅https协议
- fork一份本仓库到自己所用账户下
- 而后，在[blog-theme.ts](https://github.com/snowykami/blog/blob/main/.vitepress/blog-theme.ts)中的friend部分参照已有元素进行列表追加
- 而后，在[i18n.ts](https://github.com/snowykami/blog/blob/main/sugarat/theme/src/composables/config/i18n.ts)中参照已有元素追加网页标题和描述的多语言文本
- 最后提交，拉取请求，等待合并后自动构建

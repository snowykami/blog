---
title: 轻雪机器人 LiteyukiBot
description: 一个高性能、轻量级的聊天机器人应用程序，基于LiteyukiBot框架
---

# 轻雪机器人

- [轻雪主页地址](https://bot.liteyuki.icu/)
- [轻雪GitHub储存库](https://github.com/LiteyukiStudio/LiteyukiBot)
- [轻雪官方Git储存库](https://git.liteyuki.icu/LiteyukiStudio/LiteyukiBot)

## 起源

轻雪机器人项目于 **2021年10月5日** 启动。最初仅为满足雪萤工坊的一些简单业务需求。那时，QQ机器人非常新奇，因此我萌生了开发一个简单问答与涩图功能的机器人，并使用 **Mirai** 作为协议端。随后，在十一月，我加入了一些个人定制功能，并迁移至 **NoneBot1**，同时添加了邮箱验证功能来限流。

## 发展历程

### 2022年1月 - v1 版本
引入了一些查询功能，如天气、疫情、地址等，新增翻译和语音合成功能。同年2月，项目开源到GitHub，并通过插件对接QQ自带的AI功能。

### 2022年2月 - v2 版本
开始模块化拆分机器人的功能，提升了用户自定义功能的灵活性，并迁移到 **NoneBot2**，采用新的插件系统，使得机器人更加丰富且稳定。

### 2022年3-5月 - v3 版本
进行了全面重构，优化了机器人响应的美观度，加入音乐、诗词等新功能。同时，也吸引了新贡献者，使得功能更加完善。

### 2022年6月
由于时间大量投入某国产游戏，导致项目更新放缓直至暂停。

### 2022年9月 - 高三开始
随着高三的学习压力增加，机器人项目的代码积累逐渐变得难以维护。11月，引入了原神相关功能，如角色信息查询、队伍信息、抽卡模拟器等。

### 2022年11月 - v4 版本
因疫情封校，我的父母给我送来了笔记本与平板，帮助我继续开发轻雪机器人。v4 版本增加了多语言支持，灵感来源于 **Minecraft** 的多语言实现。

### 2023年1-6月 - v4.3 版本
由于备战高考，开发进度放缓，仅进行少量稳定性修复。

### 2023年9月 - v5 版本
重启项目，剥离高度耦合的功能模块，并引入本地化与国际化支持，进行全面重构。

### 2023年10月
因 **Tencent** 加大对第三方协议端的打压，许多QQ协议端无法正常工作，项目陷入停滞。12月，我清空了代码库。

### 2024年1月 - v6 最新版本
了解到新的实现端 [Lagrange](https://lagrangedev.github.io/Lagrange.Doc/)，使得开发得以继续。v6 是目前的长期支持版本，采用滚动更新机制，构建了轻雪框架用于插件管理，并推出插件市场和资源包机制，支持高度自定义化。

轻雪框架也为未来的分布式和微服务架构预留了空间，并可兼容任意 **Python** 机器人框架，甚至可以作为插件运行在其他框架中。目前框架集成在轻雪机器人内，也已发布至 **PyPi**，供开发者定制使用。

## 未来展望

轻雪框架目前是一个Bot管理框架，未来将会引入更完善的会话支持，以便于Bot之间的通信，并逐步实现分布式与微服务架构。项目虽然是个人兴趣驱动，但我将尽可能保持稳定更新，欢迎感兴趣的朋友参与贡献或提出建议。

## 总结

轻雪机器人项目自 **2021年10月5日** 开始，至今已持续了 {{Math.floor((new Date() - new Date("2021-10-05")) / (1000 * 60 * 60 * 24))}} 天。通过这个项目，我学到了许多技术，结识了许多志同道合的朋友，并且有了一些贡献者共同协作。这种合作开发的感觉非常棒。

为了更好地维护与开发轻雪项目，我们从雪萤工坊分离出一个小工作室——[轻雪工作室(Liteyuki Studio)](https://liteyuki.icu)，专注于维护和开发开源项目。

## 其他

- 更多信息请访问轻雪主页：[bot.liteyuki.icu](https://bot.liteyuki.icu)
- 了解轻雪工作室：[Liteyuki Studio](https://liteyuki.icu)

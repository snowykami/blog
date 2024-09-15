export const defaultLang = 'en'

const i18nData: Record<string, Record<string, string>> = {
    en: {
        // UITextArea
        "article.countOfChar": "Count of char(s)",
        "article.charCount": " char(s)",
        "article.needTime": "Need",
        "article.takeTime": " minute(s) to read",
        "article.charsOfArticle": " char(s) of article",
        "article.expectedTime": "Expected time",
        "article.author": "Author",
        "article.publishTime": "Publish time",
        "article.editTime": "Edit time",
        "article.tags": "Tags",
        "friendLink.title": "Partner links",
        "homeTags.title": "Tags",
        "hotArticle.change": "Change",
        "hotArticle.nothing": "Nothing",
        "hotArticle.title": "Hot Article(s)",
        "overview.articles": "Article(s)",
        "overview.monthUpdate": "This month",
        "overview.weekUpdate": "This week",
        "popover.title": "Notice(s)",
        "recommendArticle.empty": "Nothing",
        "recommendArticle.nextText": "Next",
        "recommendArticle.title": "Recommend",
        "time.secondsAgo": " second(s) ago",
        "time.minutesAgo": " minute(s) ago",
        "time.hoursAgo": " hour(s) ago",
        "time.daysAgo": " day(s) ago",
        "time.justNow": "just now",
        // ValueTextArea
        "popover.content.liteyukibotdev": "LiteyukiBot Development",

    },
    zh: {
        // UITextArea
        "article.countOfChar": "字数",
        "article.charCount": " 个字",
        "article.needTime": " 预计",
        "article.takeTime": " 分钟",
        "article.charsOfArticle": " 文章字数",
        "article.expectedTime": "预计阅读时间",
        "article.author": "作者",
        "article.publishTime": "发布时间",
        "article.editTime": "编辑时间",
        "article.tags": "标签",
        "friendLink.title": "友情链接",
        "homeTags.title": "标签",
        "hotArticle.change": "换一组",
        "hotArticle.nothing": "暂无内容",
        "hotArticle.title": "热门文章",
        "overview.articles": "文章",
        "overview.monthUpdate": "月更",
        "overview.weekUpdate": "周更",
        "popover.title": "公告",
        "recommendArticle.empty": "暂无内容",
        "recommendArticle.nextText": "换一组",
        "recommendArticle.title": "推荐",
        "time.secondsAgo": "秒前",
        "time.minutesAgo": "分钟前",
        "time.hoursAgo": "小时前",
        "time.daysAgo": "天前",
        "time.justNow": "刚刚",
        // ValueTextArea
        "popover.content.liteyukibotdev": "轻雪机器人开发",

    }
}
// import friendLinksJson from '../../../../../data/i18n/friend-links-i18n.json'
// import friendLinksJson from '../../../../../data/i18n/friend-links-i18n.json'
// extendData(friendLinksJson)
export function formatLangRouter(lang: string) {
    if (lang.includes('zh')) {
        return 'zh'
    } else {
        return 'en'
    }
}


export function getText(lang: string, key: string): string {
    lang = formatLangRouter(lang);
    return i18nData[lang][key];
}


export function setText(lang: string, key: string, value: string): void {
    lang = formatLangRouter(lang);
    // 判断是否存在该语言
    if (!i18nData[lang]) {
        i18nData[lang] = {};
    }
    i18nData[lang][key] = value
}

export function extendLangData(lang: string, data: Record<string, string>): void {
    lang = formatLangRouter(lang);
    for (let key in data) {
        setText(lang, key, data[key]);
    }
}

export function extendData(data: Record<string, Record<string, string>>): void {
    for (let lang in data) {
        extendLangData(lang, data[lang]);
    }
}
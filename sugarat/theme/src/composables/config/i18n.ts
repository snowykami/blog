import {useData} from "vitepress";

const i18nData: Record<string, Record<string, string>> = {
    en: {
        "friendLink.title": "Partner links",
        "homeTags.title": "Tags",
        "hotArticle.change": "Change",
        "hotArticle.nothing": "Nothing",
        "hotArticle.title": "Hot Articles",
        "overview.articles": "Article",
        "overview.monthUpdate": "This Month",
        "overview.weekUpdate": "This Week",
        "popover.title": "Notice",
        "time.secondsAgo": " seconds ago",
        "time.minutesAgo": " minutes ago",
        "time.hoursAgo": " hours ago",
        "time.daysAgo": " days ago",
        "time.justNow": "just now",
    },
    zh: {
        "friendLink.title": "友情链接",
        "homeTags.title": "标签",
        "hotArticle.change": "换一组",
        "hotArticle.nothing": "暂无内容",
        "hotArticle.title": "热门文章",
        "overview.articles": "文章",
        "overview.monthUpdate": "月更",
        "overview.weekUpdate": "周更",
        "popover.title": "公告",
        "time.secondsAgo": "秒前",
        "time.minutesAgo": "分钟前",
        "time.hoursAgo": "小时前",
        "time.daysAgo": "天前",
        "time.justNow": "刚刚",
    }
}

let refData = {}

export function formatLangRouter(lang: string) {
    if (lang.includes('zh')) {
        return 'zh'
    } else {
        return 'en'
    }
}


function getText(lang: string, key: string): string {
    lang = formatLangRouter(lang);
    return i18nData[lang][key];
}

export function updateRefData() {
    const lang = formatLangRouter(useData().site.value.lang);
    for (let key in refData) {
        refData[key].value = getText(lang, key);
    }
}

export function getTextRef(key: string): any {
    const lang = formatLangRouter(useData().site.value.lang);
    refData[key] = getText(lang, key);
    return refData[key] || key;
}
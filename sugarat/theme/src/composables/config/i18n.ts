import {useData} from "vitepress";

const i18nData: Record<string, Record<string, string>> = {
    en: {
        // UITextArea
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
        "partnerLink.liteyukiIndexSite.nickname": "Liteyuki Index Site",
        "partnerLink.liteyukiIndexSite.des": "Liteyuki and Relative Contents Index Site",
        "partnerLink.redrockteam.nickname": "RedrockTeam",
        "partnerLink.redrockteam.des": "RedrockTeam's Official Site",
        "partnerLink.cys2004.nickname": "Cysnies's mini-site",
        "partnerLink.cys2004.des": "Cys2004's Site",
        "partnerLink.aicorein.nickname": "MelodyEchoes Realm",
        "partnerLink.aicorein.des": "MelodyEcho's Site",
        "partnerLink.dexera.nickname": "Dexera",
        "partnerLink.dexera.des": "Dexera's Site",
        "partnerLink.inkarsuki.nickname": "Inkarsuki Bot",
        "partnerLink.inkarsuki.des": "A jx3 bot",
        "partnerLink.lgc2333.nickname": "Student_2333's Blog",
        "partnerLink.lgc2333.des": "Lgc2333's Blog",
        "partnerLink.edream.nickname": "EDream's mini-site",
        "partnerLink.edream.des": "EDream's Blog",
        "partnerLink.Executor-Cheng.nickname": "Kawaii just Right!",
        "partnerLink.Executor-Cheng.des": "Executor-Cheng's Site",
        "partnerLink.vikiboss.nickname": "Viki's writing spot",
        "partnerLink.vikiboss.des": "Vikiboss's Site",
    },
    zh: {
        // UITextArea
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
        "partnerLink.liteyukiIndexSite.nickname": "轻雪索引站",
        "partnerLink.liteyukiIndexSite.des": "轻雪及相关内容索引站",
        "partnerLink.redrockteam.nickname": "红岩网校",
        "partnerLink.redrockteam.des": "红岩网校官方主页",
        "partnerLink.cys2004.nickname": "白鼠的小站",
        "partnerLink.cys2004.des": "白鼠的小站",
        "partnerLink.aicorein.nickname": "律回彼境",
        "partnerLink.aicorein.des": "律回彼境",
        "partnerLink.dexera.nickname": "Dexera",
        "partnerLink.dexera.des": "Dexera",
        "partnerLink.inkarsuki.nickname": "音卡机器人",
        "partnerLink.inkarsuki.des": "一个主要围绕剑网三相关业务进行开发的多功能聊天机器人项目",
        "partnerLink.lgc2333.nickname": "饼干的blog",
        "partnerLink.lgc2333.des": "饼干的blog",
        "partnerLink.edream.nickname": "EDream的小破站",
        "partnerLink.edream.des": "EDream的小破站",
        "partnerLink.Executor-Cheng.nickname": "可爱就对了",
        "partnerLink.Executor-Cheng.des": "西井姐姐的个人主页",
        "partnerLink.vikiboss.nickname": "Viki写东西的地方",
        "partnerLink.vikiboss.des": "Viki写东西的地方",
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
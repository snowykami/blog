const defaultLang = 'zh';

export const i18nData = {
    en: {
        about: 'About',
        backToTop: 'Back to top',
        directory: 'Directory',
        editPage: 'Edit this page on Github',
        homepage: 'Home',
        relatedArticles: 'Related articles',
        trends: 'Trends',
        "lang.simplefiedChinese": "Simplefied Chinese",
        "lang.english": "English",
        "temp.notice.liteyukibotdev.content": "Liteyuki Bot Development",

    },
    zh: {
        about: '关于',
        backToTop: '回到顶部',
        directory: '目录',
        editPage: '在 Github 上编辑这页',
        homepage: '首页',
        relatedArticles: '相关文章',
        trends: '趋势',
        "lang.simplefiedChinese": "简体中文",
        "lang.english": "英语",
        "temp.notice.liteyukibotdev.content": "轻雪机器人开发",
    }
}


export function getText(lang: string, key: string): string {
    lang = formatLang(lang);
    return i18nData[lang][key];
}

export function setText(lang: string, key: string, value: string): void {
    lang = formatLang(lang);
    // 判断是否存在该语言
    if (!i18nData[lang]) {
        i18nData[lang] = {};
    }
    i18nData[lang][key] = value
}

export function extendLangData(lang: string, data: Record<string, string>): void {
    lang = formatLang(lang);
    for (let key in data) {
        setText(lang, key, data[key]);
    }
}

export function formatLang(lang: string): string {
    if (lang.includes('-')) {
        return lang.split('-')[0];
    }
    return lang;
}

export function getNav(lang: string): { text: string, link: string }[] {
    if (lang == defaultLang) {
        return [
            {text: getText(lang, 'homepage'), link: '/'},
            {text: getText(lang, 'about'), link: '/about'}
        ]
    } else {
        return [
            {text: getText(lang, 'homepage'), link: `/${lang}/`},
            {text: getText(lang, 'about'), link: `/${lang}/about`}
        ]
    }
}
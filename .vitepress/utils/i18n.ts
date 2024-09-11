const defaultLang = 'zh';

const i18nData = {
    en: {
        about: 'About',
        backToTop: 'Back to top',
        directory: 'Directory',
        editPage: 'Edit this page on Github',
        homepage: 'Home',
        relatedArticles: 'Related articles',
        trends: 'Trends',

    },
    zh: {
        about: '关于',
        backToTop: '回到顶部',
        directory: '目录',
        editPage: '在 Github 上编辑这页',
        homepage: '首页',
        relatedArticles: '相关文章',
        trends: '趋势',

    }
}


export function getText(lang: string, key: string): string {
    lang = formatLang(lang);
    return i18nData[lang][key];
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
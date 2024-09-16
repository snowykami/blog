import {defaultLang, getText} from "../sugarat/theme/src/composables/config/i18n";
import {Theme} from "@sugarat/theme";

export const ThemeConfig = {
    getEditLink: (editPageText: string): { pattern: (params: { filePath: string; }) => string; text: string; } => {
        return {
            pattern: ({filePath}: { filePath: string; }): string => {
                // 匹配 /dev/api或 /{lang}/dev/api
                return `https://github.com/snowykami/blog/tree/main/${filePath}`
            },
            text: editPageText
        };
    },
    getOutLine: (label: string): { label: string; level: [number, number]; } => {
        return {
            label: label,
            level: [2, 6]
        };
    },
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
import {extendLangData, formatLangRouter, getText} from "./i18n";
import {useData} from "vitepress";

let refData = {}
export function getTextRef(key: string, extendData: Record<string, Record<string, string>> | null = null): any {
    if (extendData) {
        for (let lang in extendData) {
            extendLangData(lang, extendData[lang])
        }
    }
    const lang = formatLangRouter(useData().site.value.lang);
    refData[key] = getText(lang, key);
    return refData[key] || key;
}
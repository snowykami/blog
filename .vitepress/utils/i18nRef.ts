import {useData} from "vitepress";
import {getText, formatLang} from "./i18n";

let refData = {}
export function updateRefData() {
    const lang = formatLang(useData().site.value.lang);
    for (let key in refData) {
        refData[key].value = getText(lang, key);
    }
}

export function getTextRef(key: string): any {
    const lang = formatLang(useData().site.value.lang);
    refData[key] = getText(lang, key);
    return refData[key]
}
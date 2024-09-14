import {useData} from "vitepress";
import {getText, formatLang, extendLangData} from "./i18n";
import {computed} from "vue";
import {formatLangRouter} from "../../sugarat/theme/src/composables/config/i18n";

let refData = {}
export function updateRefData() {
    const lang = formatLang(useData().site.value.lang);
    for (let key in refData) {
        refData[key].value = getText(lang, key);
    }
}

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

export function getTextComputed(key: string): any {
    return computed(() => getTextRef(key).value)
}
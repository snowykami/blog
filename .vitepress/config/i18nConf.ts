import {extendData} from "../sugarat/theme/src/composables/config/i18n";

import friendLinksI18n from "../data/i18n/friend-links-i18n.json";

export function loadLangData(){
    extendData(friendLinksI18n)
}
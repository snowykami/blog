<script lang="ts" setup>
import {ElAvatar} from 'element-plus'
import {useDark, useIntervalFn} from '@vueuse/core'
import {computed, onMounted, onUnmounted, ref} from 'vue'
import Swiper from 'swiper'
import {useBlogConfig} from '../composables/config/blog'
import {getImageUrl, shuffleArray} from '../utils/client'
import type {Theme} from '../'
import {friendLinkSvgStr} from '../constants/svg'
import {getTextRef} from "../composables/config/i18nRef";
import {extendData, formatLangRouter} from "../composables/config/i18n";
import {string} from "fast-glob/out/utils";
import {useData} from "vitepress";

const isDark = useDark({
    storageKey: 'vitepress-theme-appearance'
})

const {friend} = useBlogConfig()
const friendConfig = computed<Theme.FriendConfig>(() => ({
    list: [],
    random: false,
    limit: Number.MAX_SAFE_INTEGER,
    title: `${friendLinkSvgStr}${getTextRef("friendLink.title")}`,
    ...(Array.isArray(friend) ? {list: friend} : friend)
}))

const limit = computed(() => {
    const {limit} = friendConfig.value
    return (!limit || limit <= 0) ? 0 : limit || Number.MAX_SAFE_INTEGER
})

const scrollSpeed = computed(() => {
    const {scrollSpeed} = friendConfig.value
    return scrollSpeed ?? 1500
})

const openScroll = computed(() => {
    return scrollSpeed.value > 0 && limit.value < friendConfig.value.list.length
})

const friendList = computed(() => {
    const data = [...friendConfig.value.list]
    // 简单的随机打乱
    if (friendConfig.value.random) {
        data.splice(0, data.length, ...shuffleArray(data))
    }

    // 展示个数限制，删除多余的
    if (scrollSpeed.value === 0 && limit.value) {
        data.splice(limit.value)
    }
    const list = data.map((v) => {
        const {avatar, nickname} = v
        const avatarUrl = getImageUrl(avatar, isDark.value)
        let alt = nickname
        if (typeof avatar !== 'string') {
            alt = avatar.alt || ''
        }

        return {
            ...v,
            avatar: avatarUrl,
            alt
        }
    })
    return list
})

const cardHeight = 76
const scrollWrapperHeight = computed(() => {
    return openScroll.value ? limit.value * cardHeight : 0
})
const containerHeight = computed(() => {
    return scrollWrapperHeight.value ? `${scrollWrapperHeight.value}px` : 'auto'
})

const swiper = ref<Swiper>()
const {resume, pause} = useIntervalFn(() => {
    swiper.value?.slideNext()
}, scrollSpeed.value)

onMounted(() => {
    pause()
    if (openScroll.value) {
        // eslint-disable-next-line no-new
        swiper.value = new Swiper('.scroll-wrapper', {
            direction: 'vertical',
            slidesPerView: limit.value,
            loop: true,
        })
        resume()
    }
})

onUnmounted(() => {
    pause()
})


const i18nData = {
    "zh": {
        "friendLink.name": "网站名称",
        "friendLink.des": "网站描述",
        "friendLink.url": "网站链接",
        "friendLink.icon": "网站图标",
        "friendLink.close": "关闭",
        "friendLink.submit": "提交",
    },
    "en": {
        "friendLink.name": "Website Name",
        "friendLink.des": "Website Description",
        "friendLink.url": "Website Link",
        "friendLink.icon": "Website Icon",
        "friendLink.close": "Close",
        "friendLink.submit": "Submit",
    }
}
extendData(i18nData)
const optionsHint = [
    {
        name: "name",
        text: getTextRef('friendLink.name'),
    },
    {
        name: "des",
        text: getTextRef('friendLink.des'),
    },
    {
        name: "url",
        text: getTextRef('friendLink.url'),
    },
    {
        name: "icon",
        text: getTextRef('friendLink.icon'),
    }
]
let options = ref({
    name: "",
    des: "",
    url: "",
    icon: "",
    lang: formatLangRouter(useData().lang.value)
})

const isWindowOpen = ref(false)

function openWindow() {
    isWindowOpen.value = true
}

function closeWindow() {
    isWindowOpen.value = false
}

const owner = "snowykami"
const repo = "blog"

function getSkipUrl(): string {
    const titleString = encodeURI(`Friend Link Request: ${options.value.name}`)
    const bodyJsonString = encodeURI(JSON.stringify(options.value, null, 4))
    return `https://github.com/${owner}/${repo}/issues/new?title=${titleString}&body=${bodyJsonString}`
}

</script>

<template>
    <div v-if="friendList?.length" class="card friend-wrapper">
        <!-- 头部 -->
        <div class="card-header">
            <span class="title svg-icon" v-html="friendConfig.title"/>
        </div>
        <!-- 友链列表 -->
        <div
            class="scroll-wrapper" :style="{
        height: containerHeight,
      }"
        >
            <ol class="friend-list swiper-wrapper">
                <li v-for=" (v, idx) in friendList" :key="idx" class="swiper-slide">
                    <a :href="v.url" target="_blank">
                        <ElAvatar :size="50" :src="v.avatar" :alt="v.alt"/>
                        <div class="info-wrapper">
                            <span class="nickname">{{ getTextRef(v.nickname) }}</span>
                            <p class="des">{{ getTextRef(v.des) }}</p>
                        </div>
                    </a>
                </li>
            </ol>
        </div>
        <button @click="openWindow" class="apply-button button">{{ getTextRef("requestFriendLink") }}</button>
        <div class="add-friend-link-window" v-if="isWindowOpen">
            <div class="window-tab"></div>
            <div class="window-content">
                <div v-for="option in optionsHint" :key="option.name" class="option">
                    <input class="input-box" type="text" v-model="options[option.name]" :placeholder="option.text">
                </div>
                <div class="button-plane" style="display: flex">
                    <button @click="closeWindow" class="close-button button">{{
                            getTextRef('friendLink.close')
                        }}
                    </button>
                    <a :href="getSkipUrl()" target="_blank">
                        <div class="button">{{ getTextRef('friendLink.submit') }}</div>
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.input-box {
    width: 100%;
    height: 30px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid var(--vp-c-border);
}

.button {
    background-color: var(--vp-c-bg-1);
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-border);
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    font-size: 16px;
}

.card {
    position: relative;
    margin: 0 auto 10px;
    padding: 10px;
    width: 100%;
    overflow: hidden;
    border-radius: 0.25rem;
    box-shadow: var(--box-shadow);
    box-sizing: border-box;
    transition: all 0.3s;
    background-color: rgba(var(--bg-gradient));
    display: flex;

    &:hover {
        box-shadow: var(--box-shadow-hover);
    }
}

.card-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .title {
        font-size: 12px;
        display: flex;
        align-items: center;
    }
}

.friend-wrapper {
    flex-direction: column;
}

.scroll-wrapper {
    overflow: hidden;
    position: relative;
}

.friend-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 10px 10px 0 0px;
    width: 100%;

    position: relative;
    width: 100%;

    li {
        box-sizing: border-box;
        padding: 0 5px;
        height: 76px;

        .el-avatar {
            min-width: 50px;
        }

        a {
            display: flex;
            align-items: center;
        }

        div {
            padding-left: 10px;
        }

        .info-wrapper {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .nickname {
            font-size: 16px;
            font-weight: 450;
        }

        .des {
            color: var(--vp-c-text-2);
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>

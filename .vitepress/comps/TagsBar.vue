<script setup lang="ts">
import {getTextRef} from "../sugarat/theme/src/composables/config/i18nRef";

const tagsLangData = {
    "zh": {
        "tag.backend": "后端",
        "tag.chatbot": "聊天机器人",
        "tag.cloudnative": "云原生",
        "tag.coder": "程序员",
        "tag.cs": "计算机科学",
        "tag.gamedev": "游戏开发",
        "tag.genshin": "原神",
        "tag.golang": "Go语言",
        "tag.homelab": "家里云",
        "tag.it": "信息技术",
        "tag.jpop": "日本流行",
        "tag.liteyuki": "轻雪",
        "tag.mcpe": "粒子特效",
        "tag.minecraft": "我的世界",
        "tag.microservices": "微服务",
        "tag.musiccomposition": "音乐创作",
        "tag.networkengineering": "网络工程",
        "tag.piano": "钢琴",
        "tag.punk": "朋克",
        "tag.python": "蟒蛇语言",
        "tag.railtransit": "轨道交通",
        "tag.redrocker": "红岩人",
        "tag.redstonemusic": "红石音乐",
        "tag.selfmedia": "自媒体",
        "tag.socialbutterfly": "社牛",
        "tag.socialphobia": "社恐",
        "tag.travel": "旅行",
        "tag.uploader": "上传者",
    },
    "en": {
        "tag.backend": "Backend",
        "tag.chatbot": "Chatbot",
        "tag.cloudnative": "Cloud Native",
        "tag.coder": "Coder",
        "tag.cs": "Computer Science",
        "tag.gamedev": "Game Development",
        "tag.genshin": "Genshin Impact",
        "tag.golang": "Go Language",
        "tag.homelab": "HomeLab",
        "tag.it": "Information Technology",
        "tag.jpop": "J-Pop",
        "tag.liteyuki": "Liteyuki",
        "tag.minecraft": "Minecraft",
        "tag.microservices": "Microservices",
        "tag.mcpe": "MCPE Particle Effects",
        "tag.musiccomposition": "Music Composition",
        "tag.networkengineering": "Network Engineering",
        "tag.piano": "Piano",
        "tag.punk": "Punk",
        "tag.python": "Python",
        "tag.railtransit": "Rail Transit",
        "tag.redrocker": "Redrocker",
        "tag.redstonemusic": "Redstone Music",
        "tag.selfmedia": "Self-Media",
        "tag.socialbutterfly": "Social Butterfly",
        "tag.socialphobia": "Social Phobia",
        "tag.travel": "Travel",
        "tag.uploader": "Uploader",
    }
}


type Tag = {
    text: string;
    color?: string;
    icon?: string;
    link?: string;
}

const colors = [
    "#ef4444", // Red 500
    "#f97316", // Orange 500
    "#f59e0b", // Amber 500
    "#eab308", // Yellow 500
    "#84cc16", // Lime 500
    "#22c55e", // Green 500
    "#10b981", // Emerald 500
    "#14b8a6", // Teal 500
    "#06b6d4", // Cyan 500
    "#0ea5e9", // Sky 500
    "#3b82f6", // Blue 500
    "#6366f1", // Indigo 500
    "#8b5cf6", // Violet 500
    "#a855f7", // Purple 500
    "#d946ef", // Fuchsia 500
    "#ec4899", // Pink 500
    "#f43f5e"  // Rose 500
];

let tags: Tag[] = [
    // 使用一连串渐变色，从红色到蓝色
    {text: 'tag.backend'},
    {text: 'tag.chatbot'},
    {
        text: 'tag.cloudnative',
        link: 'https://www.cncf.io/',
        icon: "https://www.cncf.io/wp-content/themes/cncf-twenty-two/images/favicon.svg"
    },
    {text: 'tag.coder'},
    {text: 'tag.cs'},
    {text: 'tag.gamedev'},
    {text: 'tag.genshin'},
    {text: 'tag.golang', link: 'https://golang.google.cn/', icon: "https://golang.google.cn/favicon.ico"},
    {text: 'tag.homelab'},
    {text: 'tag.it'},
    {text: 'tag.jpop'},
    {
        text: 'tag.liteyuki',
        link: 'https://liteyuki.icu',
        icon: "https://cdn.liteyuki.icu/static/img/liteyuki_icon_640.png"
    },
    {text: 'tag.mcpe'},
    {
        text: 'tag.minecraft',
        link: 'https://www.minecraft.net/',
        icon: "https://www.minecraft.net/etc.clientlibs/minecraftnet/clientlibs/clientlib-site/resources/favicon.ico"
    },
    {text: 'tag.microservices'},
    {text: 'tag.musiccomposition'},
    {text: 'tag.networkengineering'},
    {text: 'tag.piano'},
    {text: 'tag.punk'},
    {text: 'tag.python', link: 'https://www.python.org/', icon: "https://www.python.org/favicon.ico"},
    {text: 'tag.railtransit', icon: "https://www.cqmetro.cn/imgs/tb.png"},
    {text: 'tag.redrocker', link: 'https://redrocker.team/', icon: "https://redrock.team/imgs/redRock.png"},
    {text: 'tag.redstonemusic'},
    {text: 'tag.selfmedia'},
    {text: 'tag.socialbutterfly'},
    {text: 'tag.socialphobia'},
    {text: 'tag.travel'},
    {text: 'tag.uploader'},
];
// tags.sort(() => Math.random() - 0.5);   // 随机排序

// 通过背景色计算文字颜色
console.log(
    "   _____                           _                   _ \n" +
    "  / ____|                         | |                 (_)\n" +
    " | (___  _ __   _____      ___   _| | ____ _ _ __ ___  _ \n" +
    "  \\___ \\| '_ \\ / _ \\ \\ /\\ / / | | | |/ / _` | '_ ` _ \\| |\n" +
    "  ____) | | | | (_) \\ V  V /| |_| |   < (_| | | | | | | |\n" +
    " |_____/|_| |_|\\___/ \\_/\\_/  \\__, |_|\\_\\__,_|_| |_| |_|_|\n" +
    "                              __/ |                      \n" +
    "                             |___/                       "
)
console.log(getTextRef("aboutme.easterEgg", {
    "zh": {
        "aboutme.easterEgg": "恭喜你发现了彩蛋！"
    },
    "en": {
        "aboutme.easterEgg": "Congratulations! You found the easter egg!"
    }

}))

</script>

<template>
    <div class="tags-bar">
        <div class="tag" v-for="(tag, i) in tags" :style="{backgroundColor: colors[i % colors.length]}">
            <img class="tag-icon" v-if="tag.icon" :src="tag.icon" alt="icon"/>

            <a v-if="tag.link" :href="tag.link" class="tag-link">
                {{ getTextRef(tag.text, tagsLangData) }}
            </a>
            <span v-else>
                {{ getTextRef(tag.text, tagsLangData) }}
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tags-bar {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    line-height: 1.5; // 设置行距
}

.tag {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    padding: 5px 10px;
    margin: 0 5px 10px 5px; // 设置标签间距
    border-radius: 10px;
    color: white;
    font-size: 14px;
    height: 40px;

    .tag-link {
        color: inherit;
        text-decoration: underline;
    }

    .tag-icon {
        height: 65%;
        margin-right: 5px;
        border-radius: 4px;
    }
}


</style>
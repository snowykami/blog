<script setup lang="ts">
import {getTextRef} from "../sugarat/theme/src/composables/config/i18nRef";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {useData} from "vitepress";
import {extendData} from "../sugarat/theme/src/composables/config/i18n";
import {formatLangRouter} from "../sugarat/theme/src/composables/config/blog";

const isDark = useData().isDark
const windowWidth = ref(window.innerWidth);
const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
};
onMounted(() => {
    window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth);
});

const tagsLangData = {
    "zh": {
        "tag.automations": "自动化",
        "tag.backend": "后端",
        "tag.bilibili": "bilibili",
        "tag.chatbot": "聊天机器人",
        "tag.cloudnative": "云原生",
        "tag.cloudwego": "CloudWeGo",
        "tag.coder": "程序员",
        "tag.cqupt": "重邮",
        "tag.cs": "计算机科学",
        "tag.gamedev": "游戏开发",
        "tag.genshin": "原神",
        "tag.github": "GitHub",
        "tag.golang": "Go",
        "tag.homelab": "家里云",
        "tag.it": "信息技术",
        "tag.jetbrains": "捷并思",
        "tag.jpop": "日本流行",
        "tag.liteyuki": "轻雪工作室",
        "tag.lmtr": "轻雪铁路",
        "tag.mbti": "ENFT-J",
        "tag.mcpe": "粒子特效",
        "tag.minecraft": "我的世界",
        "tag.microservices": "微服务",
        "tag.music": "音乐",
        "tag.musiccomposition": "音乐创作",
        "tag.networkengineering": "网络工程",
        "tag.nonebot": "无机器人",
        "tag.piano": "钢琴",
        "tag.punk": "朋克",
        "tag.python": "Python",
        "tag.railtransit": "轨道交通",
        "tag.redrocker": "Redrocker",
        "tag.redstonemusic": "红石音乐",
        "tag.selfmedia": "自媒体",
        "tag.snowyfirefly": "雪萤工坊",
        "tag.socialbutterfly": "社牛",
        "tag.socialphobia": "社恐",
        "tag.sre": "运维人",
        "tag.travel": "旅行",
        "tag.uploader": "上传者",
    },
    "en": {
        "tag.automations": "Automations",
        "tag.backend": "Backend",
        "tag.bilibili": "bilibili",
        "tag.chatbot": "Chatbot",
        "tag.cloudnative": "Cloud Native",
        "tag.cloudwego": "CloudWeGo",
        "tag.coder": "Coder",
        "tag.cqupt": "CQUPT",
        "tag.cs": "Computer Science",
        "tag.gamedev": "Game Development",
        "tag.genshin": "Genshin Impact",
        "tag.github": "GitHub",
        "tag.golang": "Go",
        "tag.homelab": "HomeLab",
        "tag.it": "Information Technology",
        "tag.jetbrains": "JetBrains",
        "tag.jpop": "J-Pop",
        "tag.liteyuki": "Liteyuki",
        "tag.lmtr": "LMTR",
        "tag.mbti": "ENFT-J",
        "tag.minecraft": "Minecraft",
        "tag.microservices": "Microservices",
        "tag.mcpe": "MCPE Particle Effects",
        "tag.music": "Music",
        "tag.musiccomposition": "Music Composition",
        "tag.networkengineering": "Network Engineering",
        "tag.nonebot": "NoneBot",
        "tag.piano": "Piano",
        "tag.punk": "Punk",
        "tag.python": "Python",
        "tag.railtransit": "Rail Transit",
        "tag.redrocker": "Redrocker",
        "tag.redstonemusic": "Redstone Music",
        "tag.selfmedia": "Self-Media",
        "tag.snowyfirefly": "Snowyfirefly Studio",
        "tag.socialbutterfly": "Social Butterfly",
        "tag.socialphobia": "Social Phobia",
        "tag.sre": "SRE",
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

const colorsDark = [
    "#991b1b", // Red 800
    "#9a3412", // Orange 800
    "#92400e", // Amber 800
    "#854d0e", // Yellow 800
    "#3f6212", // Lime 800
    "#166534", // Green 800
    "#065f46", // Emerald 800
    "#115e59", // Teal 800
    "#155e75", // Cyan 800
    "#075985", // Sky 800
    "#1e40af", // Blue 800
    "#3730a3", // Indigo 800
    "#5b21b6", // Violet 800
    "#6b21a8", // Purple 800
    "#86198f", // Fuchsia 800
    "#9d174d", // Pink 800
    "#9f1239"  // Rose 800
];

let tags: Tag[] = [
    // 使用一连串渐变色，从红色到蓝色

    {
        text: 'tag.liteyuki',
        link: 'https://liteyuki.icu',
        icon: "https://cdn.liteyuki.icu/static/img/liteyuki_icon_640.png"
    },
    {text: 'tag.redrocker', link: 'https://redrocker.team/', icon: "https://redrock.team/imgs/redRock.png"},
    {
        text: 'tag.github',
        link: 'https://github.com/snowykami/',
        icon: "https://github.githubassets.com/favicons/favicon.svg"
    },
    {
        text: 'tag.mbti',
        link: 'https://www.16personalities.com/ch/enfj-%E4%BA%BA%E6%A0%BC',
        icon: "https://www.16personalities.com/static/images/favicons/favicon-32x32.png"

    },
    {
        text: 'tag.lmtr',
        link: 'https://mtr.lite.ac.cn/',
        icon: "https://mtr.lite.ac.cn/favicon.ico"
    },
    {
        text: 'tag.cloudnative',
        link: 'https://www.cncf.io/',
        icon: "https://www.cncf.io/wp-content/themes/cncf-twenty-two/images/favicon.svg"
    },
    {
        text: 'tag.cloudwego',
        link: 'https://www.cloudwego.io/',
        icon: "https://www.cloudwego.io/favicons/favicon.ico"
    },
    {
        text: 'tag.nonebot',
        link: 'https://nonebot.dev/',
        icon: "https://nonebot.dev/icons/favicon.ico"
    },
    {
        text: 'tag.jetbrains',
        link: 'https://www.jetbrains.com/',
        icon: "https://www.jetbrains.com/favicon.ico"
    },
    {
        text: 'tag.cqupt',
        link: 'https://www.cqupt.edu.cn/',
        icon: "https://www.cqupt.edu.cn/dfiles/13011/cqupt/img/favicon_128x128.ico"
    },
    {text: 'tag.golang', link: 'https://golang.google.cn/', icon: "https://golang.google.cn/favicon.ico"},
    {
        text: 'tag.minecraft',
        link: 'https://www.minecraft.net/',
        icon: "https://www.minecraft.net/etc.clientlibs/minecraftnet/clientlibs/clientlib-site/resources/favicon.ico"
    },
    {text: 'tag.python', link: 'https://www.python.org/', icon: "https://www.python.org/favicon.ico"},
    {text: 'tag.railtransit', icon: "https://www.cqmetro.cn/imgs/tb.png"},
    {text: 'tag.bilibili', link: 'https://www.bilibili.com/', icon: "https://www.bilibili.com/favicon.ico"},
    {text: 'tag.music', link: 'https://music.163.com/', icon: "https://s1.music.126.net/style/favicon.ico?v20180823"},
    // No icon tags
    {text: 'tag.snowyfirefly'},
    {text: 'tag.backend'},
    {text: 'tag.chatbot'},
    {text: 'tag.coder'},
    {text: 'tag.cs'},
    {text: 'tag.gamedev'},
    {text: 'tag.genshin'},
    {text: 'tag.homelab'},
    {text: 'tag.it'},
    {text: 'tag.jpop'},
    {text: 'tag.mcpe'},
    {text: 'tag.automations'},
    {text: 'tag.microservices'},
    {text: 'tag.musiccomposition'},
    {text: 'tag.networkengineering'},
    {text: 'tag.piano'},
    {text: 'tag.punk'},
    {text: 'tag.redstonemusic'},
    {text: 'tag.selfmedia'},
    {text: 'tag.socialbutterfly'},
    {text: 'tag.socialphobia'},
    {text: 'tag.sre'},
    {text: 'tag.travel'},
    {text: 'tag.uploader'},
];
extendData(tagsLangData)

// 最大化排布，使得每行的标签尽可能排满，且和窗口变化时重新排布，不一定要按照顺序排列
const getTagWidth = (tag: Tag) => {
    const text = getTextRef(tag.text, tagsLangData)
    const iconWidth = tag.icon ? 20 : 0
    return text.length * 8 + iconWidth
}

// 对sortedTags进行动态规划排序，使得每行的标签尽可能排满，无需按照顺序排列
const dpTags = computed(() => {
    const dp: number[] = new Array(tags.length).fill(0);
    const width = windowWidth.value - 20; // 容器宽度
    const rows: Tag[][] = []; // 存储每行的标签

    for (let i = 0; i < tags.length; i++) {
        let currentTagWidth = getTagWidth(tags[i]);
        let placed = false;

        // 尝试将当前标签放入已有的行中
        for (let j = 0; j < rows.length; j++) {
            if (dp[j] + currentTagWidth <= width) {
                rows[j].push(tags[i]);
                dp[j] += currentTagWidth;
                placed = true;
                break;
            }
        }
        // 如果没有合适的行，创建新的行
        if (!placed) {
            rows.push([tags[i]]);
            dp[rows.length - 1] = currentTagWidth;
        }
    }

    // 将行中的标签按照宽度从大到小排序，使得宽的标签优先显示
    rows.forEach(row => {
        row.sort((a, b) => getTagWidth(b) - getTagWidth(a));
    });
    // 有icon的标签优先显示
    rows.forEach(row => {
        row.sort((a, b) => {
            if (a.icon && !b.icon) {
                return -1;
            } else if (!a.icon && b.icon) {
                return 1;
            } else {
                return 0;
            }
        });
    });
    return rows.flat(); // 将所有行的标签合并为一个数组

});

function getColor(i: number) {
    return isDark.value ? colorsDark[i % colorsDark.length] : colors[i % colors.length]
}

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
        <div class="tag" v-for="(tag, i) in dpTags" :style="{backgroundColor: getColor(i)}">
            <img class="tag-icon" v-if="tag.icon" :src="tag.icon" alt="icon"/>
            <a v-if="tag.link" :href="tag.link" class="tag-link">
                {{ getTextRef(tag.text) }}
            </a>
            <span v-else>
                {{ getTextRef(tag.text) }}
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
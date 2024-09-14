<script setup lang="ts">
import {getTextRef} from "../utils/i18nRef";

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
    color: string;
    icon?: string;
    link?: string;
}

let tags: Tag[] = [
    // 使用一连串渐变色，从红色到蓝色
    {text: 'tag.backend', color: '#ff0000'},
    {text: 'tag.chatbot', color: '#ff3300'},
    {text: 'tag.cloudnative', color: '#ff6600'},
    {text: 'tag.coder', color: '#ff9900'},
    {text: 'tag.cs', color: '#ffcc00'},
    {text: 'tag.gamedev', color: '#ffff00'},
    {text: 'tag.genshin', color: '#ccff00'},
    {text: 'tag.golang', color: '#99ff00'},
    {text: 'tag.homelab', color: '#66ff00'},
    {text: 'tag.it', color: '#33ff00'},
    {text: 'tag.jpop', color: '#00ff00'},
    {text: 'tag.liteyuki', color: '#00ff33'},
    {text: 'tag.mcpe', color: '#00ff66'},
    {text: 'tag.minecraft', color: '#00ff99'},
    {text: 'tag.microservices', color: '#00ffcc'},
    {text: 'tag.musiccomposition', color: '#00ffff'},
    {text: 'tag.networkengineering', color: '#00ccff'},
    {text: 'tag.piano', color: '#0099ff'},
    {text: 'tag.punk', color: '#0066ff'},
    {text: 'tag.python', color: '#0033ff'},
    {text: 'tag.railtransit', color: '#0000ff'},
    {text: 'tag.redstonemusic', color: '#3300ff'},
    {text: 'tag.selfmedia', color: '#6600ff'},
    {text: 'tag.socialbutterfly', color: '#9900ff'},
    {text: 'tag.socialphobia', color: '#cc00ff'},
    {text: 'tag.travel', color: '#ff00ff'},
    {text: 'tag.uploader', color: '#ff00cc'},
];
// tags.sort(() => Math.random() - 0.5);   // 随机排序

// 通过背景色计算文字颜色
const getTagTextColor = (backgroundColor: string) => {
    // 将颜色值转换为 RGB 格式
    const rgb = backgroundColor.replace(/^#/, '');
    const [r, g, b] = rgb.match(/.{2}/g).map(x => parseInt(x, 16));

    // 计算亮度
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // 根据亮度决定文字颜色
    return brightness > 128 ? '#111' : '#eee'
};

</script>

<template>
    <div class="tags-bar">
        <span class="tag" v-for="tag in tags"
               :style="{backgroundColor: tag.color, color: getTagTextColor(tag.color)}">
            <img class="tag-icon" v-if="tag.icon" :src="tag.icon" alt="icon"/>
            <a v-if="tag.link" :href="tag.link" class="tag-link">
                {{ getTextRef(tag.text, tagsLangData) }}
            </a>
            <span v-else>
                {{ getTextRef(tag.text, tagsLangData) }}
            </span>
        </span>
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
    display: inline-block;
    white-space: nowrap;
    padding: 5px 10px;
    margin: 0 5px 10px 5px; // 设置标签间距
    border-radius: 10px;
    color: white;
    font-size: 14px;
}

.tag-link {
    color: inherit;
    text-decoration: underline;
}

.tag-icon {
    border-radius: 50%;
}
</style>
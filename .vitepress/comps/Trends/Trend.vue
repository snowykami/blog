<script setup lang="ts">
import TrendMeta from "./TrendMeta.vue";
import markdownit from 'markdown-it'
import {ref} from "vue";

const md = markdownit()

const props = defineProps<{
  author: {
    avatar: string
    name: string
    datetime: string
  },
  number: number  // issue number
  title: string
  body: string
  rawUrl: string
}>()

const comments = ref([])

const bannedUser = ['github-actions', 'dependabot[bot]', 'liteyuki-flow']
// 标题加粗
</script>

<template>
  <div>
    <TrendMeta
        :avatar="props.author.avatar"
        :name="props.author.name"
        :datetime="props.author.datetime"
        :rawUrl="props.rawUrl"
    />
    <h3>{{ props.title }}</h3>
    <div v-html="md.render(props.body)"/>
    <!--      评论-->
    <div>
      <div v-for="comment in comments.filter(comment => !bannedUser.includes(comment['user']['login']))"
           style="display: flex">
        <a :href="comment['user']['html_url']" target="_blank">
          <div class="comment-user" style="font-weight: bold">{{ comment['user']['login'] }}</div>
        </a>
        :&nbsp;
        <a :href="comment['html_url']" target="_blank">
          <div class="comment-body">{{ comment['body'] }}</div>
        </a>
      </div>
    </div>
    <hr/>
  </div>
</template>

<style scoped lang="scss">

</style>
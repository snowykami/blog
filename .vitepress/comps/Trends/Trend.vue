<script setup lang="ts">
import AuthorInfo from "./AuthorInfo.vue";
import markdownit from 'markdown-it'
import {onMounted, ref} from "vue";
import {getIssueComments} from "../../utils/githubApi";

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
}>()

const comments = ref([])

onMounted(async () => {
  comments.value = await getIssueComments(props.number)
  console.log(comments.value)
})

const bannedUser = ['github-actions', 'dependabot[bot]', 'liteyuki-flow']
// 标题加粗
</script>

<template>
  <div class="trend">
    <div>
      <AuthorInfo :avatar="props.author.avatar" :name="props.author.name" :datetime="props.author.datetime"/>
      <h3>{{ props.title }}</h3>
      <div v-html="md.render(props.body)"/>
      <!--      评论-->
      <div>
        <!--        <div v-for="comment in comments" style="display: flex">-->
        <!--          &lt;!&ndash;          纯文本，作者加粗，body不变&ndash;&gt;-->
        <!--          <div class="comment-user" style="font-weight: bold">{{ comment['user']['login'] }}</div>-->
        <!--          :-->
        <!--          <div class="comment-body">{{ comment['body'] }}</div>-->
        <!--        </div>-->
        <div v-for="comment in comments.filter(comment => !bannedUser.includes(comment['user']['login']))"
             style="display: flex">
          <!--          纯文本，作者加粗，body不变-->
          <div class="comment-user" style="font-weight: bold">{{ comment['user']['login'] }}</div>
          :
          <div class="comment-body">{{ comment['body'] }}</div>
        </div>
      </div>
      <hr/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
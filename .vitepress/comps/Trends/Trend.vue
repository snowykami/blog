<script setup lang="ts">
import TrendMeta from "./TrendMeta.vue";
import markdownit from 'markdown-it'
import {onMounted, ref} from "vue";
import {API_BASE} from "../../utils/githubApi";
import {getTextRef} from "../../sugarat/theme/src/composables/config/i18nRef";

const md = markdownit()

const BlockUsers = [
  'dependabot[bot]',
  'dependabot-preview[bot]',
  'renovate[bot]',
  'renovate-bot',
  'renovate-bot',
  'liteyuki-flow',
]

const props = defineProps<{
  avatar: string
  name: string
  datetime: string
  title: string
  body: string
  number: string
  rawUrl: string
}>()

const comments = ref([])

const commentInputs = ref({})


onMounted(
    () => {
      fetch(API_BASE + "/comments" + "?issue_number=" + props.number)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            comments.value = data;
          })
          .catch((error) => {
            console.error('Fetch error:', error);
          });
    }
)

</script>

<template>
  <!--  正文-->
  <TrendMeta
      :avatar="props.avatar"
      :name="props.name"
      :datetime="props.datetime"
      :rawUrl="props.rawUrl"
  ></TrendMeta>
  <h3>{{ props.title }}</h3>
  <div v-html="md.render(props.body)"/>
  <!--      评论-->

  <div class="comment-area">
    <div v-for="comment in comments.filter(comment => !BlockUsers.includes(comment['user']['login']))"
         style="display: flex">
      <a :href="comment['user']['html_url']" target="_blank">
        <div class="comment-user" style="font-weight: bold">{{ comment['user']['login'] }}</div>
      </a>
      :&nbsp;
      <a :href="comment['html_url']" target="_blank">
        <div class="comment-body">{{ comment['body'] }}</div>
      </a>
    </div>
<!--    评论发送框-->
    <div class="comment-send">
      <a :href="`${props.rawUrl}?body=${encodeURIComponent(commentInputs[props.number])}`" target="_blank">
        <button class="send-button">{{ getTextRef('trends.Send') }}</button>
      </a>
    </div>
  </div>
  <hr class="custom-divider"/>
</template>

<style scoped lang="scss">
.input-box {
  width: calc(100% - 100px); /* 留出按钮的宽度 */
  height: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 50px;
  padding: 5px;
  margin-right: 10px; /* 给按钮留出一些间距 */
}

.send-button {
  height: 30px;
  border: none;
  border-radius: 50px;
  padding: 5px 10px;
  text-align: center; /* 水平居中 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.comment-send {
  display: flex;
  align-items: center;
}
</style>
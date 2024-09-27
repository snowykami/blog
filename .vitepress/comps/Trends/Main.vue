<script setup lang="ts">
import Trend from "./Trend.vue";
import {getRepoTrendIssues} from "../../utils/githubApi";
import {onMounted, ref} from "vue";

function formatDatetime(datetime: string) {
  // raw: 2024-09-26T17:42:15Z
  // out 2024/09/26 17:42:15
  return datetime.replace(/T|Z/g, ' ').replace(/-/g, '/').slice(0, -4)
}

const trends = ref([])
onMounted(async () => {
  trends.value = await getRepoTrendIssues()
  console.log(trends.value)
})
</script>

<template>
  <div class="trends-bar">
    <Trend v-for="trend in trends"
           :key="trend['number']"
           :number="trend['number']"
           :author="{avatar: `https://github.com/${trend['user']['login']}.png`, name: trend['user']['login'], datetime: formatDatetime(trend['created_at'])}"
           :title="trend['title']"
           :body="trend['body']" ,
           :rawUrl="trend['html_url']"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
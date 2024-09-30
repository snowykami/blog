<script setup lang="ts">
import Trend from './Trend.vue'
import {API_BASE} from "../../utils/githubApi";
import {ref} from "vue";

function formatDatetime(datetime: string) {
  // raw: 2024-09-26T17:42:15Z
  // out 2024/09/26 17:42:15
  return datetime.replace(/[TZ]/g, ' ').replace(/-/g, '/').slice(0, -4)
}


const trends = ref([])
fetch(API_BASE + "/trends")
    .then(res => res.json())
    .then(data => {
      trends.value = data
    })

</script>
<template>
  <div class="trends-bar">
    <Trend v-for="(trend) in trends"
           :key="trend['number']"
           :avatar="trend['user']['avatar_url']"
           :name="trend['user']['login']"
           :datetime="formatDatetime(trend['created_at'])"
           :title="trend['title']"
           :body="trend['body']"
           :rawUrl="trend['html_url']"
           :number="trend['number']"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
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
  <iframe src="https://lab.liteyuki.icu/embed/user-timeline/a2utaz241qx60001?maxHeight=1000" data-misskey-embed-id="v1_076061d1-d7ad-48cf-a553-2d0963c8a449" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" style="border: none; width: 100%; max-width: 1080px; height: 1000px; color-scheme: light dark;"></iframe>
  <!-- <div class="trends-bar">
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
  </div> -->
</template>

<style scoped lang="scss">

</style>
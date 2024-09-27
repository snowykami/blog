<script setup lang="ts">
import {defineProps} from 'vue'
import {getTextRef} from "../../sugarat/theme/src/composables/config/i18nRef";

const props = defineProps<{
  avatar: string
  name: string
  datetime: string  // 格式化后的时间 2021-09-01
  rawUrl: string
}>()
</script>

<template>
  <div class="author-info" style="display: flex; justify-content: space-between">
    <div class="meta-left" style="display: flex">
      <div class="author-avatar">
        <img :src="props.avatar" alt="author-avatar"/>
      </div>
      <div class="author-meta">
        <h3>{{ props.name }}</h3>
        <p>{{ props.datetime }}</p>
      </div>
    </div>
    <div class="meta-right" style="display: flex">
      <div class="tabs">
        <a :href="rawUrl" target="_blank">{{ getTextRef('originalText') }}</a>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.author-info {
  .author-avatar {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  .author-meta {
    margin-left: 10px;

    h3 {
      margin: 0;
    }

    p {
      margin: 0;
    }
  }
}
</style>
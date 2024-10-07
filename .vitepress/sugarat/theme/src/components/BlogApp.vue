<script setup lang="ts" name="BlogApp">
import Theme from 'vitepress/theme'
import {useData} from 'vitepress'
import {computed, onMounted, ref} from 'vue'
import {useDarkTransition} from '../hooks/useDarkTransition'
import {useBlogThemeMode, useDarkTransitionConfig} from '../composables/config/blog'
import BlogHomeInfo from './BlogHomeInfo.vue'
import BlogHomeBanner from './BlogHomeBanner.vue'
import BlogList from './BlogList.vue'
import BlogSidebar from './BlogSidebar.vue'
import BlogImagePreview from './BlogImagePreview.vue'
import BlogArticleAnalyze from './BlogArticleAnalyze.vue'
import BlogAlert from './BlogAlert.vue'
import BlogPopover from './BlogPopover.vue'
import BlogFooter from './BlogFooter.vue'
import BlogHomeHeaderAvatar from './BlogHomeHeaderAvatar.vue'
import BlogBackToTop from './BlogBackToTop.vue'
import CommentGiscus from './CommentGiscus.vue'
import BlogOml2d from './BlogOml2d.vue'

import CommentArtalk from './CommentArtalk.vue'
import BlogButtonAfterArticle from './BlogButtonAfterArticle.vue'
import BlogCommentWrapper from './BlogCommentWrapper.vue'
import {string} from "fast-glob/out/utils";

const {frontmatter} = useData()
const layout = computed(() => frontmatter.value.layout)
const isBlogTheme = useBlogThemeMode()
const isHome = computed(
    () => {
      return layout.value === 'home'
    }
)
const {Layout} = Theme

// 切换深色模式过渡
// https://vitepress.dev/zh/guide/extending-default-theme#on-appearance-toggle
const dark = useData().isDark
const mobile = ref(false)
// 随机背景
const bgImg = computed(
    () => {
      let img = '/img/bg/'
      if (dark.value) {
        img += 'dark-'
        if (mobile.value) {
          img += 'mobile-' + Math.floor(Math.random() * 6) + '.png'
        } else {
          img += 'pc-' + Math.floor(Math.random() * 2) + '.png'
        }
      } else {
        if (mobile.value) {
          img += 'light-mobile-' + Math.floor(Math.random() * 4) + '.png'
        } else {
          img += 'light-pc-' + Math.floor(Math.random() * 4) + '.png'
        }
      }
      return img
    }
)

onMounted(
    () => {
      window.onresize = function () {
        mobile.value = document.documentElement.clientWidth < 960
      };

      document.body.addEventListener('click', function(event) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${event.clientX - 5}px`;
        particle.style.top = `${event.clientY - 5}px`;
        document.body.appendChild(particle);

        // Remove the particle after the animation ends
        particle.addEventListener('animationend', function() {
          document.body.removeChild(particle);
        });
      });

    }
)

useDarkTransition()
const openTransition = useDarkTransitionConfig()
</script>

<template>
  <Layout :class="{ 'blog-theme-layout': openTransition }"
          style="background-size: 100% auto; background-repeat: repeat-y" :style="isHome ? { backgroundImage: `url(${bgImg})`} : {}">
    <template #layout-top>
      <slot name="layout-top"/>
      <ClientOnly>
        <BlogOml2d/>
        <BlogAlert/>
        <BlogPopover/>
      </ClientOnly>
    </template>

    <template #doc-before>
      <slot name="doc-before"/>
      <!-- 阅读时间分析 -->
      <ClientOnly>
        <BlogArticleAnalyze/>
        <!-- 图片预览 -->
        <BlogImagePreview/>
      </ClientOnly>
    </template>

    <template #nav-bar-content-before>
      <slot name="nav-bar-content-before"/>
    </template>
    <!-- 自定义首页 -->
    <template v-if="isBlogTheme" #home-hero-before>
      <slot name="home-hero-before"/>
      <div class="home">
        <BlogHomeHeaderAvatar/>
        <div class="header-banner">
          <BlogHomeBanner/>
        </div>
        <div class="content-wrapper">
          <div class="blog-list-wrapper">
            <BlogList/>
          </div>
          <div class="blog-info-wrapper">
            <BlogHomeInfo/>
          </div>
        </div>
      </div>
    </template>
    <template v-if="isBlogTheme" #sidebar-nav-after>
      <slot name="sidebar-nav-after"/>
      <BlogSidebar/>
    </template>
    <template #doc-after>
      <slot name="doc-after"/>
      <!-- 评论 -->
      <ClientOnly>
        <BlogButtonAfterArticle/>
        <BlogBackToTop/>
        <BlogCommentWrapper>
          <CommentArtalk/>
          <CommentGiscus/>
        </BlogCommentWrapper>
      </ClientOnly>
    </template>
    <template #layout-bottom>
      <BlogFooter/>
      <slot name="layout-bottom"/>
    </template>
    <!-- 透传默认主题的其它插槽 -->
    <!-- navbar -->
    <template #nav-bar-title-before>
      <slot name="nav-bar-title-before"/>
    </template>
    <template #nav-bar-title-after>
      <slot name="nav-bar-title-after"/>
    </template>
    <template #nav-bar-content-after>
      <slot name="nav-bar-content-after"/>
    </template>
    <template #nav-screen-content-before>
      <slot name="nav-screen-content-before"/>
    </template>
    <template #nav-screen-content-after>
      <slot name="nav-screen-content-after"/>
    </template>

    <!-- sidebar -->
    <template #sidebar-nav-before>
      <slot name="sidebar-nav-before"/>
    </template>

    <!-- content -->
    <template #page-top>
      <slot name="page-top"/>
    </template>
    <template #page-bottom>
      <slot name="page-bottom"/>
    </template>

    <template #not-found>
      <slot name="not-found"/>
    </template>
    <template #home-hero-info>
      <slot name="home-hero-info"/>
    </template>
    <template #home-hero-image>
      <slot name="home-hero-image"/>
    </template>
    <template #home-hero-after>
      <slot name="home-hero-after"/>
    </template>
    <template #home-features-before>
      <slot name="home-features-before"/>
    </template>
    <template #home-features-after>
      <slot name="home-features-after"/>
    </template>

    <template #doc-footer-before>
      <slot name="doc-footer-before"/>
    </template>

    <template #doc-top>
      <slot name="doc-top"/>
    </template>
    <template #doc-bottom>
      <slot name="doc-bottom"/>
    </template>

    <template #aside-top>
      <slot name="aside-top"/>
    </template>
    <template #aside-bottom>
      <slot name="aside-bottom"/>
    </template>
    <template #aside-outline-before>
      <slot name="aside-outline-before"/>
    </template>
    <template #aside-outline-after>
      <slot name="aside-outline-after"/>
    </template>
    <template #aside-ads-before>
      <slot name="aside-ads-before"/>
    </template>
    <template #aside-ads-after>
      <slot name="aside-ads-after"/>
    </template>
  </Layout>
</template>

<style scoped lang="scss">
.home {
  margin: 0 auto;
  padding: 20px;
  max-width: 1126px;
}

@media screen and (min-width: 960px) {
  .home {
    padding-top: var(--vp-nav-height);
  }
}

.header-banner {
  width: 100%;
  padding: 60px 0;
}

.content-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.blog-list-wrapper {
  width: 100%;
}

.blog-info-wrapper {
  margin-left: 16px;
  position: sticky;
  top: 100px;
}

@media screen and (max-width: 959px) {
  .blog-info-wrapper {
    margin-left: 16px;
    position: sticky;
    top: 40px;
  }
}

@media screen and (max-width: 767px) {
  .content-wrapper {
    flex-wrap: wrap;
  }

  .blog-info-wrapper {
    margin: 20px 0;
    width: 100%;
  }
}
</style>

<style>
@import url(./../styles/dark-transition.css);

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #a2d8f4;
  border-radius: 50%;
  pointer-events: none;
  animation: particle-animation 1s ease-out forwards;
}

@keyframes particle-animation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

</style>

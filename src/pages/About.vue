<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'About - Armytool' });
</script>

<template>
  <div class="px-20px pb-100px pt-50px">
    <div class="blog-content mx-auto max-w-800px prose dark:prose-invert">
      <c-markdown :markdown="$t('about.content')" />
    </div>
  </div>
</template>

<style scoped lang="less">
.blog-content {
  font-size: 18px;
  line-height: 1.8;

  ::v-deep(h1) {
    font-size: 32px;
    font-weight: 700;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  ::v-deep(h2) {
    font-size: 26px;
    font-weight: 700;
    margin-top: 35px;
    margin-bottom: 15px;
  }

  ::v-deep(h3) {
    font-size: 22px;
    font-weight: 600;
    margin-top: 30px;
    margin-bottom: 12px;
  }

  ::v-deep(p) {
    margin-bottom: 20px;
  }

  ::v-deep(ul), ::v-deep(ol) {
    margin-bottom: 20px;
    padding-left: 20px;
  }

  ::v-deep(li) {
    margin-bottom: 8px;
  }

  ::v-deep(code) {
    background-color: #f3f4f6;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: monospace;
  }

  .dark ::v-deep(code) {
    background-color: #374151;
  }

  ::v-deep(pre) {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 24px;
  }

  ::v-deep(blockquote) {
    border-left: 4px solid #18a058;
    padding-left: 20px;
    font-style: italic;
    color: #6b7280;
    margin-bottom: 20px;
  }

  ::v-deep(strong) {
    font-weight: 700;
  }

  ::v-deep(a) {
    color: #18a058;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
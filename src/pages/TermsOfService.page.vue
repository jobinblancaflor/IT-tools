<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
useHead({ title: `${t('termsOfService.title')} - Armytool` });
</script>

<template>
  <div class="px-20px pb-100px pt-50px">
    <div class="blog-content mx-auto max-w-800px prose dark:prose-invert">
      <c-markdown :markdown="t('termsOfService.content')" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.blog-content {
  font-size: 18px;
  line-height: 1.8;

  ::v-deep(h1) {
    font-size: 32px;
    font-weight: 700;
    margin-top: 0;
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
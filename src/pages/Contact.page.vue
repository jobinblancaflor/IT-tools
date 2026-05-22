<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';
import { IconExternalLink } from '@tabler/icons-vue';

const { t } = useI18n();
useHead({ title: `${t('contact.title')} - Armytool` });
</script>

<template>
  <div class="contact-page">
    <n-h1 align="center">
      {{ t('contact.title') }}
    </n-h1>
    <div class="content">
      <p class="description">
        {{ t('contact.description') }}
      </p>

      <div class="form-link-wrapper">
        <n-button
          type="primary"
          size="large"
          href="https://forms.gle/RTqr2ZUrKosiQ4sr8"
          target="_blank"
          rel="noopener noreferrer"
          tag="a"
        >
          {{ t('contact.googleForm') }}
          <template #icon>
            <n-icon :component="IconExternalLink" />
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.contact-page {
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;

  .content {
    margin-top: 40px;
    text-align: center;

    .description {
      font-size: 1.2rem;
      margin-bottom: 40px;
      opacity: 0.8;
    }

    .form-link-wrapper {
      margin-top: 20px;
    }
  }
}
</style>

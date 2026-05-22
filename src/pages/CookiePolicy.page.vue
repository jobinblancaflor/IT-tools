<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
useHead({ title: `${t('cookiePolicy.title')} - Armytool` });
</script>

<template>
  <div class="legal-page">
    <n-h1>{{ t('cookiePolicy.title') }}</n-h1>
    <div class="legal-content">
      <p>Last updated: {{ new Date().toLocaleDateString() }}</p>

      <h2>1. What are cookies?</h2>
      <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.</p>

      <h2>2. How we use cookies</h2>
      <p>We use cookies to:
        <ul>
          <li>Remember your preferences (e.g., dark mode, language).</li>
          <li>Analyze how our site is used via third-party analytics.</li>
          <li>Help you install the app on your device.</li>
        </ul>
      </p>

      <h2>3. Your choices</h2>
      <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.legal-page {
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;
  line-height: 1.6;

  .legal-content {
    margin-top: 40px;

    h2 {
      margin-top: 30px;
      margin-bottom: 15px;
    }

    p {
      margin-bottom: 15px;
      opacity: 0.9;
    }

    ul {
      margin-bottom: 15px;
      padding-left: 20px;
    }
  }
}
</style>

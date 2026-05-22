<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
useHead({ title: `${t('disclaimer.title')} - Armytool` });
</script>

<template>
  <div class="legal-page">
    <n-h1>{{ t('disclaimer.title') }}</n-h1>
    <div class="legal-content">
      <p>Last updated: {{ new Date().toLocaleDateString() }}</p>

      <h2>1. General Information</h2>
      <p>The information provided by Armytool is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>

      <h2>2. Professional Disclaimer</h2>
      <p>The site cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.</p>

      <h2>3. External Links Disclaimer</h2>
      <p>The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>
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
  }
}
</style>

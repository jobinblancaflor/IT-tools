<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
useHead({ title: `${t('privacyPolicy.title')} - Armytool` });
</script>

<template>
  <div class="legal-page">
    <n-h1>{{ t('privacyPolicy.title') }}</n-h1>
    <div class="legal-content">
      <p>Last updated: {{ new Date().toLocaleDateString() }}</p>

      <h2>1. Introduction</h2>
      <p>Welcome to Armytool. We respect your privacy and are committed to protecting your personal data.</p>

      <h2>2. Data Collection</h2>
      <p>Most of our tools are client-side only. This means your data is processed entirely in your browser and is never sent to our servers. We do not collect personal information through these tools.</p>

      <h2>3. Third-Party Services</h2>
      <p>We may use third-party services like Google Analytics or Plausible to understand how our site is used. These services may collect information about your IP address, browser type, and pages visited.</p>

      <h2>4. Cookies</h2>
      <p>We use cookies to improve your experience. You can find more information in our Cookie Policy.</p>

      <h2>5. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us via our contact form.</p>
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

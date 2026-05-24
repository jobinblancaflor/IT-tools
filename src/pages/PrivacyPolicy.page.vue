<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';
import { ChevronLeft } from '@vicons/tabler';

const { t } = useI18n();
useHead({ title: `${t('privacyPolicy.title')} - Armytool` });
</script>

<template>
  <div class="legal-page">
    <router-link to="/" class="back-link">
      <n-icon :component="ChevronLeft" />
      Back to Home
    </router-link>

    <n-h1>{{ t('privacyPolicy.title') }}</n-h1>
    <div class="legal-content">
      <p>Last updated: {{ new Date().toLocaleDateString() }}</p>

      <h2>1. Introduction</h2>
      <p>Welcome to Armytool. We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website.</p>

      <h2>2. Data Collection (Client-Side Tools)</h2>
      <p>The core philosophy of Armytool is privacy. The vast majority of our tools are **client-side only**. This means your data (passwords, JSON, tokens, etc.) is processed entirely in your browser and is never sent to our servers. We do not see, collect, or store any data you input into these tools.</p>

      <h2>3. Advertising and Cookies (Google AdSense)</h2>
      <p>We use Google AdSense to serve ads when you visit our website. Google may use cookies to serve ads based on your prior visits to this or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.</p>
      <p>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Ads Settings</a>.</p>

      <h2>4. Third-Party Analytics</h2>
      <p>We may use third-party services like Google Analytics or Plausible to understand how our site is used. These services may collect information about your IP address, browser type, and pages visited to help us improve the user experience.</p>

      <h2>5. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us via our <router-link to="/contact">contact form</router-link>.</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.legal-page {
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;
  line-height: 1.6;

  .back-link {
    display: flex;
    align-items: center;
    gap: 5px;
    text-decoration: none;
    color: var(--primary-color);
    margin-bottom: 20px;
    font-weight: 500;

    &:hover {
      opacity: 0.8;
    }
  }
// ... rest of styles

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

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
useHead({ title: `${t('termsOfService.title')} - Armytool` });
</script>

<template>
  <div class="legal-page">
    <n-h1>{{ t('termsOfService.title') }}</n-h1>
    <div class="legal-content">
      <p>Last updated: {{ new Date().toLocaleDateString() }}</p>

      <h2>1. Terms</h2>
      <p>By accessing Armytool, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>

      <h2>2. Use License</h2>
      <p>Armytool is open-source under the GPL-3.0 license. You are free to use, modify, and distribute the code according to the terms of that license.</p>

      <h2>3. Disclaimer</h2>
      <p>The materials on Armytool are provided on an 'as is' basis. Armytool makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

      <h2>4. Limitations</h2>
      <p>In no event shall Armytool or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Armytool.</p>
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

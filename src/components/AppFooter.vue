<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="copyright">
        {{ t('footer.copyright', { year }) }}
      </div>
      <div class="footer-links">
        <RouterLink to="/contact">
          {{ t('footer.links.contact') }}
        </RouterLink>
        <RouterLink to="/privacy-policy">
          {{ t('footer.links.privacyPolicy') }}
        </RouterLink>
        <RouterLink to="/terms-of-service">
          {{ t('footer.links.termsOfService') }}
        </RouterLink>
        <RouterLink to="/disclaimer">
          {{ t('footer.links.disclaimer') }}
        </RouterLink>
        <RouterLink to="/cookie-policy">
          {{ t('footer.links.cookiePolicy') }}
        </RouterLink>
      </div>
    </div>
  </footer>
</template>

<style lang="less" scoped>
.app-footer {
  padding: 40px 20px;
  margin-top: 60px;
  border-top: 1px solid rgba(128, 128, 128, 0.1);
  color: #838587;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}
</style>

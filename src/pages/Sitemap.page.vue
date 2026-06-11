<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';
import { useToolStore } from '@/tools/tools.store';
import { blogs } from '@/data/blogs.data';

const { t } = useI18n();
const toolStore = useToolStore();

useHead({ title: `${t('sitemap.title')} - Armytool` });
</script>

<template>
  <div class="sitemap-page">
    <n-h1>{{ t('sitemap.title') }}</n-h1>
    <p class="sitemap-desc">{{ t('sitemap.description') }}</p>

    <div class="sitemap-grid">
      <section>
        <h3>{{ t('sitemap.sections.main') }}</h3>
        <ul>
          <li><router-link to="/">{{ t('home.home') }}</router-link></li>
          <li><router-link to="/about">{{ t('about.aboutLabel') }}</router-link></li>
          <li><router-link to="/blogs">{{ t('blogs.title') }}</router-link></li>
          <li><router-link to="/contact">{{ t('contact.title') }}</router-link></li>
        </ul>
      </section>

      <section>
        <h3>Authority Articles</h3>
        <ul>
          <li v-for="blog in blogs" :key="blog.slug">
            <router-link :to="`/blogs/${blog.slug}`">{{ blog.title }}</router-link>
          </li>
        </ul>
      </section>

      <section>
        <h3>{{ t('sitemap.sections.legal') }}</h3>
        <ul>
          <li><router-link to="/privacy-policy">{{ t('privacyPolicy.title') }}</router-link></li>
          <li><router-link to="/terms-of-service">{{ t('termsOfService.title') }}</router-link></li>
          <li><router-link to="/disclaimer">{{ t('disclaimer.title') }}</router-link></li>
          <li><router-link to="/cookie-policy">{{ t('cookiePolicy.title') }}</router-link></li>
        </ul>
      </section>

      <section>
        <h3>{{ t('sitemap.sections.tools') }}</h3>
        <div class="tools-list">
          <router-link v-for="tool in toolStore.tools" :key="tool.path" :to="tool.path" class="tool-link">
            {{ tool.name }}
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sitemap-page {
  max-width: 900px;
  margin: 60px auto;
  padding: 0 20px;

  .sitemap-desc {
    text-align: center;
    margin-bottom: 40px;
    opacity: 0.8;
  }

  .sitemap-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;

    section {
      h3 {
        margin-bottom: 20px;
        border-bottom: 2px solid var(--primary-color);
        display: inline-block;
        padding-bottom: 5px;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 10px;

          .router-link {
            text-decoration: none;
            color: var(--text-color);
            transition: color 0.2s;

            &:hover {
              color: var(--primary-color);
            }
          }
        }
      }
    }

    .tools-list {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .tool-link {
        text-decoration: none;
        color: var(--text-color);
        font-size: 0.9rem;
        transition: transform 0.2s, color 0.2s;

        &:hover {
          color: var(--primary-color);
          transform: translateX(5px);
        }
      }
    }
  }
}
</style>

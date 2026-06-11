<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

import BaseLayout from './base.layout.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import RelatedTools from '@/components/RelatedTools.vue';
import { useToolStore } from '@/tools/tools.store';
import type { Tool } from '@/tools/tools.types';
import { blogs } from '@/data/blogs.data';
import { Book } from '@vicons/tabler';
import { NIcon } from 'naive-ui';

const route = useRoute();
const toolStore = useToolStore();

const head = computed<HeadObject>(() => ({
  title: `${route.meta.name} - Armytool`,
  meta: [
    {
      name: 'description',
      content: route.meta?.description as string,
    },
    {
      name: 'keywords',
      content: ((route.meta.keywords ?? []) as string[]).join(','),
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': route.meta.name,
        'description': route.meta.description,
        'applicationCategory': 'DeveloperApplication',
        'operatingSystem': 'Any',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
      }),
    },
  ],
}));
useHead(head);
const { t } = useI18n();

const i18nKey = computed<string>(() => route.path.trim().replace('/', ''));
const toolTitle = computed<string>(() => t(`tools.${i18nKey.value}.title`, String(route.meta.name)));
const toolDescription = computed<string>(() => t(`tools.${i18nKey.value}.description`, String(route.meta.description)));

const currentTool = computed(() => toolStore.tools.find(t => t.path === route.path));
const relatedTools = computed(() => {
  if (!currentTool.value) return [];
  return toolStore.tools.filter(t => t.category === currentTool.value.category && t.path !== route.path);
});

const relatedBlogs = computed(() => {
  if (!currentTool.value) return [];
  const toolKeywords = (route.meta.keywords as string[]) || [];
  return blogs.filter((blog) => {
    const matchesCategory = blog.category.toLowerCase() === currentTool.value?.category?.toLowerCase();
    const matchesTags = blog.tags.some(tag =>
      toolKeywords.some(keyword => keyword.toLowerCase() === tag.toLowerCase())
      || currentTool.value?.name.toLowerCase().includes(tag.toLowerCase()),
    );
    return matchesCategory || matchesTags;
  }).slice(0, 3);
});

// Load details.md if it exists
const toolDetailsFiles = import.meta.glob('../tools/*/details.md');
const detailsComponent = computed(() => {
  const toolSlug = route.path.split('/').pop();
  const path = `../tools/${toolSlug}/details.md`;
  if (toolDetailsFiles[path]) {
    return defineAsyncComponent(toolDetailsFiles[path] as () => Promise<any>);
  }
  return null;
});
</script>

<template>
  <BaseLayout>
    <div class="tool-layout-container">
      <div class="main-content">
        <div class="tool-layout">
          <div class="tool-header">
            <div flex flex-nowrap items-center justify-between>
              <n-h1>
                {{ toolTitle }}
              </n-h1>

              <div>
                <FavoriteButton :tool="{ name: route.meta.name, path: route.path } as Tool" />
              </div>
            </div>

            <div class="separator" />

            <div class="description">
              {{ toolDescription }}
            </div>
          </div>
        </div>

        <div class="tool-content">
          <slot />
        </div>
      </div>

      <aside class="sidebar">
        <RelatedTools v-if="relatedTools.length > 0" :tools="relatedTools" />

        <div v-if="relatedBlogs.length > 0" class="related-blogs mt-40px">
          <div class="sidebar-title mb-20px flex items-center gap-8px text-18px font-600 opacity-80">
            <NIcon :component="Book" />
            Authority Guides
          </div>
          <div class="flex flex-col gap-16px">
            <RouterLink
              v-for="blog in relatedBlogs"
              :key="blog.slug"
              :to="`/blogs/${blog.slug}`"
              class="blog-card block rounded-8px border border-neutral-200 p-16px transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              <div class="mb-4px text-14px font-600 leading-tight">
                {{ blog.title }}
              </div>
              <div class="text-12px opacity-60">
                {{ blog.date }} • {{ blog.category }}
              </div>
            </RouterLink>
          </div>
        </div>
      </aside>
    </div>

    <div v-if="detailsComponent" class="tool-details-wrapper">
      <div class="tool-details-content">
        <component :is="detailsComponent" />
      </div>
    </div>
  </BaseLayout>
</template>

<style lang="less" scoped>
.tool-layout-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 600px;
}

.sidebar {
  width: 280px;
  position: sticky;
  top: 20px;
  margin-top: 40px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(128, 128, 128, 0.2);
    border-radius: 3px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 600px;
    position: static;
    margin-top: 20px;
    max-height: none;
    overflow-y: visible;
  }
}

.tool-details-wrapper {
  margin-top: 80px;
  padding: 40px 20px;
  background-color: rgba(128, 128, 128, 0.05);
  border-top: 1px solid rgba(128, 128, 128, 0.1);
  display: flex;
  justify-content: center;

  .tool-details-content {
    max-width: 800px;
    width: 100%;
    line-height: 1.6;

    :deep(h2) {
      margin-top: 40px;
      margin-bottom: 20px;
      font-size: 1.8rem;
    }

    :deep(h3) {
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 1.4rem;
    }

    :deep(p) {
      margin-bottom: 15px;
    }

    :deep(ul), :deep(ol) {
      margin-bottom: 20px;
      padding-left: 20px;
    }

    :deep(li) {
      margin-bottom: 8px;
    }

    :deep(pre) {
      background-color: rgba(0, 0, 0, 0.1);
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
      margin-bottom: 20px;
    }
  }
}
.tool-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;

  ::v-deep(& > *) {
    flex: 0 1 600px;
  }
}

.tool-layout {
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;

  .tool-header {
    padding: 40px 0;
    width: 100%;

    .n-h1 {
      opacity: 0.9;
      font-size: 40px;
      font-weight: 400;
      margin: 0;
      line-height: 1;
    }

    .separator {
      width: 200px;
      height: 2px;
      background: rgb(161, 161, 161);
      opacity: 0.2;

      margin: 10px 0;
    }

    .description {
      margin: 0;

      opacity: 0.7;
    }
  }
}
</style>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

import BaseLayout from './base.layout.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const route = useRoute();

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
}));
useHead(head);
const { t } = useI18n();

const i18nKey = computed<string>(() => route.path.trim().replace('/', ''));
const toolTitle = computed<string>(() => t(`tools.${i18nKey.value}.title`, String(route.meta.name)));
const toolDescription = computed<string>(() => t(`tools.${i18nKey.value}.description`, String(route.meta.description)));

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

    <div v-if="detailsComponent" class="tool-details-wrapper">
      <div class="tool-details-content">
        <component :is="detailsComponent" />
      </div>
    </div>
  </BaseLayout>
</template>

<style lang="less" scoped>
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

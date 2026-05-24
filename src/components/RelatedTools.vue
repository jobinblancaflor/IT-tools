<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import type { ToolWithCategory } from '@/tools/tools.types';

const props = defineProps<{
  tools: ToolWithCategory[];
}>();

const themeVars = useThemeVars();
</script>

<template>
  <div class="related-tools">
    <h3 class="title">
      {{ $t('relatedTools.title', 'Related Tools') }}
    </h3>
    <div class="links">
      <router-link
        v-for="tool in tools"
        :key="tool.path"
        :to="tool.path"
        class="tool-link"
      >
        <n-icon :component="tool.icon" size="20" class="icon" />
        <span class="name">{{ tool.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="less">
.related-tools {
  padding: 20px;
  background-color: rgba(128, 128, 128, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(128, 128, 128, 0.1);

  .title {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 1.1rem;
    font-weight: 600;
    opacity: 0.8;
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .tool-link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: v-bind('themeVars.textColor2');
    transition: all 0.2s;
    font-size: 0.95rem;

    &:hover {
      color: v-bind('themeVars.primaryColor');
      transform: translateX(4px);
    }

    .icon {
      opacity: 0.7;
    }
  }
}
</style>

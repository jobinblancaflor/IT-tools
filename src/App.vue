<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { NGlobalStyle, NMessageProvider, NNotificationProvider, darkTheme } from 'naive-ui';
import { darkThemeOverrides, lightThemeOverrides } from './themes';
import { layouts } from './layouts';
import { useStyleStore } from './stores/style.store';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);
const styleStore = useStyleStore();

const theme = computed(() => (styleStore.isDarkTheme ? darkTheme : null));
const themeOverrides = computed(() => (styleStore.isDarkTheme ? darkThemeOverrides : lightThemeOverrides));

// index.html is shared by every route, so each route must declare its own canonical URL.
// Unknown URLs are served with HTTP 200 by the SPA fallback, so keep them out of the index.
const SITE_ORIGIN = 'https://www.armytool.site';
const isNotFound = computed(() => route.name === 'NotFound');
useHead(computed(() => {
  if (isNotFound.value) {
    return { meta: [{ name: 'robots', content: 'noindex, follow' }] };
  }
  const path = route.path === '/' ? '' : route.path.replace(/\/+$/, '');
  return { link: [{ rel: 'canonical', href: `${SITE_ORIGIN}${path}` }] };
}));

const { locale } = useI18n();

syncRef(
  locale,
  useStorage('locale', locale),
);
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NMessageProvider placement="bottom">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
        <InstallPrompt />
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style>
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import { NButton, NIcon, NTag, NDivider, NSkeleton } from 'naive-ui';
import { ChevronLeft, Calendar, User, Tag } from '@vicons/tabler';
import { blogs } from '@/data/blogs.data';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const slug = computed(() => route.params.slug as string);
const blog = computed(() => blogs.find(b => b.slug === slug.value));

useHead({
  title: computed(() => (blog.value ? `${blog.value.title} - Armytool` : 'Blog Not Found')),
  meta: [
    {
      name: 'description',
      content: computed(() => blog.value?.description || 'Read this article on Armytool.'),
    },
  ],
});

const BlogContent = computed(() => {
  if (!blog.value) return null;
  // Dynamic import of the markdown file
  return defineAsyncComponent({
    loader: () => import(`../blogs/${slug.value}.md`),
    loadingComponent: NSkeleton,
    errorComponent: {
      template: '<div class="text-red-500">Error loading blog content.</div>',
    },
  });
});

function goBack() {
  router.push('/blogs');
}
</script>

<template>
  <div class="pt-50px px-20px pb-100px">
    <div v-if="blog" class="max-w-800px mx-auto">
      <n-button text class="mb-30px" @click="goBack">
        <template #icon>
          <n-icon :component="ChevronLeft" />
        </template>
        {{ t('blogs.backToList') }}
      </n-button>

      <h1 class="text-40px font-800 leading-tight mb-20px">
        {{ blog.title }}
      </h1>

      <div class="flex flex-wrap items-center gap-20px text-neutral-400 mb-30px">
        <div class="flex items-center gap-6px">
          <n-icon :component="Calendar" />
          {{ t('blogs.date') }}: {{ blog.date }}
        </div>
        <div class="flex items-center gap-6px">
          <n-icon :component="User" />
          {{ t('blogs.author') }}: {{ blog.author }}
        </div>
        <div class="flex items-center gap-6px">
          <n-icon :component="Tag" />
          {{ t('blogs.category') }}: {{ blog.category }}
        </div>
      </div>

      <div class="flex flex-wrap gap-8px mb-40px">
        <n-tag v-for="tag in blog.tags" :key="tag" size="medium" :bordered="false" round type="primary">
          {{ tag }}
        </n-tag>
      </div>

      <n-divider />

      <article class="blog-content prose dark:prose-invert max-w-none">
        <component :is="BlogContent" v-if="BlogContent" />
      </article>

      <n-divider class="mt-60px" />

      <div class="flex justify-center mt-40px">
        <n-button round type="primary" size="large" @click="goBack">
          {{ t('blogs.backToList') }}.
        </n-button>
      </div>
    </div>

    <div v-else class="text-center py-100px">
      <h2 class="text-24px mb-20px">
        Blog post not found.
      </h2>
      <n-button type="primary" @click="goBack">
        {{ t('blogs.backToList') }}
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.blog-content {
  font-size: 18px;
  line-height: 1.8;

  ::v-deep(h1) {
    font-size: 32px;
    font-weight: 700;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  ::v-deep(h2) {
    font-size: 26px;
    font-weight: 700;
    margin-top: 35px;
    margin-bottom: 15px;
  }

  ::v-deep(h3) {
    font-size: 22px;
    font-weight: 600;
    margin-top: 30px;
    margin-bottom: 12px;
  }

  ::v-deep(p) {
    margin-bottom: 20px;
  }

  ::v-deep(ul), ::v-deep(ol) {
    margin-bottom: 20px;
    padding-left: 20px;
  }

  ::v-deep(li) {
    margin-bottom: 8px;
  }

  ::v-deep(code) {
    background-color: #f3f4f6;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: monospace;
  }

  .dark & ::v-deep(code) {
    background-color: #374151;
  }

  ::v-deep(pre) {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 24px;
  }

  ::v-deep(blockquote) {
    border-left: 4px solid #18a058;
    padding-left: 20px;
    font-style: italic;
    color: #6b7280;
    margin-bottom: 20px;
  }
}
</style>

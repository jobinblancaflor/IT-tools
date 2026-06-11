<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import { NButton, NDivider, NIcon, NSkeleton, NTag } from 'naive-ui';
import { Calendar, ChevronLeft, Tag, User, Tools } from '@vicons/tabler';
import { blogs } from '@/data/blogs.data';
import { useToolStore } from '@/tools/tools.store';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const toolStore = useToolStore();

const slug = computed(() => route.params.slug as string);
const blog = computed(() => blogs.find(b => b.slug === slug.value));

const relatedTools = computed(() => {
  if (!blog.value) return [];
  const blogTags = blog.value.tags || [];
  return toolStore.tools.filter((tool) => {
    const matchesCategory = tool.category?.toLowerCase() === blog.value?.category?.toLowerCase();
    const matchesTags = (tool.keywords || []).some(keyword =>
      blogTags.some(tag => tag.toLowerCase() === keyword.toLowerCase()),
    );
    return matchesCategory || matchesTags;
  }).slice(0, 4);
});

useHead({
  title: computed(() => (blog.value ? `${blog.value.title} - Armytool` : 'Blog Not Found')),
  meta: [
    {
      name: 'description',
      content: computed(() => blog.value?.description || 'Read this article on Armytool.'),
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => {
        if (!blog.value) return '';
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': blog.value.title,
          'description': blog.value.description,
          'author': {
            '@type': 'Organization',
            'name': 'Armytool Team',
          },
          'datePublished': blog.value.date,
          'url': `https://www.armytool.site/blogs/${blog.value.slug}`,
        });
      }),
    },
  ],
});

const BlogContent = computed(() => {
  if (!blog.value) { return null; }
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
  <div class="px-20px pb-100px pt-50px">
    <div v-if="blog" class="mx-auto max-w-800px">
      <NButton text class="mb-30px" @click="goBack">
        <template #icon>
          <NIcon :component="ChevronLeft" />
        </template>
        {{ t('blogs.backToList') }}
      </NButton>

      <h1 class="mb-20px text-40px font-800 leading-tight">
        {{ blog.title }}
      </h1>

      <div class="mb-30px flex flex-wrap items-center gap-20px text-neutral-400">
        <div class="flex items-center gap-6px">
          <NIcon :component="Calendar" />
          {{ t('blogs.date') }}: {{ blog.date }}
        </div>
        <RouterLink to="/about" class="flex items-center gap-6px transition-colors hover:text-primary">
          <NIcon :component="User" />
          {{ t('blogs.author') }}: {{ blog.author }}
        </RouterLink>
        <div class="flex items-center gap-6px">
          <NIcon :component="Tag" />
          {{ t('blogs.category') }}: {{ blog.category }}
        </div>
      </div>

      <div class="mb-40px flex flex-wrap gap-8px">
        <NTag v-for="tag in blog.tags" :key="tag" size="medium" :bordered="false" round type="primary">
          {{ tag }}
        </NTag>
      </div>

      <NDivider />

      <article class="blog-content max-w-none prose dark:prose-invert">
        <component :is="BlogContent" v-if="BlogContent" />
      </article>

      <NDivider class="mt-60px" />

      <div v-if="relatedTools.length > 0" class="related-tools mt-40px">
        <h3 class="mb-20px flex items-center gap-8px text-24px font-700">
          <NIcon :component="Tools" />
          Recommended Tools
        </h3>
        <div class="grid grid-cols-1 gap-20px sm:grid-cols-2">
          <RouterLink
            v-for="tool in relatedTools"
            :key="tool.path"
            :to="tool.path"
            class="flex items-center gap-16px rounded-12px border border-neutral-200 p-20px transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
          >
            <div class="rounded-8px bg-primary/10 p-10px text-primary">
              <NIcon size="24" :component="tool.icon || Tools" />
            </div>
            <div>
              <div class="text-16px font-600">
                {{ tool.name }}
              </div>
              <div class="line-clamp-1 text-14px opacity-60">
                {{ tool.description }}
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <NDivider class="mt-60px" />

      <div class="mt-40px flex justify-center">
        <NButton round type="primary" size="large" @click="goBack">
          {{ t('blogs.backToList') }}.
        </NButton>
      </div>
    </div>

    <div v-else class="py-100px text-center">
      <h2 class="mb-20px text-24px">
        Blog post not found.
      </h2>
      <NButton type="primary" @click="goBack">
        {{ t('blogs.backToList') }}
      </NButton>
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

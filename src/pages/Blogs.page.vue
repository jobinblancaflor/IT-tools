<script setup lang="ts">
import { computed, ref } from 'vue';
import { useHead } from '@vueuse/head';
import { NButton, NCard, NEmpty, NIcon, NInput, NSelect, NTag } from 'naive-ui';
import { Calendar, Search, SortAscending, SortDescending, User } from '@vicons/tabler';
import { blogs } from '@/data/blogs.data';

useHead({
  title: 'Blogs - Armytool',
  meta: [
    { name: 'description', content: 'Explore our in-depth guides and articles about developer tools, security, and productivity.' },
  ],
});

const { t } = useI18n();

const searchQuery = ref('');
const sortBy = ref<'newest' | 'oldest' | 'az' | 'za'>('newest');

const sortOptions = [
  { label: t('blogs.newest'), value: 'newest' },
  { label: t('blogs.oldest'), value: 'oldest' },
  { label: t('blogs.az'), value: 'az' },
  { label: t('blogs.za'), value: 'za' },
];

const filteredBlogs = computed(() => {
  const result = blogs.filter((blog) => {
    const searchLower = searchQuery.value.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchLower)
      || blog.description.toLowerCase().includes(searchLower)
      || blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
      || blog.category.toLowerCase().includes(searchLower)
    );
  });

  result.sort((a, b) => {
    if (sortBy.value === 'newest') { return new Date(b.date).getTime() - new Date(a.date).getTime(); }
    if (sortBy.value === 'oldest') { return new Date(a.date).getTime() - new Date(b.date).getTime(); }
    if (sortBy.value === 'az') { return a.title.localeCompare(b.title); }
    if (sortBy.value === 'za') { return b.title.localeCompare(a.title); }
    return 0;
  });

  return result;
});
</script>

<template>
  <div class="px-20px pb-100px pt-50px">
    <div class="mx-auto max-w-1200px">
      <h1 class="mb-30px text-32px font-700">
        {{ t('blogs.title') }}
      </h1>

      <div class="mb-40px flex flex-col gap-16px md:flex-row">
        <NInput
          v-model:value="searchQuery"
          :placeholder="t('blogs.searchPlaceholder')"
          class="flex-1"
          clearable
        >
          <template #prefix>
            <NIcon :component="Search" />
          </template>
        </NInput>

        <NSelect
          v-model:value="sortBy"
          :options="sortOptions"
          class="w-full md:w-200px"
        >
          <template #prefix>
            <NIcon :component="sortBy === 'az' || sortBy === 'za' ? SortAscending : SortDescending" />
          </template>
        </NSelect>
      </div>

      <div v-if="filteredBlogs.length > 0" class="grid grid-cols-1 gap-20px lg:grid-cols-3 md:grid-cols-2">
        <NCard
          v-for="blog in filteredBlogs"
          :key="blog.slug"
          class="blog-card cursor-pointer transition-shadow hover:shadow-lg"
          @click="$router.push(`/blogs/${blog.slug}`)"
        >
          <template #header>
            <div class="line-clamp-2 min-h-54px text-18px font-600">
              {{ blog.title }}
            </div>
          </template>

          <div class="line-clamp-3 mb-16px min-h-66px text-neutral-500">
            {{ blog.description }}
          </div>

          <template #footer>
            <div class="mb-12px flex flex-wrap gap-8px">
              <NTag v-for="tag in blog.tags" :key="tag" size="small" :bordered="false" round>
                {{ tag }}
              </NTag>
            </div>
            <div class="mt-auto flex items-center justify-between text-12px text-neutral-400">
              <div class="flex items-center gap-4px">
                <NIcon :component="Calendar" />
                {{ blog.date }}
              </div>
              <div class="flex items-center gap-4px">
                <NIcon :component="User" />
                {{ blog.author }}
              </div>
            </div>
          </template>

          <template #action>
            <NButton text type="primary" @click.stop="$router.push(`/blogs/${blog.slug}`)">
              {{ t('blogs.readMore') }}
            </NButton>
          </template>
        </NCard>
      </div>

      <div v-else class="py-100px">
        <NEmpty :description="t('blogs.noResults')" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.blog-card {
  height: 100%;
  display: flex;
  flex-direction: column;

  ::v-deep(.n-card__content) {
    flex: 1;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

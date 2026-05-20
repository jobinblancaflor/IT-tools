<script setup lang="ts">
import { ref, computed } from 'vue';
import { useHead } from '@vueuse/head';
import { NInput, NSelect, NCard, NTag, NButton, NIcon, NEmpty } from 'naive-ui';
import { Search, SortAscending, SortDescending, Calendar, User, Tag } from '@vicons/tabler';
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
  let result = blogs.filter((blog) => {
    const searchLower = searchQuery.value.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchLower) ||
      blog.description.toLowerCase().includes(searchLower) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      blog.category.toLowerCase().includes(searchLower)
    );
  });

  result.sort((a, b) => {
    if (sortBy.value === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy.value === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy.value === 'az') return a.title.localeCompare(b.title);
    if (sortBy.value === 'za') return b.title.localeCompare(a.title);
    return 0;
  });

  return result;
});
</script>

<template>
  <div class="pt-50px px-20px pb-100px">
    <div class="max-w-1200px mx-auto">
      <h1 class="text-32px font-700 mb-30px">
        {{ t('blogs.title') }}
      </h1>

      <div class="flex flex-col md:flex-row gap-16px mb-40px">
        <n-input
          v-model:value="searchQuery"
          :placeholder="t('blogs.searchPlaceholder')"
          class="flex-1"
          clearable
        >
          <template #prefix>
            <n-icon :component="Search" />
          </template>
        </n-input>

        <n-select
          v-model:value="sortBy"
          :options="sortOptions"
          class="w-full md:w-200px"
        >
          <template #prefix>
            <n-icon :component="sortBy === 'az' || sortBy === 'za' ? SortAscending : SortDescending" />
          </template>
        </n-select>
      </div>

      <div v-if="filteredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20px">
        <n-card
          v-for="blog in filteredBlogs"
          :key="blog.slug"
          class="blog-card cursor-pointer hover:shadow-lg transition-shadow"
          @click="$router.push(`/blogs/${blog.slug}`)"
        >
          <template #header>
            <div class="text-18px font-600 line-clamp-2 min-h-54px">
              {{ blog.title }}
            </div>
          </template>

          <div class="text-neutral-500 mb-16px line-clamp-3 min-h-66px">
            {{ blog.description }}
          </div>

          <template #footer>
            <div class="flex flex-wrap gap-8px mb-12px">
              <n-tag v-for="tag in blog.tags" :key="tag" size="small" :bordered="false" round>
                {{ tag }}
              </n-tag>
            </div>
            <div class="flex items-center justify-between text-12px text-neutral-400 mt-auto">
              <div class="flex items-center gap-4px">
                <n-icon :component="Calendar" />
                {{ blog.date }}
              </div>
              <div class="flex items-center gap-4px">
                <n-icon :component="User" />
                {{ blog.author }}
              </div>
            </div>
          </template>

          <template #action>
            <n-button text type="primary" @click.stop="$router.push(`/blogs/${blog.slug}`)">
              {{ t('blogs.readMore') }}
            </n-button>
          </template>
        </n-card>
      </div>

      <div v-else class="py-100px">
        <n-empty :description="t('blogs.noResults')" />
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

<script setup lang="ts">
import { useCopy } from '@/composable/copy';
import { getBasicAuthValue, generateBasicAuthHeader } from './basic-auth-generator.service';

const username = ref('');
const password = ref('');
const encodedValue = computed(() => getBasicAuthValue(username.value, password.value));
const header = computed(() => generateBasicAuthHeader(username.value, password.value));

const { copy } = useCopy({ source: header, text: 'Header copied to the clipboard' });
</script>

<template>
  <div>
    <c-input-text
      v-model:value="username"
      label="Username"
      placeholder="Your username..."
      clearable
      raw-text
      mb-5
    />
    <c-input-text
      v-model:value="password"
      label="Password"
      placeholder="Your password..."
      clearable
      raw-text
      mb-2
      type="password"
    />

    <c-card>
      <n-statistic label="Authorization header:" class="header">
        <div flex items-center>
          <span mr-2 font-bold select-none>Authorization:</span>
          <n-scrollbar x-scrollable style="max-width: 450px; margin-bottom: -10px; padding-bottom: 10px" trigger="none">
            {{ encodedValue }}
          </n-scrollbar>
        </div>
      </n-statistic>
    </c-card>
    <div mt-5 flex justify-center>
      <c-button @click="copy()">
        Copy header
      </c-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
::v-deep(.n-statistic-value__content) {
  font-family: monospace;
  font-size: 17px !important;
  white-space: nowrap;
}
</style>

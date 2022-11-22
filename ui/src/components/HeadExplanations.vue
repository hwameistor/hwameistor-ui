<template>
  <dao-expansion
    v-if="explanationsDisplay.length"
    type="doc"
    class="mb-[20px]"
  >
    <template
      v-for="item in explanationsDisplay"
      :key="item.key"
    >
      <dao-expansion-item
        :name="item.key"
        :title="item.title"
        @close="hideExplanation(item.key)"
      >
        {{ item.content }}
      </dao-expansion-item>
    </template>
  </dao-expansion>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { explanationsList } from '@/constant/explanationList';

/**
 * 名词解释组件，
 * key 需要唯一
 */
const props = defineProps({
  pageName: {
    type: String,
    default: '',
    validator: (val: string) => Object.keys(explanationsList.value).includes(val),
  },
});

const storage = useLocalStorage('HWAMEISTOR_EXPLAIN', {} as Record<string, unknown>);

const explanationsDisplay = computed(() => (explanationsList.value[props.pageName] ?? [])
  .filter((item) => storage.value[item.key] ?? true));

const hideExplanation = (pageKey: string) => {
  storage.value[pageKey] = false;
};
</script>

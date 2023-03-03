<template>
  <dao-tooltip :disabled="!total">
    <span v-if="total">{{ `${percent}%` }}</span>
    <span v-else>-</span>

    <template #content>
      {{ bytesToUnitDisplay(used) }} / {{ bytesToUnitDisplay(total) }}
    </template>
  </dao-tooltip>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';

const props = defineProps({
  used: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
});

const percent = computed(() => ((props.used * 100) / props.total).toFixed(0));
</script>

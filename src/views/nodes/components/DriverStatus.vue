<template>
  <dao-state-icon
    v-if="status"
    :type="color"
  >
    {{ $t(`views.nodes.components.DriverStatus.${status}`) }}
  </dao-state-icon>

  <span v-else>-</span>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { DaoStateIcon, type StateIconType } from '@dao-style/extend';

const props = defineProps({
  status: {
    type: String,
    default: '',
  },
});

const color = computed<StateIconType>(() => {
  const colorMap: Record<string, StateIconType> = {
    Ready: 'success',
    Maintain: 'warning',
    Offline: 'error',
  };

  return colorMap[props.status] || 'default';
});
</script>

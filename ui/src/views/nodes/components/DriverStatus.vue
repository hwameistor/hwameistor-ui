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
import { defineProps, PropType, computed } from 'vue';
import { DaoStateIcon, type StateIconType } from '@dao-style/extend';
import { DriverStatus } from '@/services/NodeService';

const props = defineProps({
  status: {
    type: String as PropType<DriverStatus>,
    default: '',
  },
});

const color = computed<StateIconType>(() => {
  const colorMap: Record<DriverStatus, StateIconType> = {
    [DriverStatus.Ready]: 'success',
    [DriverStatus.Maintain]: 'warning',
    [DriverStatus.Offline]: 'error',
  };

  return colorMap[props.status] || 'default';
});
</script>

<template>
  <dao-state-icon
    v-if="status"
    :type="color"
  >
    {{ $t(`components.NodeStatus.${status}`) }}
  </dao-state-icon>

  <span v-else>-</span>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue';
import { DaoStateIcon, type StateIconType } from '@dao-style/extend';
import { NodeStatus } from '@/services/NodeService';

const props = defineProps({
  status: {
    type: String as PropType<NodeStatus>,
    default: '',
  },
});

const color = computed<StateIconType>(() => {
  const colorMap: Record<NodeStatus, StateIconType> = {
    [NodeStatus.Ready]: 'success',
    [NodeStatus.NotReady]: 'error',
    [NodeStatus.Unknown]: 'default',
  };

  return colorMap[props.status] || 'default';
});
</script>

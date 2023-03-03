<template>
  <div class="component-panel-item">
    <div class="component-panel-item__name">
      {{ name }}
    </div>

    <dao-label-extend
      :color="statusColorMap[status]"
      class="flex-none"
    >
      {{ $t(`views.dashboard.components.ComponentPanelItem.statuses.${status}`) }}
    </dao-label-extend>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue';
import { DaoLabelExtend, type LabelColorType } from '@dao-style/extend';

defineProps({
  name: {
    type: String,
    default: '',
  },
  status: {
    type: String as PropType<'NotReady' | 'Running'>,
    default: '',
  },
});

const statusColorMap: Record<'NotReady' | 'Running', LabelColorType> = {
  NotReady: 'red',
  Running: 'green',
};
</script>

<style lang="scss">
.component-panel-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 5px;
  font-size: 13px;
  font-weight: 600;
  color: var(--dao-gray-010);
  background-color: #f3f5f8;
  border-radius: 4px;

  &__name {
    margin-right: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

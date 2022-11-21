<template>
  <div class="gauge-panel-item">
    <div
      v-if="markColor"
      class="gauge-panel-item__mark"
      :style="{'background-color': markColor}"
    />
    <div class="gauge-panel-item__label">
      {{ label }}
    </div>
    <div class="gauge-panel-item__value">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  label: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number],
    default: '',
  },
  markColor: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.gauge-panel-item {
  display: flex;
  align-items: center;
  height: 36px;
  padding-right: 16px;
  padding-left: 16px;
  font-size: 13px;
  border-top: 1px solid var(--dao-gray-blue-090);

  &__mark {
    flex: none;
    width: 8px;
    height: 8px;
    margin-right: 4px;
    border-radius: 1px;
  }

  &__label {
    flex: 1 1 auto;
    margin-right: 10px;
    overflow: hidden;
    color: var(--dao-gray-040);
    text-overflow: ellipsis;
  }

  &__value {
    font-weight: 700;
    color: var(--dao-gray-010);
  }
}
</style>

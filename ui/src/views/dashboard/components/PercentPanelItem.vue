<template>
  <div class="percent-panel-item">
    <div class="percent-panel-item__label">
      {{ label }}
    </div>

    <div class="percent-panel-item__percent">
      <div
        class="percent-panel-item__percent-block"
        :style="{'width': computedPercent}"
      />
      <div class="percent-panel-item__percent-content">
        <div class="percent-panel-item__percent-content-value">
          {{ computedPercent }}
        </div>
        <div class="percent-panel-item__percent-content-info">
          <span
            v-if="percentLabelPrefix"
            class="mr-[2px]"
          >{{ percentLabelPrefix }}</span>
          <span>{{ $t('views.dashboard.components.PercentPanelItem.usageRate') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  percent: {
    type: Number,
    default: 0,
  },
  percentLabelPrefix: {
    type: String,
    default: '',
  },
});

const computedPercent = computed<string>(() => `${(props.percent * 100).toFixed(0)}%`);
</script>

<style lang="scss" scoped>
.percent-panel-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  background-color: #f9fafb;

  &__percent {
    position: relative;
    flex: none;
    width: 120px;
    height: 100%;

    &-block {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: var(--dao-acidblue-080);
    }

    &-content {
      position: relative;
      z-index: 100;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding-left: 10px;

      &-value {
        font-size: 13px;
        font-weight: 600;
        line-height: 20px;
        color: var(--dao-gray-010);
      }

      &-info {
        font-size: 12px;
        line-height: 1;
        color: var(--dao-gray-040);
      }
    }
  }
}
</style>

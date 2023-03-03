<template>
  <div class="gauge-chart-container">
    <div class="gauge-chart">
      <div class="gauge-chart__graph">
        <dao-percent-chart
          :used="used"
          radius="90px"
          inner-radius="75px"
          :unused-color="unusedColor"
          :used-color="usedColor"
          :padding="0"
          :total="computedTotal"
          :start-angle="270"
          :label-formatter="() => ''"
          :hover="{ disabled: true }"
        />
      </div>
      <div class="gauge-chart__label">
        <slot>
          <div class="gauge-chart__label-count">
            {{ count }}
          </div>
        </slot>
        <div class="gauge-chart__label-label">
          {{ label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { DaoPercentChart } from '@dao-style/v-chart';

const props = defineProps({
  used: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 1,
  },
  usedColor: {
    type: String,
    default: '#4BB0ED',
  },
  unusedColor: {
    type: String,
    default: '#E4E7ED',
  },
  count: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
});

const computedTotal = computed(() => props.total * 2);
</script>

<style lang="scss" scoped>
.gauge-chart {
  position: relative;
  height: 90px;
  overflow: hidden;

  &-container {
    height: 100%;
    padding-top: 20px;
  }

  &__graph {
    position: absolute;
    left: 50%;
    width: 180px;
    height: 180px;
    transform: translateX(-50%);
  }

  &__label {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    &-count {
      font-size: 26px;
      font-weight: 700;
      line-height: 30px;
      color: var(--dao-gray-010);
      text-align: center;
    }

    &-label {
      font-size: 13px;
      line-height: 20px;
      color: var(--dao-gray-040);
      text-align: center;
    }
  }
}
</style>

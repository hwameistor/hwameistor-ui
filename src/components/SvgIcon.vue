<template>
  <!-- eslint-disable-next-line vuejs-accessibility/alt-text -->
  <img
    v-if="isNeedShow"
    :src="images[name]"
  >
</template>

<script setup lang='ts'>
import { defineProps, computed } from 'vue';
import getSvgAsset from '@/assets/svg';

const images = getSvgAsset();
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});

const isNeedShow = computed(() => !!images[props.name]);
</script>

<template>
  <div class="global-header">
    <img
      src="../assets/logo@2x.png"
      alt="hwameistor"
      class="global-header__logo"
    >

    <dao-select
      size="sm"
      :model-value="locale"
      class="global-header__locale"
      menu-class="global-header__locale-menu"
      @change="setLocale"
    >
      <dao-option
        value="en-US"
        label="English"
      />
      <dao-option
        value="zh-CN"
        label="简体中文"
      />
    </dao-select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { loadLanguageAsync } from '@/plugins';

const store = useLocalStorage('hwameistor-locale', 'en-US');

const locale = computed(() => store.value);

const setLocale = (val: string) => {
  store.value = val;

  loadLanguageAsync(val);
};
</script>

<style lang="scss">
.global-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 14px;
  background-color: var(--dao-top-gray-010);

  &__logo {
    height: 50px;
  }

  &__locale.dao-select {
    background-color: transparent;

    .dao-selection {
      color: #dbe4ed;
      background-color: transparent;
      border: 0;
      box-shadow: none !important;
    }
  }

  &__locale-menu {
    margin-top: 9px !important;
  }
}
</style>

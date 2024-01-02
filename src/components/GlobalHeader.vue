<template>
  <div class="global-header">
    <img
      src="../assets/logo@2x.png"
      alt="hwameistor"
      class="global-header__logo"
    >

    <div>
      <dao-select
        size="sm"
        :model-value="locale"
        class="global-header__locale"
        menu-class="global-header__locale-menu"
        @change="setLocale"
      >
        <dao-option
          value="en-US"
          :label="$t('components.GlobalHeader.en-US')"
        />
        <dao-option
          value="zh-CN"
          :label="$t('components.GlobalHeader.zh-CN')"
        />
      </dao-select>

      <button
        v-if="authStore.isAuthEnable"
        class="global-header__logout"
        @click="logout"
      >
        {{ $t('components.GlobalHeader.logout') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { loadLanguageAsync } from '@/plugins';
import { Auth } from '@/services/Auth';
import useAuthStore from '@/store.ts/auth';
import Cookies from 'js-cookie';
import TOKEN_KEY from '@/constant/token';

const AuthApi = new Auth();

const store = useLocalStorage('hwameistor-locale', 'en-US');
const authStore = useAuthStore();

const locale = computed(() => store.value);

const setLocale = (val: string) => {
  store.value = val;

  loadLanguageAsync(val);
};

const logout = async () => {
  await AuthApi.authLogoutCreate();
  Cookies.remove(TOKEN_KEY);

  window.location.reload();
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

  &__logout {
    margin-left: 8px;
    font-size: 13px;
    color: var(--dao-navigation-090);
  }
}
</style>

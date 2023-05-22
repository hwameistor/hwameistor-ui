<template>
  <global-header class="app__header" />
  <div class="app__body">
    <dao-nav
      type="2nd"
      class="app__body-nav"
    >
      <router-link
        v-for="(route, index) in navRoutes"
        :key="index"
        v-slot="{isActive, navigate}"
        :to="route.to"
        custom
      >
        <dao-nav-sub
          :index="index"
          :icon="route.icon"
          :title="route.display"
          :fold="false"
          :is-active="isActive"
          use-font
          @click="navigate"
        />
      </router-link>
    </dao-nav>

    <div class="app__body-content">
      <router-view v-if="authInit" />
    </div>
  </div>
  <dialog-wrapper />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import { useI18n } from 'vue-i18n';
import GlobalHeader from '@/components/GlobalHeader.vue';
import { DialogWrapper, createDialog } from '@dao-style/extend';
import { Auth } from '@/services/Auth';
import TOKEN_KEY from '@/constant/token';
import Cookies from 'js-cookie';
import replaceFetch from '@/plugins/fetch/index';
import LoginDialog from '@/components/dialogs/LoginDialog.vue';
import useAuthStore from '@/store.ts/auth';

type NavRouteType = {
  to: RouteLocationRaw;
  display: string;
  icon?: string;
}

const { t } = useI18n();
const AuthApi = new Auth();

const authStore = useAuthStore();

const authInit = ref<boolean>(false);

const navRoutes = computed<NavRouteType[]>(() => [
  {
    to: { name: 'Dashboard' },
    display: t('App.nav.dashboard'),
    icon: 'icon-meter',
  },
  {
    to: { name: 'Node' },
    display: t('App.nav.node'),
    icon: 'icon-server',
  },
  {
    to: { name: 'Pool' },
    display: t('App.nav.pool'),
    icon: 'icon-disc',
  },
  {
    to: { name: 'LocaleVolume' },
    display: t('App.nav.lv'),
    icon: 'icon-database',
  },
  {
    to: { name: 'Settings' },
    display: t('App.nav.settings'),
    icon: 'icon-setting',
  },
]);

const init = async () => {
  const { data } = await AuthApi.authInfoList();

  authStore.enableAuth = data.enabled ?? false;

  if (!data.enabled) {
    authInit.value = true;

    return;
  }

  const token = Cookies.get(TOKEN_KEY);

  if (!token) {
    const dialog = createDialog(LoginDialog);

    await dialog.show();
  }

  replaceFetch();
  authInit.value = true;
};

init();
</script>

<style lang="scss">
@import '@/assets/tailwind.scss';
@import '@/assets/common.scss';

* {
  box-sizing: border-box;
}

body,
html {
  min-width: 1280px;
  height: 100%;
  min-height: 100%;
  overflow: auto;
}

/* stylelint-disable-next-line selector-max-id */
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--dao-gray-blue-090);
}

.app {
  &__header {
    flex: none;
  }

  &__body {
    display: flex;
    flex: 1 1 0;
    overflow: auto;

    &-nav {
      flex: none;
    }

    &-content {
      flex: 1 1 0;
      overflow: hidden;
      overflow: auto;
    }
  }
}
</style>

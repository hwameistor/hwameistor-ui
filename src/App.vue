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
      <router-view />
    </div>
  </div>
  <dialog-wrapper />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import { useI18n } from 'vue-i18n';
import GlobalHeader from '@/components/GlobalHeader.vue';
import { DialogWrapper } from '@dao-style/extend';

type NavRouteType = {
  to: RouteLocationRaw;
  display: string;
  icon?: string;
}

const { t } = useI18n();

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

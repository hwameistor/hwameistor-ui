<template>
  <p>{{ t('common.message') }}</p>
  <p>{{ t('views.page.content') }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'HelloI18n',
  setup() {
    const { t } = useI18n();

    // Something todo ..
    return { t };
  },
});
</script>

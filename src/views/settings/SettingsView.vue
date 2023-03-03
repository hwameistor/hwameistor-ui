<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header :title="$t('App.nav.settings')" />

    <dao-form-group :title="$t('views.settings.SettingsView.highAvailableSetting')">
      <dao-form
        v-slot="{classNames}"
        class="bg-white pt-[15px]"
      >
        <dao-form-item :label="$t('views.settings.SettingsView.highAvailable')">
          <div :class="classNames.wrapper.text">
            {{ $t(`views.settings.SettingsView.drbdStatus.${setting?.enable ? 'on' : 'off'}`) }}
          </div>

          <dao-helper-text v-if="!setting?.enable">
            {{ $t('views.settings.SettingsView.drbdHelper') }}
          </dao-helper-text>
        </dao-form-item>

        <dao-form-item
          v-if="setting?.enable"
          :label="$t('views.settings.SettingsView.version')"
        >
          <div :class="classNames.wrapper.text">
            {{ setting.version }}
          </div>
        </dao-form-item>
      </dao-form>
    </dao-form-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Setting } from '@/services/Setting';
import type { ApiDrbdEnableSetting } from '@/services/data-contracts';

const SettingApi = new Setting();

const setting = ref<ApiDrbdEnableSetting>();

const getSetting = async () => {
  const res = await SettingApi.drbdList();

  setting.value = res.data;
};

getSetting();
</script>

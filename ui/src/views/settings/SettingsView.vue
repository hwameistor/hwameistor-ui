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
            {{ $t(`views.settings.SettingsView.drbdStatus.${setting?.enabledrbd ? 'on' : 'off'}`) }}
          </div>

          <dao-helper-text v-if="!setting?.enabledrbd">
            {{ $t('views.settings.SettingsView.drbdHelper') }}
          </dao-helper-text>
        </dao-form-item>

        <dao-form-item
          v-if="setting?.enabledrbd"
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
import { type GetSettingResult, Setting } from '@/services/SettingService';

const setting = ref<GetSettingResult>();

const getSetting = async () => {
  const res = await Setting.GetSetting({});

  setting.value = res;
};

getSetting();
</script>

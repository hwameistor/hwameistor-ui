<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header type="3rd">
      <template #breadcrumb>
        <dao-breadcrumb
          :list="[
            {
              label: $t('App.nav.lv'),
              to: { name: 'LocalVolumeList' },
            },
            {
              value: volumeName,
            },
          ]"
          @navigate="$router.push"
        />
      </template>
    </dao-header>

    <dao-card
      type="simple"
      :title="$t('views.local-volumes.LocalVolumeDetail.basicInfo')"
    >
      <dao-card-item>
        <dao-key-value-layout
          :column="5"
          direction="vertical"
        >
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.status')"
            :value="volumeDetail?.status?.state"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.replicas')"
            :value="volumeDetail?.spec?.replicaNumber"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.capacity')"
            :value="bytesToUnitDisplay(volumeDetail?.spec?.requiredCapacityBytes)"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.convertible')"
            :value="$t(`views.local-volumes.LocalVolumeDetail.convertibleStatus.${volumeDetail?.spec?.convertible ? 'open' : 'close'}`)"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.namespace')"
            :value="volumeDetail?.spec?.pvcNamespace"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.pvc')"
            :value="volumeDetail?.spec?.pvcName"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.created')"
            :value="useDateFormat(volumeDetail?.metadata?.creationTimestamp)"
          />
          <dao-key-value-layout-item
            label="IOPS /s（QoS）"
            :value="volumeDetail?.spec?.volumeQoS?.iops"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.throughput')"
            :value="volumeDetail?.spec?.volumeQoS?.throughput"
          />
        </dao-key-value-layout>
      </dao-card-item>
    </dao-card>

    <dao-tabs
      class="mt-[20px]"
      :model-value="activeTab.routeName"
      type="card"
      @click="changeTab"
    >
      <dao-tab-item
        v-for="{ key, routeName, display } in tabs"
        :key="key"
        :value="routeName"
        :label="display"
      />
    </dao-tabs>

    <router-view :volume="volumeName" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DaoKeyValueLayout, DaoKeyValueLayoutItem, useDateFormat } from '@dao-style/extend';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { Volume } from '@/services/Volume';
import type { ApiVolume } from '@/services/data-contracts';
import { type RouteTab } from '@/types/tab';
import { useI18n } from 'vue-i18n';

const VolumeAPi = new Volume();

const route = useRoute();
const router = useRouter();
const volumeName = ref<string>(route.params.name as string);
const volumeDetail = ref<ApiVolume>();

const getVolumeDetail = async () => {
  const { data } = await VolumeAPi.volumesDetail(volumeName.value);

  volumeDetail.value = data;
};

getVolumeDetail();

const { t } = useI18n();

const tabs = computed<RouteTab[]>(() => [
  {
    key: 'replicas',
    routeName: 'LocalVolumeReplicas',
    display: t('views.local-volumes.LocalVolumeDetail.volumeReplicas'),
  },
  {
    key: 'snapshots',
    routeName: 'LocalVolumeSnapshots',
    display: t('views.local-volumes.LocalVolumeDetail.snapshot'),
  },
  {
    key: 'operations',
    routeName: 'LocalVolumeOperations',
    display: t('views.local-volumes.LocalVolumeDetail.actionRecords'),
  },
]);

const activeTab = computed<RouteTab>(() => {
  const target = tabs.value.find((tab) => tab.routeName === router.currentRoute.value.name);

  return target || tabs.value[0];
});

const changeTab = (event: Event, routeName: string) => {
  router.push({ name: routeName });
};
</script>

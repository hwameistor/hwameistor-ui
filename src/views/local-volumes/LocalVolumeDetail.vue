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
          :column="4"
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
        </dao-key-value-layout>
      </dao-card-item>
    </dao-card>

    <div class="dao-card dao-card--simple mt-[20px]">
      <div class="dao-card-header">
        <div class="dao-card-header-item dao-card-header-title">
          {{ $t('views.local-volumes.LocalVolumeDetail.volumeReplicas') }}
        </div>
      </div>
    </div>

    <local-volume-replicas :volume="volumeName" />

    <div class="dao-card dao-card--simple mt-[20px]">
      <div class="dao-card-header">
        <div class="dao-card-header-item dao-card-header-title">
          {{ $t('views.local-volumes.LocalVolumeDetail.actionRecords') }}
        </div>
      </div>
    </div>

    <local-volume-operations :volume="volumeName" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { DaoKeyValueLayout, DaoKeyValueLayoutItem, useDateFormat } from '@dao-style/extend';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { Volume } from '@/services/Volume';
import type { ApiVolume } from '@/services/data-contracts';
import LocalVolumeReplicas from './components/LocalVolumeReplicas.vue';
import LocalVolumeOperations from './components/LocalVolumeOperations.vue';

const VolumeAPi = new Volume();

const route = useRoute();
const volumeName = ref<string>(route.params.name as string);
const volumeDetail = ref<ApiVolume>();

const getVolumeDetail = async () => {
  const { data } = await VolumeAPi.volumesDetail(volumeName.value);

  volumeDetail.value = data;
};

getVolumeDetail();
</script>

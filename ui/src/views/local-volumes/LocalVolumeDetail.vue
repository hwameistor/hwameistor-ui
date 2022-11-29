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
            :value="volumeDetail?.state"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.replicas')"
            :value="volumeDetail?.replicaNumber"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.capacity')"
            :value="bytesToUnitDisplay(volumeDetail?.requiredCapacityBytes)"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.convertible')"
            :value="$t(`views.local-volumes.LocalVolumeDetail.convertibleStatus.${volumeDetail?.convertible ? 'open' : 'close'}`)"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.namespace')"
            :value="volumeDetail?.pvcNamespace"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.pvc')"
            :value="volumeDetail?.pvcName"
          />
          <dao-key-value-layout-item
            :label="$t('views.local-volumes.LocalVolumeDetail.created')"
            :value="useDateFormat(volumeDetail?.createTime)"
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
import { LocalVolume, type GetLocalVolumeResult } from '@/services/LocalVolumeService';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import LocalVolumeReplicas from './components/LocalVolumeReplicas.vue';
import LocalVolumeOperations from './components/LocalVolumeOperations.vue';

const route = useRoute();
const volumeName = ref<string>(route.params.name as string);
const volumeDetail = ref<GetLocalVolumeResult>();

const getVolumeDetail = async () => {
  const res = await LocalVolume.GetLocalVolume({
    name: volumeName.value,
  });

  volumeDetail.value = res;
};

getVolumeDetail();
</script>

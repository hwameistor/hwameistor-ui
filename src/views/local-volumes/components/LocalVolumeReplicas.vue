<template>
  <dao-table
    id="local-volume-replica-list"
    v-model:search="search"
    :data="items"
    :search-options="searchOptions"
    :columns="columns"
    :page-layout="[]"
    no-rounded
    @search="queryLocalVolumeReplicas"
    @refresh="queryLocalVolumeReplicas"
  >
    <template #td-name="{row}">
      {{ row.metadata?.name }}
    </template>

    <template #td-state="{row}">
      {{ row.status?.state }}
    </template>

    <template #td-synced="{row}">
      {{ $t(`views.local-volumes.components.LocalVolumeReplicas.syncStates.${row.status?.synced ? 'synced' : 'notSync'}`) }}
    </template>

    <template #td-nodeName="{row}">
      {{ row.spec?.nodeName }}
    </template>

    <template #td-requiredCapacityBytes="{row}">
      {{ bytesToUnitDisplay(row.spec?.requiredCapacityBytes) }}
    </template>

    <template #td-devicePath="{row}">
      {{ row.status?.storagePath }}
    </template>
  </dao-table>
</template>

<script setup lang="ts">
import {
  reactive, computed, defineProps, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { Volume } from '@/services/Volume';
import type { ApiVolumeReplica } from '@/services/data-contracts';
import type { SearchOption, SearchValue } from '@dao-style/core/dist/components/toolbar/types';

const props = defineProps({
  volume: {
    type: String,
    default: '',
  },
});

const VolumeAPi = new Volume();

const { t } = useI18n();
const items = ref<ApiVolumeReplica[]>([]);
const search = reactive<Record<string, SearchValue[]>>({});
const searchOptions = computed<SearchOption[]>(() => [
  {
    key: 'volumeReplicaName',
    label: t('views.local-volumes.components.LocalVolumeReplicas.name'),
    single: true,
  },
  {
    key: 'state',
    label: t('views.local-volumes.components.LocalVolumeReplicas.status'),
    single: true,
  },
]);

const columns = computed(() => [
  {
    id: 'name',
    header: t('views.local-volumes.components.LocalVolumeReplicas.name'),
  },
  {
    id: 'state',
    header: t('views.local-volumes.components.LocalVolumeReplicas.status'),
  },
  {
    id: 'synced',
    header: t('views.local-volumes.components.LocalVolumeReplicas.syncState'),
  },
  {
    id: 'nodeName',
    header: t('views.local-volumes.components.LocalVolumeReplicas.node'),
  },
  {
    id: 'requiredCapacityBytes',
    header: t('views.local-volumes.components.LocalVolumeReplicas.capacity'),
  },
  {
    id: 'devicePath',
    header: t('views.local-volumes.components.LocalVolumeReplicas.device'),
  },
]);

const queryLocalVolumeReplicas = async () => {
  const { data } = await VolumeAPi.volumesReplicasDetail({
    volumeName: props.volume,
    volumeReplicaName: search.volumeReplicaName?.[0] as string,
    state: search.state?.[0] as string,
  });

  items.value = data.volumeReplicas ?? [];
};

queryLocalVolumeReplicas();
</script>

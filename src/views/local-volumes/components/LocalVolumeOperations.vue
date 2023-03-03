<template>
  <dao-table
    id="local-volume-operation-list"
    v-model:search="search"
    :data="items"
    :columns="columns"
    :page-layout="[]"
    :search-options="searchOptions"
    @refresh="queryLocalVolumeOperations"
    @search="queryLocalVolumeOperations"
  >
    <template #td-name="{row}">
      {{ (row as ApiVolumeOperation).metadata?.name }}
    </template>

    <template #td-kind="{row}">
      {{ (row as ApiVolumeOperation).kind }}
    </template>

    <template #td-target="{row}">
      {{ (row as ApiVolumeOperation).spec?.volumeName }}
    </template>

    <template #td-state="{row}">
      {{ (row as ApiVolumeOperation).status?.state }}
    </template>

    <template #td-description="{row}">
      {{ (row as ApiVolumeOperation).status?.message }}
    </template>

    <template #td-startTime="{row}">
      {{ useDateFormat((row as ApiVolumeOperation).metadata?.creationTimestamp) }}
    </template>
  </dao-table>
</template>

<script setup lang="ts">
import { reactive, defineProps, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDateFormat } from '@dao-style/extend';
import { Volume } from '@/services/Volume';
import type { ApiVolumeConvertOperation, ApiVolumeExpandOperation, ApiVolumeMigrateOperation } from '@/services/data-contracts';
import type { SearchOption, SearchValue } from '@dao-style/core/dist/components/toolbar/types';

type ApiVolumeOperation = ApiVolumeConvertOperation | ApiVolumeExpandOperation | ApiVolumeMigrateOperation;

const props = defineProps({
  volume: {
    type: String,
    default: '',
  },
});

const VolumeAPi = new Volume();

const { t } = useI18n();
const items = ref<ApiVolumeMigrateOperation[]>([]);
const search = reactive<Record<string, SearchValue[]>>({});
const searchOptions = reactive<SearchOption[]>([
  {
    key: 'volumeEventName',
    label: t('views.local-volumes.components.LocalVolumeOperations.name'),
    single: true,
  },
  {
    key: 'state',
    label: t('views.local-volumes.components.LocalVolumeOperations.status'),
    single: true,
  },
]);

const columns = reactive([
  {
    id: 'name',
    header: t('views.local-volumes.components.LocalVolumeOperations.name'),
  },
  {
    id: 'kind',
    header: t('views.local-volumes.components.LocalVolumeOperations.eventType'),
  },
  {
    id: 'target',
    header: t('views.local-volumes.components.LocalVolumeOperations.target'),
  },
  {
    id: 'state',
    header: t('views.local-volumes.components.LocalVolumeOperations.status'),
  },
  {
    id: 'description',
    header: t('views.local-volumes.components.LocalVolumeOperations.description'),
  },
  {
    id: 'startTime',
    header: t('views.local-volumes.components.LocalVolumeOperations.startTime'),
  },
  // {
  //   id: 'endTime',
  //   header: t('views.local-volumes.components.LocalVolumeOperations.endTime'),
  // },
]);

const queryLocalVolumeOperations = async () => {
  const { data } = await VolumeAPi.volumesOperationsDetail({
    volumeName: props.volume,
    volumeEventName: search.volumeEventName?.[0] as string,
    state: search.state?.[0] as string,
  });

  items.value = [
    ...(data.VolumeConvertOperations || []),
    ...(data.VolumeExpandOperations || []),
    ...(data.volumeMigrateOperations || []),
  ].sort((b, a) => new Date(a.metadata?.creationTimestamp ?? '').getTime() - new Date(b.metadata?.creationTimestamp ?? '').getTime());
};

queryLocalVolumeOperations();
</script>

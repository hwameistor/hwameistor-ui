<template>
  <dao-table
    id="local-volume-snapshot-list"
    v-model:search="search"
    :data="state.items"
    :columns="columns"
    :search-options="searchOptions"
    :page-size="pagination.pageSize"
    :current-page="pagination.page"
    :total="pagination.total"
    no-rounded
    :loading="isLoading"
    @page-change="handleChangePage"
    @size-change="handleChangePageSize"
    @refresh="handleRefresh"
    @search="handleSearch"
  >
    <template #td-name="{row}">
      {{ row.metadata?.name }}
    </template>

    <template #td-state="{row}">
      {{ row.status?.state }}
    </template>

    <template #td-capacity="{row}">
      {{ bytesToUnitDisplay(row.spec?.requiredCapacityBytes) }}
    </template>

    <template #td-creationTime="{row}">
      {{ useDateFormat(row.status?.creationTime) }}
    </template>
  </dao-table>
</template>

<script setup lang="ts">
import {
  reactive, computed, defineProps,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useDateFormat, useQueryTable } from '@dao-style/extend';
import { Snapshot } from '@/services/Snapshot';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { type SnapshotsListParams } from '@/services/data-contracts';
import type { SearchOption, SearchValue } from '@dao-style/core/dist/components/toolbar/types';

const props = defineProps({
  volume: {
    type: String,
    default: '',
  },
});

const SnapshotApi = new Snapshot();

const { t } = useI18n();
const search = reactive<Record<string, SearchValue[]>>({});
const searchOptions = computed<SearchOption[]>(() => [
  {
    key: 'snapshotName',
    label: t('views.local-volumes.components.LocalVolumeSnapshots.name'),
    single: true,
  },
  {
    key: 'state',
    label: t('views.local-volumes.components.LocalVolumeSnapshots.status'),
    single: true,
    values: [
      {
        label: 'Creating',
        value: 'Creating',
      },
      {
        label: 'Ready',
        value: 'Ready',
      },
      {
        label: 'NotReady',
        value: 'NotReady',
      },
      {
        label: 'ToBeDeleted',
        value: 'ToBeDeleted',
      },
      {
        label: 'Deleted',
        value: 'Deleted',
      },
    ],
    enum: true,
  },
]);

const columns = computed(() => [
  {
    id: 'name',
    header: t('views.local-volumes.components.LocalVolumeSnapshots.name'),
  },
  {
    id: 'state',
    header: t('views.local-volumes.components.LocalVolumeSnapshots.status'),
  },
  {
    id: 'capacity',
    header: t('views.local-volumes.components.LocalVolumeSnapshots.capacity'),
  },
  {
    id: 'creationTime',
    header: t('views.local-volumes.components.LocalVolumeSnapshots.creationTime'),
  },
]);

const querySnapshots = async ({ page, pageSize }: SnapshotsListParams) => {
  const { data } = await SnapshotApi.snapshotsList({
    page,
    pageSize,
    volumeName: props.volume,
    state: search.state?.[0] as string,
    snapshotName: search.snapshotName?.[0] as string,
  });

  return data;
};

const [{
  state,
  pagination,
  handleChangePage,
  handleChangePageSize,
  handleRefresh,
  isLoading,
}, {
  handleSearch,
}] = useQueryTable(querySnapshots, {
  page: 1,
  pageSize: 10,
});
</script>

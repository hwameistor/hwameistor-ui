<template>
  <dao-table
    id="dashboard-events-records"
    v-model:search="search"
    :data="state.items"
    :columns="columns"
    :page-size="pagination.pageSize"
    :current-page="pagination.page"
    :total="pagination.total"
    :sort="sort"
    :search-options="searchOptions"
    :fuzzy="{
      key: 'resourceName',
      single: true,
    }"
    :loading="isLoading"
    @page-change="handleChangePage"
    @size-change="handleChangePageSize"
    @refresh="handleRefresh"
    @sort-change="sortChangeEvent"
    @search="handleSearch"
  >
    <template #td-actionType="{row}">
      {{ row.eventRecord?.action }}
    </template>

    <template #td-status="{row}">
      {{ row.eventRecord?.state ?? '-' }}
    </template>

    <template #td-time="{row}">
      {{ useDateFormat(row.eventRecord?.time) }}
    </template>

    <template #td-content="{row}">
      <dao-text-button
        :prop="{
          type:'action',
        }"
        @click="viewEventContent(row)"
      >
        {{ $t('views.dashboard.components.EventList.view') }}
      </dao-text-button>
    </template>
  </dao-table>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQueryTable, useDateFormat, createDialog } from '@dao-style/extend';
import type { ApiEventAction, EventsListParams } from '@/services/data-contracts';
import MonacoEditorDialog from '@/components/dialogs/MonacoEditorDialog.vue';
import type {
  DaoTableSort, SearchOption, SearchValue,
} from '@dao-style/core';
import { Metric } from '@/services/Metric';

const { t } = useI18n();
const MetricApi = new Metric();

const columns = computed(() => [
  {
    id: 'actionType',
    header: t('views.dashboard.components.EventList.actionType'),
  },
  {
    id: 'resourceName',
    header: t('views.dashboard.components.EventList.resourceName'),
    sortable: true,
  },
  {
    id: 'resourceType',
    header: t('views.dashboard.components.EventList.resourceType'),
    sortable: true,
  },
  {
    id: 'status',
    header: t('views.dashboard.components.EventList.status'),
  },
  {
    id: 'time',
    header: t('views.dashboard.components.EventList.operateTime'),
    sortable: true,
  },
  {
    id: 'content',
    header: t('views.dashboard.components.EventList.eventContent'),
  },
]);
const sort = ref<DaoTableSort>({
  id: 'resourceName',
  desc: true,
});
const search = reactive<Record<string, SearchValue[]>>({});
const searchOptions = reactive<SearchOption[]>([
  {
    key: 'resourceType',
    label: t('views.dashboard.components.EventList.resourceType'),
    values: [
      {
        value: 'Cluster',
        label: 'Cluster',
      },
      {
        value: 'StorageNode',
        label: 'StorageNode',
      },
      {
        value: 'DiskNode',
        label: 'DiskNode',
      },
      {
        value: 'Pool',
        label: 'Pool',
      },
      {
        value: 'Volume',
        label: 'Volume',
      },
      {
        value: 'DiskVolume',
        label: 'DiskVolume',
      },
      {
        value: 'Disk',
        label: 'Disk',
      },
    ],
    single: true,
    enum: true,
  },
  {
    key: 'resourceName',
    label: t('views.dashboard.components.EventList.resourceName'),
    single: true,
  },
]);
const sortMap: Record<string, string> = {
  resourceName: 'name',
  resourceType: 'type',
  time: 'time',
};

const queryEvents = async (req: EventsListParams) => {
  const { data } = await MetricApi.eventsList({
    ...req,
    resourceName: search.resourceName?.[0] as string,
    resourceType: search.resourceType?.[0] as string,
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
  filterData,
}] = useQueryTable(queryEvents, {
  page: 1,
  pageSize: 10,
  sort: 'name',
  sortDir: 'DESC',
});

const sortChangeEvent = ({ id, desc }: { id: string, desc: boolean }) => {
  sort.value.id = id;
  sort.value.desc = desc;
  filterData.sort = sortMap[sort.value.id];
  filterData.sortDir = sort.value.desc ? 'DESC' : 'ASC';

  handleRefresh();
};

const viewEventContent = (row: ApiEventAction) => {
  const dialog = createDialog(MonacoEditorDialog);
  let content = row.eventRecord?.actionContent ?? '';

  try {
    content = JSON.stringify(JSON.parse(content), null, 2);
  } finally {
    dialog.show({
      modelValue: content,
      header: t('views.dashboard.components.EventList.eventContent'),
      readOnly: true,
    });
  }
};
</script>

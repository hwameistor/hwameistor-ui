<template>
  <div>
    <dao-table
      id="node-detail-local-migrate-list"
      v-model:search="search"
      :data="state.items"
      :columns="columns"
      :search-options="searchOptions"
      :page-size="pagination.pageSize"
      :current-page="pagination.page"
      :total="pagination.total"
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

      <template #td-volumeName="{row}">
        {{ row.spec?.volumeName }}
      </template>

      <template #td-sourceNode="{row}">
        {{ row.spec?.sourceNode }}
      </template>

      <template #td-targetNode="{row}">
        {{ row.status?.targetNode ?? '-' }}
      </template>

      <template #td-startTime="{row}">
        {{ useDateFormat(row.metadata?.creationTimestamp) }}
      </template>
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQueryTable, useDateFormat } from '@dao-style/extend';
import { Node } from '@/services/Node';
import type { NodesMigratesDetailParams } from '@/services/data-contracts';
import type { SearchOption, SearchValue } from '@dao-style/core/dist/components/toolbar/types';

const { t } = useI18n();
const NodeApi = new Node();
const route = useRoute();
const nodeName = ref<string>(route.params.name as string);
const search = reactive<Record<string, SearchValue[]>>({});
const searchOptions = reactive<SearchOption[]>([
  {
    key: 'migrateOperationName',
    label: t('views.nodes.NodeDetailMigrates.name'),
    single: true,
  },
  {
    key: 'state',
    label: t('views.nodes.NodeDetailMigrates.state'),
    single: true,
  },
  {
    key: 'volumeName',
    label: t('views.nodes.NodeDetailMigrates.volume'),
    single: true,
  },
]);

const columns = reactive([
  {
    id: 'name',
    header: t('views.nodes.NodeDetailMigrates.name'),
  },
  {
    id: 'state',
    header: t('views.nodes.NodeDetailMigrates.state'),
  },
  {
    id: 'volumeName',
    header: t('views.nodes.NodeDetailMigrates.volume'),
  },
  {
    id: 'sourceNode',
    header: t('views.nodes.NodeDetailMigrates.sourceNode'),
  },
  {
    id: 'targetNode',
    header: t('views.nodes.NodeDetailMigrates.targetNode'),
  },
  {
    id: 'startTime',
    header: t('views.nodes.NodeDetailMigrates.startTime'),
  },
  // {
  //   id: 'endTime',
  //   header: t('views.nodes.NodeDetailMigrates.endTime'),
  // },
]);

const ListMigrates = async ({ page, pageSize }: NodesMigratesDetailParams) => {
  const { data } = await NodeApi.nodesMigratesDetail({
    page,
    pageSize,
    nodeName: nodeName.value,
    migrateOperationName: search.migrateOperationName?.[0] as string,
    state: search.state?.[0] as string,
    volumeName: search.volumeName?.[0] as string,
  });

  return data;
};

const [{
  state,
  pagination,
  handleChangePage,
  handleChangePageSize,
  handleRefresh,
}, {
  handleSearch,
}] = useQueryTable(ListMigrates, {
  page: 1,
  pageSize: 10,
  nodeName: nodeName.value,
});
</script>

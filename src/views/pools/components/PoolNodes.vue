<template>
  <dao-table
    id="pool-node-list"
    v-model:search="search"
    :search-options="searchOptions"
    :data="state.items"
    :columns="columns"
    :page-size="pagination.pageSize"
    :current-page="pagination.page"
    :total="pagination.total"
    expandable
    @page-change="handleChangePage"
    @size-change="handleChangePageSize"
    @refresh="handleRefresh"
    @search="handleSearch"
  >
    <template #td-name="{row}">
      <div>
        <div class="pool-node__name">
          {{ (row as ApiStorageNode).localStorageNode?.metadata?.name }}
        </div>
        <div class="pool-node__ip">
          {{ (row as ApiStorageNode).localStorageNode?.spec?.storageIP }}
        </div>
      </div>
    </template>

    <template #td-k8SNodeState="{value}">
      <node-status :status="value" />
    </template>

    <template #td-totalDiskCount="{row}">
      {{ (row as ApiStorageNode).localDiskNode?.status?.totalDisk }}
    </template>

    <template #td-availableCapacity="{row}">
      {{ bytesToUnitDisplay((row as ApiStorageNode).localStorageNode?.status?.pools?.[name].usedCapacityBytes) }}
    </template>

    <template #td-totalCapacity="{row}">
      {{ bytesToUnitDisplay((row as ApiStorageNode).localStorageNode?.status?.pools?.[name].totalCapacityBytes) }}
    </template>

    <template #expand="{row}">
      <pool-node-disks
        :pool="name"
        :node="(row as ApiStorageNode).localStorageNode?.metadata?.name"
      />
    </template>
  </dao-table>
</template>

<script setup lang="ts">
import { reactive, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQueryTable } from '@dao-style/extend';
import { Pool } from '@/services/Pool';
import NodeStatus from '@/components/NodeStatus.vue';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import type { PoolsNodesDetailParams, ApiStorageNode } from '@/services/data-contracts';
import { SearchOption, SearchValue } from '@dao-style/core/dist/components/toolbar/types';
import PoolNodeDisks from './PoolNodeDisks.vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});

const PoolApi = new Pool();

const { t } = useI18n();

const search = reactive<Record<string, SearchValue[]>>({});
const searchOptions = reactive<SearchOption[]>([
  {
    key: 'nodeName',
    label: t('views.pools.components.PoolNodes.node'),
    single: true,
  },
  {
    key: 'state',
    label: t('views.pools.components.PoolNodes.status'),
    single: true,
  },
]);

const columns = reactive([
  {
    id: 'name',
    header: t('views.pools.components.PoolNodes.node'),
  },
  {
    id: 'k8SNodeState',
    header: t('views.pools.components.PoolNodes.status'),
  },
  {
    id: 'disks',
    header: t('views.pools.components.PoolNodes.disks'),
  },
  {
    id: 'availableCapacity',
    header: t('views.pools.components.PoolNodes.availableCapacity'),
  },
  {
    id: 'totalCapacity',
    header: t('views.pools.components.PoolNodes.totalCapacity'),
  },
]);

const queryPoolNodes = async ({ page, pageSize }: PoolsNodesDetailParams) => {
  const { data } = await PoolApi.poolsNodesDetail({
    page,
    pageSize,
    poolName: props.name,
    nodeName: search.nodeName?.[0] as string,
    state: search.state?.[0] as string,
    fuzzy: true,
    sort: true,
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
}] = useQueryTable(queryPoolNodes, {
  page: 1,
  pageSize: 10,
  poolName: props.name,
});
</script>

<style lang="scss">
.pool-node {
  &__name {
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    color: var(--dao-gray-040);
  }

  &__ip {
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
    color: var(--dao-gray-070);
  }
}
</style>

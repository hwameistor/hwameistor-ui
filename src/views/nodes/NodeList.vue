<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header :title="$t('App.nav.node')" />

    <head-explanations page-name="node" />

    <dao-table
      id="node-list"
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
        <router-link
          :to="{
            name: 'NodeDetailIndex',
            params: { name: row.localStorageNode?.metadata?.name },
          }"
          class="list-name-link"
        >
          {{ row.localStorageNode?.metadata?.name }}
        </router-link>
      </template>

      <template #td-driverStatus="{row}">
        <driver-status :status="row.localStorageNode?.status?.state" />
      </template>

      <template #td-nodeState="{row}">
        <node-status :status="row.k8SNodeState" />
      </template>

      <template #td-hddUsage="{row}">
        <td-percent
          :used="getDiskUsage(row, 'HDD')"
          :total="getDiskTotal(row, 'HDD')"
        />
      </template>

      <template #td-ssdUsage="{row}">
        <td-percent
          :used="getDiskUsage(row, 'SSD')"
          :total="getDiskTotal(row, 'SSD')"
        />
      </template>

      <!-- <template #td-claimedDisk="{row}">
        {{ getBoundDiskCount(row) }} / {{ row.localDiskNode?.status?.totalDisk ?? '-' }}
      </template> -->
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { sum } from 'lodash-es';
import { useQueryTable } from '@dao-style/extend';
import HeadExplanations from '@/components/HeadExplanations.vue';
import TdPercent from '@/components/TdPercent.vue';
import { Node } from '@/services/Node';
import type { ApiStorageNode, NodesListParams } from '@/services/data-contracts';
import type { SearchOption, SearchValue } from '@dao-style/core/dist/components/toolbar/types';
import NodeStatus from '../../components/NodeStatus.vue';
import DriverStatus from './components/DriverStatus.vue';

const { t } = useI18n();
const NodeApi = new Node();

const search = reactive<Record<string, SearchValue[]>>({});
const searchOptions = computed<SearchOption[]>(() => [
  {
    key: 'name',
    label: t('views.nodes.NodeList.name'),
    single: true,
  },
  {
    key: 'driverState',
    label: t('views.nodes.NodeList.driverStatus'),
    values: [
      {
        value: 'Ready',
        label: t('views.nodes.components.DriverStatus.Ready'),
      },
      {
        value: 'Maintain',
        label: t('views.nodes.components.DriverStatus.Maintain'),
      },
      {
        value: 'Offline',
        label: t('views.nodes.components.DriverStatus.Offline'),
      },
    ],
    single: true,
    enum: true,
  },
  {
    key: 'nodeState',
    label: t('views.nodes.NodeList.nodeState'),
    values: [
      {
        value: 'Ready',
        label: t('components.NodeStatus.Ready'),
      },
      {
        value: 'NotReady',
        label: t('components.NodeStatus.NotReady'),
      },
      {
        value: 'Unknown',
        label: t('components.NodeStatus.Unknown'),
      },
    ],
    single: true,
    enum: true,
  },
]);

const columns = computed(() => [
  {
    id: 'name',
    header: t('views.nodes.NodeList.name'),
  },
  {
    id: 'driverStatus',
    header: t('views.nodes.NodeList.driverStatus'),
  },
  {
    id: 'nodeState',
    header: t('views.nodes.NodeList.nodeState'),
  },
  {
    id: 'hddUsage',
    header: t('views.nodes.NodeList.hddUsage'),
  },
  {
    id: 'ssdUsage',
    header: t('views.nodes.NodeList.ssdUsage'),
  },
  // {
  //   id: 'claimedDisk',
  //   header: t('views.nodes.NodeList.claimedDisk'),
  // },
]);

const ListNodes = async ({ page, pageSize }: NodesListParams) => {
  const { data } = await NodeApi.nodesList({
    page,
    pageSize,
    sort: true,
    fuzzy: true,
    name: search.name?.[0] as string,
    driverState: search.driverState?.[0] as string,
    nodeState: search.nodeState?.[0] as string,
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
}] = useQueryTable(ListNodes, {
  page: 1,
  pageSize: 10,
});

const getDiskUsage = (node: ApiStorageNode, type: 'HDD' | 'SSD') => {
  const bytes = Object.values(node.localStorageNode?.status?.pools ?? {})
    .filter((pool) => pool.class === type)
    .map((pool) => pool.usedCapacityBytes);

  return sum(bytes);
};

const getDiskTotal = (node: ApiStorageNode, type: 'HDD' | 'SSD') => {
  const bytes = Object.values(node.localStorageNode?.status?.pools ?? {})
    .filter((pool) => pool.class === type)
    .map((pool) => pool.totalCapacityBytes);

  return sum(bytes);
};

// const getBoundDiskCount = (node: ApiStorageNode) => {
//   const boundedDisks = Object.values(node.localDiskNode?.status?.disks ?? {}).filter((disk) => disk.status === 'Bound');

//   return boundedDisks.length;
// };
</script>

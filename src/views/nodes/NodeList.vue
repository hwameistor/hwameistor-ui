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

      <template #td-action-menu="{row}">
        <dao-dropdown-item
          v-if="row.localStorageNode?.status?.state !== 'Offline'"
          @click="disableNode(row)"
        >
          {{ $t('views.nodes.NodeList.actions.disable') }}
        </dao-dropdown-item>
        <dao-dropdown-item
          v-else
          @click="enableNode(row)"
        >
          {{ $t('views.nodes.NodeList.actions.enable') }}
        </dao-dropdown-item>
      </template>
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { sum } from 'lodash-es';
import { createDialog, useQueryTable } from '@dao-style/extend';
import HeadExplanations from '@/components/HeadExplanations.vue';
import TdPercent from '@/components/TdPercent.vue';
import { Node } from '@/services/Node';
import type { ApiStorageNode, NodesListParams } from '@/services/data-contracts';
import type { SearchOption, SearchValue } from '@dao-style/core/dist/components/toolbar/types';
import DoubleConfirmDialog from '@/components/dialogs/DoubleConfirmDialog.vue';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
import NodeStatus from '@/components/NodeStatus.vue';
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
  {
    id: 'action',
    header: '',
    defaultWidth: '60px',
    resizable: false,
  },
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

const changeNodeStatus = async (nodeName: string, enable: boolean) => {
  await NodeApi.nodesCreate(
    nodeName,
    { enable },
  );
};

const disableNode = async (node: ApiStorageNode) => {
  const name = node.localStorageNode?.metadata?.name ?? '';
  const dialog = createDialog(DoubleConfirmDialog);

  await dialog.show({
    header: t('views.nodes.NodeList.disableNodeDialog.header', { name }),
    content: t('views.nodes.NodeList.disableNodeDialog.content', { name }),
    name,
    confirmText: t('views.nodes.NodeList.disableNodeDialog.confirmText'),
    deleteFn: () => changeNodeStatus(name, false),
    successMessage: t('views.nodes.NodeList.disableNode.noty.success', { name }),
    errorMessage: t('views.nodes.NodeList.disableNode.noty.error', { name }),
  });

  handleRefresh();
};

const enableNode = async (node: ApiStorageNode) => {
  const name = node.localStorageNode?.metadata?.name ?? '';
  const dialog = createDialog(ConfirmDialog);

  await dialog.show({
    header: t('views.nodes.NodeList.enableNodeDialog.header', { name }),
    content: t('views.nodes.NodeList.enableNodeDialog.content', { name }),
    confirmFn: () => changeNodeStatus(name, true),
    successMessage: t('views.nodes.NodeList.enableNode.noty.success', { name }),
    errorMessage: t('views.nodes.NodeList.enableNode.noty.error', { name }),
  });

  handleRefresh();
};
</script>

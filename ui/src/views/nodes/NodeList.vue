<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header :title="$t('App.nav.node')" />

    <head-explanations page-name="node" />

    <dao-table
      id="node-list"
      :data="state.items"
      :columns="columns"
      :page-size="pagination.pageSize"
      :current-page="pagination.page"
      :total="pagination.total"
      @page-change="handleChangePage"
      @size-change="handleChangePageSize"
      @refresh="handleRefresh"
    >
      <template #search>
        <dao-input
          v-model="filterData.name"
          type="search"
          block
          borderless
          @keyup.enter="handleSearch"
          @after-reset="handleSearch"
        />
      </template>

      <template #td-driverStatus="{value}">
        {{ $t(`views.nodes.NodeList.driverStatues.${value}`) }}
      </template>

      <template #td-nodeState="{value}">
        {{ $t(`views.nodes.NodeList.nodeStates.${value}`) }}
      </template>

      <template #td-hddUsage="{row}">
        <td-percent
          :used="row.allocatedHDDCapacityBytes"
          :total="row.totalHDDCapacityBytes"
        />
      </template>

      <template #td-ssdUsage="{row}">
        <td-percent
          :used="row.allocatedSSDCapacityBytes"
          :total="row.totalSSDCapacityBytes"
        />
      </template>

      <template #td-claimedDisk="{row}">
        {{ row.usedDiskCount }} / {{ row.totalDiskCount }}
      </template>
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQueryTable } from '@dao-style/extend';
import HeadExplanations from '@/components/HeadExplanations.vue';
import { Node } from '@/services/NodeService';
import TdPercent from '@/components/TdPercent.vue';

const { t } = useI18n();

const columns = reactive([
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
    id: 'claimedDisk',
    header: t('views.nodes.NodeList.claimedDisk'),
  },
]);

const [{
  state,
  pagination,
  handleChangePage,
  handleChangePageSize,
  handleRefresh,
}, {
  filterData,
  handleSearch,
}] = useQueryTable(Node.QueryNodes, {
  page: 1,
  pageSize: 10,
});
</script>

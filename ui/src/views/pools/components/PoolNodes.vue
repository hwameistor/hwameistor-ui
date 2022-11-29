<template>
  <dao-table
    id="pool-node-list"
    :data="state.items"
    :columns="columns"
    :page-size="pagination.pageSize"
    :current-page="pagination.page"
    :total="pagination.total"
    expandable
    hide-search
    @page-change="handleChangePage"
    @size-change="handleChangePageSize"
    @refresh="handleRefresh"
  >
    <template #td-name="{value, row}">
      <div>
        <div class="pool-node__name">
          {{ value }}
        </div>
        <div class="pool-node__ip">
          {{ row.ip }}
        </div>
      </div>
    </template>

    <template #td-nodeState="{value}">
      <node-status :status="value" />
    </template>

    <template #td-isRaid="{value}">
      {{ $t(`views.pools.components.PoolNodes.raid.${value ? 'isRaid' : 'notRaid'}`) }}
    </template>

    <template #td-availableCapacity="{row}">
      {{ bytesToUnitDisplay(row.totalHDDCapacityBytes ?? 0
        + row.totalSSDCapacityBytes ?? 0
          - row.allocatedHDDCapacityBytes ?? 0
          - row.allocatedSSDCapacityBytes ?? 0)
      }}
    </template>

    <template #td-totalCapacity="{row}">
      {{ bytesToUnitDisplay(row.totalHDDCapacityBytes ?? 0 + row.totalSSDCapacityBytes ?? 0) }}
    </template>

    <template #expand="{row}">
      <pool-node-disks
        :pool="name"
        :node="row.name"
      />
    </template>
  </dao-table>
</template>

<script setup lang="ts">
import { reactive, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQueryTable } from '@dao-style/extend';
import { Pool, type QueryPoolNodesRequest } from '@/services/PoolService';
import NodeStatus from '@/components/NodeStatus.vue';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import PoolNodeDisks from './PoolNodeDisks.vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});

const { t } = useI18n();

const columns = reactive([
  {
    id: 'name',
    header: t('views.pools.components.PoolNodes.node'),
  },
  {
    id: 'nodeState',
    header: t('views.pools.components.PoolNodes.status'),
  },
  {
    id: 'isRaid',
    header: t('views.pools.components.PoolNodes.isRaid'),
  },
  {
    id: 'totalDiskCount',
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

const queryPoolNodes = ({ page, pageSize, storagePoolName }: QueryPoolNodesRequest) => Pool.QueryPoolNodes({
  page,
  pageSize,
  storagePoolName,
}).then((res) => ({
  pagination: res.page,
  items: res.storageNodes,
}));

const [{
  state,
  pagination,
  handleChangePage,
  handleChangePageSize,
  handleRefresh,
}] = useQueryTable(queryPoolNodes, {
  page: 1,
  pageSize: 10,
  storagePoolName: props.name,
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

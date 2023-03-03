<template>
  <dao-table
    id="pool-node-disks"
    class="p-[20px] pool-node-disks"
    :data="state.items"
    :columns="columns"
    :page-size="pagination.pageSize"
    :current-page="pagination.page"
    :total="pagination.total"
    compact
    hide-toolbar
    @page-change="handleChangePage"
    @size-change="handleChangePageSize"
    @refresh="handleRefresh"
  >
    <template #td-devPath="{row}">
      {{ (row as ApiLocalDiskInfo).spec?.devicePath }}
    </template>

    <template #td-state="{row}">
      {{ (row as ApiLocalDiskInfo).status?.claimState }}
    </template>

    <template #td-hasRaid="{row}">
      {{ $t(`views.pools.components.PoolNodeDisks.raid.${(row as ApiLocalDiskInfo).spec?.isRaid ? 'isRaid' : 'notRaid'}`) }}
    </template>

    <template #td-type="{row}">
      {{ (row as ApiLocalDiskInfo).spec?.diskAttributes?.type }}
    </template>

    <template #td-availableCapacityBytes="{row}">
      {{ bytesToUnitDisplay((row as ApiLocalDiskInfo).spec?.capacity) }}
    </template>

    <template #td-totalCapacityBytes="{row}">
      {{ bytesToUnitDisplay((row as ApiLocalDiskInfo).totalCapacityBytes) }}
    </template>
  </dao-table>
</template>

<script setup lang="ts">
import { reactive, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQueryTable } from '@dao-style/extend';
import { Pool } from '@/services/Pool';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import type { ApiLocalDiskInfo, PoolsNodesDisksDetailParams } from '@/services/data-contracts';

const props = defineProps({
  pool: {
    type: String,
    default: '',
  },
  node: {
    type: String,
    default: '',
  },
});

const PoolApi = new Pool();

const { t } = useI18n();

const columns = reactive([
  {
    id: 'devPath',
    header: t('views.pools.components.PoolNodeDisks.devPath'),
  },
  {
    id: 'state',
    header: t('views.pools.components.PoolNodeDisks.status'),
  },
  {
    id: 'hasRaid',
    header: t('views.pools.components.PoolNodeDisks.isRaid'),
  },
  {
    id: 'type',
    header: t('views.pools.components.PoolNodeDisks.diskType'),
  },
  {
    id: 'availableCapacityBytes',
    header: t('views.pools.components.PoolNodeDisks.availableCapacity'),
  },
  {
    id: 'totalCapacityBytes',
    header: t('views.pools.components.PoolNodeDisks.totalCapacity'),
  },
]);

const queryPoolNodeDisks = async ({
  page, pageSize,
}: PoolsNodesDisksDetailParams) => {
  const { data } = await PoolApi.poolsNodesDisksDetail({
    page,
    pageSize,
    nodeName: props.node,
    poolName: props.pool,
    fuzzy: true,
  });

  return data;
};

const [{
  state,
  pagination,
  handleChangePage,
  handleChangePageSize,
  handleRefresh,
}] = useQueryTable(queryPoolNodeDisks, {
  page: 1,
  pageSize: 10,
  nodeName: props.node,
  poolName: props.pool,
});
</script>

<style lang="scss">
.pool-node-disks .dao-table-thead .dao-table-tr {
  background-color: var(--dao-bg);

  &:hover {
    background-color: var(--dao-bg);
  }
}
</style>

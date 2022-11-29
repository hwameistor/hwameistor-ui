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
    <template #td-hasRaid="{value}">
      {{ $t(`views.pools.components.PoolNodeDisks.raid.${value ? 'isRaid' : 'notRaid'}`) }}
    </template>

    <template #td-availableCapacityBytes="{value}">
      {{ bytesToUnitDisplay(value) }}
    </template>

    <template #td-totalCapacityBytes="{value}">
      {{ bytesToUnitDisplay(value) }}
    </template>
  </dao-table>
</template>

<script setup lang="ts">
import { reactive, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQueryTable } from '@dao-style/extend';
import { Pool, type QueryPoolNodeDisksRequest } from '@/services/PoolService';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';

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

const queryPoolNodeDisks = ({
  page, pageSize, storagePoolName, nodeName,
}: QueryPoolNodeDisksRequest) => Pool.QueryPoolNodeDisks({
  page,
  pageSize,
  storagePoolName,
  nodeName,
}).then((res) => ({
  pagination: res.page,
  items: res.localDisks,
}));

const [{
  state,
  pagination,
  handleChangePage,
  handleChangePageSize,
  handleRefresh,
}] = useQueryTable(queryPoolNodeDisks, {
  page: 1,
  pageSize: 10,
  storagePoolName: props.pool,
  nodeName: props.node,
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

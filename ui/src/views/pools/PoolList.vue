<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header :title="$t('App.nav.pool')" />

    <head-explanations page-name="pool" />

    <dao-table
      id="pool-list"
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

      <template #td-name="{value}">
        <router-link
          :to="{
            name: 'PoolDetail',
            params: { name: value },
          }"
          class="list-name-link"
        >
          {{ value }}
        </router-link>
      </template>

      <template #td-storageUsage="{row}">
        {{ getPercent(row.allocatedCapacityBytes, row.totalCapacityBytes) }}
      </template>

      <template #td-createTime="{value}">
        {{ useDateFormat(value) }}
      </template>
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDateFormat, useQueryTable } from '@dao-style/extend';
import HeadExplanations from '@/components/HeadExplanations.vue';
import { Pool, type QueryPoolsRequest } from '@/services/PoolService';

const { t } = useI18n();

const columns = reactive([
  {
    id: 'name',
    header: t('views.pools.PoolList.name'),
  },
  {
    id: 'class',
    header: t('views.pools.PoolList.diskType'),
  },
  {
    id: 'nodesNum',
    header: t('views.pools.PoolList.nodes'),
  },
  {
    id: 'storageUsage',
    header: t('views.pools.PoolList.storageUsage'),
  },
  {
    id: 'createTime',
    header: t('views.pools.PoolList.createTime'),
  },
]);

const queryPools = ({ name, page, pageSize }: QueryPoolsRequest) => Pool.QueryPools({
  page,
  pageSize,
  name,
}).then((res) => ({
  pagination: res.page,
  items: res.storagePools,
}));

const [{
  state,
  pagination,
  handleChangePage,
  handleChangePageSize,
  handleRefresh,
}, {
  filterData,
  handleSearch,
}] = useQueryTable(queryPools, {
  page: 1,
  pageSize: 10,
});

const getPercent = (used?: number, total?: number) => {
  if (!used || !total) {
    return '-';
  }

  return `${((used * 100) / total).toFixed(0)}%`;
};
</script>

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
      :loading="isLoading"
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

      <template #td-poolName="{value}">
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

      <template #td-class="{row}">
        {{ row.items?.[0].class }}
      </template>

      <template #td-nodes="{row}">
        {{ row.nodeNames?.length ?? 0 }}
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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDateFormat, useQueryTable } from '@dao-style/extend';
import HeadExplanations from '@/components/HeadExplanations.vue';
import { Pool } from '@/services/Pool';
import type { PoolsListParams } from '@/services/data-contracts';

const { t } = useI18n();
const PoolApi = new Pool();

const columns = computed(() => [
  {
    id: 'poolName',
    header: t('views.pools.PoolList.name'),
  },
  {
    id: 'class',
    header: t('views.pools.PoolList.diskType'),
  },
  {
    id: 'nodes',
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

const queryPools = async ({ name, page, pageSize }: PoolsListParams) => {
  const { data } = await PoolApi.poolsList({
    page,
    pageSize,
    name,
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
  isLoading,
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

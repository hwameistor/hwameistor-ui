<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header :title="$t('App.nav.lv')" />

    <head-explanations page-name="localVolume" />

    <dao-table
      id="local-volume-list"
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
            name: 'LocalVolumeDetail',
            params: { name: value },
          }"
          class="list-name-link"
        >
          {{ value }}
        </router-link>
      </template>

      <template #td-state="{value}">
        {{ value }}
      </template>

      <template #td-requiredCapacityBytes="{value}">
        {{ bytesToUnitDisplay(value) }}
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
import { LocalVolume } from '@/services/LocalVolumeService';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';

const { t } = useI18n();

const columns = reactive([
  {
    id: 'name',
    header: t('views.local-volumes.LocalVolumeList.name'),
  },
  {
    id: 'state',
    header: t('views.local-volumes.LocalVolumeList.status'),
  },
  {
    id: 'replicaNumber',
    header: t('views.local-volumes.LocalVolumeList.replicas'),
  },
  {
    id: 'volumeGroup',
    header: t('views.local-volumes.LocalVolumeList.volumeGroup'),
  },
  {
    id: 'requiredCapacityBytes',
    header: t('views.local-volumes.LocalVolumeList.capacity'),
  },
  {
    id: 'pvcNamespace',
    header: t('views.local-volumes.LocalVolumeList.namespace'),
  },
  {
    id: 'pvcName',
    header: t('views.local-volumes.LocalVolumeList.pvc'),
  },
  {
    id: 'createTime',
    header: t('views.local-volumes.LocalVolumeList.created'),
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
}] = useQueryTable(LocalVolume.QueryLocalVolumes, {
  page: 1,
  pageSize: 10,
});
</script>

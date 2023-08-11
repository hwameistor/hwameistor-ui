<template>
  <div>
    <dao-table
      id="node-detail-local-disk-list"
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
      <template #td-devPath="{row}">
        {{ row.spec?.devicePath }}
      </template>

      <template #td-state="{row}">
        {{ row.status?.claimState }}
      </template>

      <template #td-reserved="{row}">
        {{ $t(`common.${row.spec?.reserved ? 'yes' : 'no'}`) }}
      </template>

      <template #td-hasRaid="{row}">
        {{ $t(`views.nodes.NodeDetailLocalDisks.raid.${row.spec?.isRaid ? 'isRaid' : 'notRaid'}`) }}
      </template>

      <template #td-type="{row}">
        {{ row.spec?.diskAttributes?.type }}
      </template>

      <!-- <template #td-availableCapacityBytes="{row}">
        {{ bytesToUnitDisplay(row.spec?.capacity) }}
      </template> -->

      <template #td-totalCapacityBytes="{value}">
        {{ bytesToUnitDisplay(value) }}
      </template>

      <template #td-action-menu="{ row }">
        <dao-dropdown-item
          v-if="row.spec?.reserved"
          @click="unreserveDisk(row)"
        >
          {{ $t('views.nodes.NodeDetailLocalDisks.actions.unreserve') }}
        </dao-dropdown-item>

        <dao-dropdown-item
          v-else
          @click="reserveDisk(row)"
        >
          {{ $t('views.nodes.NodeDetailLocalDisks.actions.reserve') }}
        </dao-dropdown-item>
      </template>
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { createDialog, useQueryTable } from '@dao-style/extend';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { Node } from '@/services/Node';
import type { ApiLocalDiskInfo, NodesDisksDetailParams } from '@/services/data-contracts';
import type { SearchOption, SearchValue } from '@dao-style/core/dist/components/toolbar/types';
import ReserveDiskDialog from './dialogs/ReserveDiskDialog.vue';
import UnreserveDiskDialog from './dialogs/UnreserveDiskDialog.vue';

const NodeApi = new Node();

const { t } = useI18n();
const route = useRoute();
const nodeName = ref<string>(route.params.name as string);

const search = reactive<Record<string, SearchValue[]>>({});
const searchOptions = computed<SearchOption[]>(() => [
  {
    key: 'state',
    label: t('views.nodes.NodeDetailLocalDisks.state'),
    single: true,
  },
]);

const columns = computed(() => [
  {
    id: 'devPath',
    header: t('views.nodes.NodeDetailLocalDisks.devPath'),
  },
  {
    id: 'state',
    header: t('views.nodes.NodeDetailLocalDisks.state'),
  },
  {
    id: 'reserved',
    header: t('views.nodes.NodeDetailLocalDisks.reserved'),
  },
  {
    id: 'localStoragePooLName',
    header: t('views.nodes.NodeDetailLocalDisks.storagePool'),
  },
  {
    id: 'hasRaid',
    header: t('views.nodes.NodeDetailLocalDisks.isRaid'),
  },
  {
    id: 'type',
    header: t('views.nodes.NodeDetailLocalDisks.diskType'),
  },
  // {
  //   id: 'availableCapacityBytes',
  //   header: t('views.nodes.NodeDetailLocalDisks.availableCapacity'),
  // },
  {
    id: 'totalCapacityBytes',
    header: t('views.nodes.NodeDetailLocalDisks.totalCapacity'),
  },
  {
    id: 'action',
    header: '',
  },
]);

const ListDisks = async ({ page, pageSize }: NodesDisksDetailParams) => {
  const { data } = await NodeApi.nodesDisksDetail({
    page,
    pageSize,
    nodeName: nodeName.value,
    state: search.state?.[0] as string,
    sort: true,
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
}, {
  handleSearch,
}] = useQueryTable(ListDisks, {
  page: 1,
  pageSize: 10,
  nodeName: nodeName.value,
});

const reserveDisk = async (row: ApiLocalDiskInfo) => {
  const dialog = createDialog(ReserveDiskDialog);

  await dialog.show({
    node: nodeName.value,
    disk: row,
  });

  await handleRefresh();
};

const unreserveDisk = async (row: ApiLocalDiskInfo) => {
  const dialog = createDialog(UnreserveDiskDialog);

  await dialog.show({
    node: nodeName.value,
    disk: row,
  });

  await handleRefresh();
};
</script>

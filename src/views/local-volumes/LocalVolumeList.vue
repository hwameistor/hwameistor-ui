<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header :title="$t('App.nav.lv')" />

    <head-explanations page-name="localVolume" />

    <dao-table
      id="local-volume-list"
      v-model:search="search"
      :data="state.items"
      :columns="columns"
      :loading="isLoading"
      :sort="initialSort"
      :search-options="searchOptions"
      :page-size="pagination.pageSize"
      :current-page="pagination.page"
      :total="pagination.total"
      @page-change="handleChangePage"
      @size-change="handleChangePageSize"
      @sort-change="handleSortChange"
      @refresh="handleRefresh"
      @search="handleSearch"
    >
      <template #td-name="{row}">
        <router-link
          :to="{
            name: 'LocalVolumeDetail',
            params: { name: row.metadata?.name },
          }"
          class="list-name-link"
        >
          {{ row.metadata?.name }}
        </router-link>
      </template>

      <template #td-state="{row}">
        {{ row.status?.state }}
      </template>

      <template #td-replicas="{row}">
        {{ row.spec?.replicaNumber }}
      </template>

      <template #td-volumeGroup="{row}">
        {{ row.spec?.volumegroup }}
      </template>

      <template #td-requiredCapacityBytes="{row}">
        {{ bytesToUnitDisplay(row.spec?.requiredCapacityBytes) }}
      </template>

      <template #td-pvcNamespace="{row}">
        {{ row.spec?.pvcNamespace }}
      </template>

      <template #td-pvcName="{row}">
        {{ row.spec?.pvcName }}
      </template>

      <template #td-createTime="{row}">
        {{ useDateFormat(row.metadata?.creationTimestamp) }}
      </template>

      <template #td-action-menu="{row}">
        <dao-dropdown-item
          :disabled="isMigrateDisabled(row)"
          @click="migrate(row)"
        >
          <div class="flex items-center">
            {{ $t('views.local-volumes.LocalVolumeList.actions.migrate') }}
            <dao-tooltip
              v-if="isMigrateDisabled(row)"
              :content="$t('views.local-volumes.LocalVolumeList.disableMigrateAlert', { name: row.metadata?.name })"
              placement="top-end"
              class="ml-[10px]"
            >
              <dao-icon
                name="icon-minor"
                use-font
              />
            </dao-tooltip>
          </div>
        </dao-dropdown-item>
        <dao-dropdown-item
          :disabled="row.status?.state !== 'Ready'"
          @click="expand(row)"
        >
          {{ $t('views.local-volumes.LocalVolumeList.actions.expand') }}
        </dao-dropdown-item>
        <dao-dropdown-item
          v-if="row.spec?.replicaNumber === 1 && row.spec?.convertible"
          @click="convertHA(row)"
        >
          {{ $t('views.local-volumes.LocalVolumeList.actions.convertHA') }}
        </dao-dropdown-item>
      </template>
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { createDialog, useDateFormat, useQueryTable } from '@dao-style/extend';
import HeadExplanations from '@/components/HeadExplanations.vue';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { Volume } from '@/services/Volume';
import type { VolumesListParams, ApiVolume } from '@/services/data-contracts';
import type { SearchOption, SearchValue } from '@dao-style/core/dist/components/toolbar/types';
import ConvertHADialog from './dialogs/ConvertHADialog.vue';
import MigrateDialog from './dialogs/MigrateDialog.vue';
import ExpandDialog from './dialogs/ExpandDialog.vue';

const VolumeAPi = new Volume();

const { t } = useI18n();

const search = reactive<Record<string, SearchValue[]>>({});
const searchOptions = computed<SearchOption[]>(() => [
  {
    key: 'volumeName',
    label: t('views.local-volumes.LocalVolumeList.name'),
    single: true,
  },
  {
    key: 'state',
    label: t('views.local-volumes.LocalVolumeList.status'),
    single: true,
  },
  {
    key: 'group',
    label: t('views.local-volumes.LocalVolumeList.volumeGroup'),
    single: true,
  },
  {
    key: 'namespace',
    label: t('views.local-volumes.LocalVolumeList.namespace'),
    single: true,
  },
]);

const columns = computed(() => [
  {
    id: 'name',
    header: t('views.local-volumes.LocalVolumeList.name'),
    sortable: true,
  },
  {
    id: 'state',
    header: t('views.local-volumes.LocalVolumeList.status'),
  },
  {
    id: 'replicas',
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
    sortable: true,
  },
  {
    id: 'pvcName',
    header: t('views.local-volumes.LocalVolumeList.pvc'),
  },
  {
    id: 'createTime',
    header: t('views.local-volumes.LocalVolumeList.created'),
    sortable: true,
  },
  {
    id: 'action',
    header: '',
    defaultWidth: '56px',
    resizable: false,
  },

]);

const isMigrateDisabled = (row: ApiVolume) => Boolean(row.spec?.replicaNumber === 1 && row.status?.publishedNode);

const queryVolumes = async (params: VolumesListParams) => {
  const { data } = await VolumeAPi.volumesList({
    volumeName: search.volumeName?.[0] as string,
    state: search.state?.[0] as string,
    group: search.group?.[0] as string,
    namespace: search.namespace?.[0] as string,
    ...params,
  });

  return data;
};

const [
  {
    state,
    pagination,
    handleChangePage,
    handleChangePageSize,
    handleRefresh,
    isLoading,
  },
  {
    handleSearch,
    filterData,
  },
] = useQueryTable(queryVolumes, {
  page: 1,
  pageSize: 10,
  sortBy: 'time',
  sortDir: 'DESC',
});

const sortMap: Record<string, string> = {
  createTime: 'time',
  name: 'name',
  pvcNamespace: 'namespace',
};

const initialSort = reactive({
  id: 'createTime',
  desc: true,
});

const handleSortChange = ({ id, desc }: {id: string, desc: boolean}) => {
  initialSort.id = id;
  initialSort.desc = desc;
  filterData.sortBy = sortMap[initialSort.id];
  filterData.sortDir = initialSort.desc ? 'DESC' : 'ASC';

  handleRefresh();
};

const migrate = async (row: ApiVolume) => {
  const dialog = createDialog(MigrateDialog);

  await dialog.show({
    name: row.metadata?.name,
    volumeGroup: row.spec?.volumegroup,
  });

  handleRefresh();
};

const convertHA = async (row: ApiVolume) => {
  const dialog = createDialog(ConvertHADialog);

  await dialog.show({
    name: row.metadata?.name,
  });

  handleRefresh();
};

const expand = async (row: ApiVolume) => {
  const dialog = createDialog(ExpandDialog);

  await dialog.show({
    volume: row,
  });

  handleRefresh();
};
</script>

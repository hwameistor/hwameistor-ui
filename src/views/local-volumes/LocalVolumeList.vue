<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header :title="$t('App.nav.lv')" />

    <head-explanations page-name="localVolume" />

    <dao-table
      id="local-volume-list"
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
            name: 'LocalVolumeDetail',
            params: { name: (row as ApiVolume).metadata?.name },
          }"
          class="list-name-link"
        >
          {{ (row as ApiVolume).metadata?.name }}
        </router-link>
      </template>

      <template #td-state="{row}">
        {{ (row as ApiVolume).status?.state }}
      </template>

      <template #td-replicas="{row}">
        {{ (row as ApiVolume).spec?.replicaNumber }}
      </template>

      <template #td-volumeGroup="{row}">
        {{ (row as ApiVolume).spec?.volumegroup }}
      </template>

      <template #td-requiredCapacityBytes="{row}">
        {{ bytesToUnitDisplay((row as ApiVolume).spec?.requiredCapacityBytes) }}
      </template>

      <template #td-pvcNamespace="{row}">
        {{ (row as ApiVolume).spec?.pvcNamespace }}
      </template>

      <template #td-pvcName="{row}">
        {{ (row as ApiVolume).spec?.pvcName }}
      </template>

      <template #td-createTime="{row}">
        {{ useDateFormat((row as ApiVolume).metadata?.creationTimestamp) }}
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
              :content="$t('views.local-volumes.LocalVolumeList.disableMigrateAlert', { name: (row as ApiVolume).metadata?.name })"
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
          v-if="(row as ApiVolume).spec?.replicaNumber === 1 && (row as ApiVolume).spec?.convertible"
          @click="convertHA(row)"
        >
          {{ $t('views.local-volumes.LocalVolumeList.actions.convertHA') }}
        </dao-dropdown-item>
      </template>
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { createDialog, useDateFormat, useQueryTable } from '@dao-style/extend';
import HeadExplanations from '@/components/HeadExplanations.vue';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { Volume } from '@/services/Volume';
import type { VolumesListParams, ApiVolume } from '@/services/data-contracts';
import type { SearchOption, SearchValue } from '@dao-style/core/dist/components/toolbar/types';
import ConvertHADialog from './dialogs/ConvertHADialog.vue';
import MigrateDialog from './dialogs/MigrateDialog.vue';

const VolumeAPi = new Volume();

const { t } = useI18n();

const search = reactive<Record<string, SearchValue[]>>({});
const searchOptions = reactive<SearchOption[]>([
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
]);

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
  },
  {
    id: 'pvcName',
    header: t('views.local-volumes.LocalVolumeList.pvc'),
  },
  {
    id: 'createTime',
    header: t('views.local-volumes.LocalVolumeList.created'),
  },
  {
    id: 'action',
    header: '',
    defaultWidth: '56px',
    resizable: false,
  },

]);

const isMigrateDisabled = (row: ApiVolume) => Boolean(row.spec?.replicaNumber === 1 && row.status?.publishedNode);

const queryVolumes = async ({ page, pageSize }: VolumesListParams) => {
  const { data } = await VolumeAPi.volumesList({
    page,
    pageSize,
    volumeName: search.volumeName?.[0] as string,
    state: search.state?.[0] as string,
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
}, {
  handleSearch,
}] = useQueryTable(queryVolumes, {
  page: 1,
  pageSize: 10,
});

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
</script>

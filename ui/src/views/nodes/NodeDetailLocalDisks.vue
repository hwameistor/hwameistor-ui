<template>
  <div>
    <dao-table
      id="node-detail-local-disk-list"
      :data="state.items"
      :columns="columns"
      :page-size="pagination.pageSize"
      :current-page="pagination.page"
      :total="pagination.total"
      hide-search
      @page-change="handleChangePage"
      @size-change="handleChangePageSize"
      @refresh="handleRefresh"
    >
      <template #td-hasRaid="{value}">
        {{ $t(`views.nodes.NodeDetailLocalDisks.raid.${value ? 'isRaid' : 'notRaid'}`) }}
      </template>

      <template #td-availableCapacityBytes="{value}">
        {{ bytesToUnitDisplay(value) }}
      </template>

      <template #td-totalCapacityBytes="{value}">
        {{ bytesToUnitDisplay(value) }}
      </template>
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQueryTable } from '@dao-style/extend';
import { Node } from '@/services/NodeService';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';

const { t } = useI18n();
const route = useRoute();
const nodeName = ref<string>(route.params.name as string);

const columns = reactive([
  {
    id: 'devPath',
    header: t('views.nodes.NodeDetailLocalDisks.devPath'),
  },
  {
    id: 'state',
    header: t('views.nodes.NodeDetailLocalDisks.state'),
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
  {
    id: 'availableCapacityBytes',
    header: t('views.nodes.NodeDetailLocalDisks.availableCapacity'),
  },
  {
    id: 'totalCapacityBytes',
    header: t('views.nodes.NodeDetailLocalDisks.totalCapacity'),
  },
]);

const [{
  state,
  pagination,
  handleChangePage,
  handleChangePageSize,
  handleRefresh,
}] = useQueryTable(Node.QueryNodeDisks, {
  page: 1,
  pageSize: 10,
  nodeName: nodeName.value,
});
</script>

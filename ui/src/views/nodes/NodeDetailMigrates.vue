<template>
  <div>
    <dao-table
      id="node-detail-local-migrate-list"
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
      <template #td-startTime="{value}">
        {{ useDateFormat(value) }}
      </template>

      <template #td-endTime="{value}">
        {{ useDateFormat(value) }}
      </template>

      <template #td-action-menu="{row}">
        <dao-dropdown-item @click="showYaml(row)">
          {{ $t('views.nodes.NodeDetailMigrates.actions.viewYaml') }}
        </dao-dropdown-item>
      </template>
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQueryTable, useDateFormat, createDialog } from '@dao-style/extend';
import { Node, type NodeMigrateItem } from '@/services/NodeService';
import MonacoEditorDialog from '@/components/dialogs/MonacoEditorDialog.vue';

const { t } = useI18n();
const route = useRoute();
const nodeName = ref<string>(route.params.name as string);

const columns = reactive([
  {
    id: 'name',
    header: t('views.nodes.NodeDetailMigrates.name'),
  },
  {
    id: 'state',
    header: t('views.nodes.NodeDetailMigrates.state'),
  },
  {
    id: 'volumeName',
    header: t('views.nodes.NodeDetailMigrates.volume'),
  },
  {
    id: 'sourceNode',
    header: t('views.nodes.NodeDetailMigrates.sourceNode'),
  },
  {
    id: 'targetNode',
    header: t('views.nodes.NodeDetailMigrates.targetNode'),
  },
  {
    id: 'startTime',
    header: t('views.nodes.NodeDetailMigrates.startTime'),
  },
  {
    id: 'endTime',
    header: t('views.nodes.NodeDetailMigrates.endTime'),
  },
  {
    id: 'action',
    header: '',
  },
]);

const [{
  state,
  pagination,
  handleChangePage,
  handleChangePageSize,
  handleRefresh,
}] = useQueryTable(Node.QueryNodeMigrates, {
  page: 1,
  pageSize: 10,
  nodeName: nodeName.value,
});

const showYaml = async (row: NodeMigrateItem) => {
  const dialog = createDialog(MonacoEditorDialog);

  const { data } = await Node.GetMigrateYaml({
    migrateOperationName: row.name,
  });

  await dialog.show({
    modelValue: data,
    readOnly: true,
  });
};
</script>

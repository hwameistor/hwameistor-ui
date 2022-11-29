<template>
  <dao-table
    id="local-volume-operation-list"
    :data="items"
    :columns="columns"
    hide-toolbar
    :page-layout="[]"
  >
    <template #td-startTime="{value}">
      {{ useDateFormat(value) }}
    </template>

    <template #td-endTime="{value}">
      {{ useDateFormat(value) }}
    </template>

    <template #td-action-menu="{row}">
      <dao-dropdown-item @click="viewYaml(row)">
        {{ $t('views.local-volumes.components.LocalVolumeOperations.actions.viewYaml') }}
      </dao-dropdown-item>
    </template>
  </dao-table>
</template>

<script setup lang="ts">
import { reactive, defineProps, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { LocalVolume, type VolumeOperationItem } from '@/services/LocalVolumeService';
import { createDialog, useDateFormat } from '@dao-style/extend';
import MonacoEditorDialog from '@/components/dialogs/MonacoEditorDialog.vue';

const props = defineProps({
  volume: {
    type: String,
    default: '',
  },
});

const { t } = useI18n();
const items = ref<VolumeOperationItem[]>([]);

const columns = reactive([
  {
    id: 'name',
    header: t('views.local-volumes.components.LocalVolumeOperations.name'),
  },
  {
    id: 'state',
    header: t('views.local-volumes.components.LocalVolumeOperations.status'),
  },
  {
    id: 'volumeName',
    header: t('views.local-volumes.components.LocalVolumeOperations.volume'),
  },
  {
    id: 'sourceNode',
    header: t('views.local-volumes.components.LocalVolumeOperations.sourceNode'),
  },
  {
    id: 'targetNode',
    header: t('views.local-volumes.components.LocalVolumeOperations.targetNode'),
  },
  {
    id: 'startTime',
    header: t('views.local-volumes.components.LocalVolumeOperations.startTime'),
  },
  {
    id: 'endTime',
    header: t('views.local-volumes.components.LocalVolumeOperations.endTime'),
  },
  {
    id: 'action',
    header: '',
  },
]);

const queryLocalVolumeOperations = async () => {
  const res = await LocalVolume.QueryLocalVolumeOperations({
    volumeName: props.volume,
  });

  items.value = res.items ?? [];
};

const viewYaml = async (row: VolumeOperationItem) => {
  const dialog = createDialog(MonacoEditorDialog);

  const { data } = await LocalVolume.GetLocalVolumeOperationYaml({
    volumeOperationName: row.name,
  });

  await dialog.show({
    modelValue: data,
    readOnly: true,
  });
};

queryLocalVolumeOperations();
</script>

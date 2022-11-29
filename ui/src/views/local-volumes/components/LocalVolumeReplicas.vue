<template>
  <dao-table
    id="local-volume-replica-list"
    :data="items"
    :columns="columns"
    hide-toolbar
    :page-layout="[]"
  >
    <template #td-synced="{value}">
      {{ $t(`views.local-volumes.components.LocalVolumeReplicas.syncStates.${value ? 'synced' : 'notSync'}`) }}
    </template>

    <template #td-requiredCapacityBytes="{value}">
      {{ bytesToUnitDisplay(value) }}
    </template>

    <template #td-action-menu="{row}">
      <dao-dropdown-item @click="viewYaml(row)">
        {{ $t('views.local-volumes.components.LocalVolumeReplicas.actions.viewYaml') }}
      </dao-dropdown-item>
    </template>
  </dao-table>
</template>

<script setup lang="ts">
import { reactive, defineProps, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { LocalVolume, type VolumeReplicaItem } from '@/services/LocalVolumeService';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { createDialog } from '@dao-style/extend';
import MonacoEditorDialog from '@/components/dialogs/MonacoEditorDialog.vue';

const props = defineProps({
  volume: {
    type: String,
    default: '',
  },
});

const { t } = useI18n();
const items = ref<VolumeReplicaItem[]>([]);

const columns = reactive([
  {
    id: 'name',
    header: t('views.local-volumes.components.LocalVolumeReplicas.name'),
  },
  {
    id: 'state',
    header: t('views.local-volumes.components.LocalVolumeReplicas.status'),
  },
  {
    id: 'synced',
    header: t('views.local-volumes.components.LocalVolumeReplicas.syncState'),
  },
  {
    id: 'nodeName',
    header: t('views.local-volumes.components.LocalVolumeReplicas.node'),
  },
  {
    id: 'requiredCapacityBytes',
    header: t('views.local-volumes.components.LocalVolumeReplicas.capacity'),
  },
  {
    id: 'devicePath',
    header: t('views.local-volumes.components.LocalVolumeReplicas.device'),
  },
  {
    id: 'action',
    header: '',
  },
]);

const queryLocalVolumeReplicas = async () => {
  const res = await LocalVolume.QueryLocalVolumeReplicas({
    volumeName: props.volume,
  });

  items.value = res.volumeReplicas ?? [];
};

const viewYaml = async (row: VolumeReplicaItem) => {
  const dialog = createDialog(MonacoEditorDialog);

  const { data } = await LocalVolume.GetLocalVolumeReplicaYaml({
    volumeReplicaName: row.name,
  });

  await dialog.show({
    modelValue: data,
    readOnly: true,
  });
};

queryLocalVolumeReplicas();
</script>

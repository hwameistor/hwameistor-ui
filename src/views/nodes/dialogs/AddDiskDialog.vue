<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { Node } from '@/services/Node';
import { Pool } from '@/services/Pool';
import { V1Alpha1LocalDiskState } from '@/services/data-contracts';
import { nError, nSuccess } from '@/utils/noty';

type SimpleDisk = {
  diskType: 'HDD' | 'SSD',
  owner: 'local-storage' | 'local-disk-manager',
}

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['resolve', 'reject']);

const { t } = useI18n();
const NodeApi = new Node();
const PoolApi = new Pool();

const selectedType = ref<SimpleDisk['diskType']>('HDD');
const diskTypes = ref(['HDD', 'SSD']);
const selectedOwner = ref<SimpleDisk['owner']>('local-storage');
const diskOwners = ref([
  {
    label: 'Local Storage',
    value: 'local-storage',
  },
  {
    label: 'Disk Storage',
    value: 'local-disk-manager',
  },
]);

const availableDisks = ref<SimpleDisk[]>([]);
const noAvailableDiskTypeMessage = computed<string>(() => {
  const hasAvailable = availableDisks.value.some((disk) => disk.diskType === selectedType.value);

  return hasAvailable ? '' : t('views.nodes.dialogs.AddDiskDialog.noAvailableDiskType', { type: selectedType.value });
});

const noAvailableOwnerMessage = computed<string>(() => {
  const hasAvailable = availableDisks.value.some(
    (disk) => disk.diskType === selectedType.value && disk.owner === selectedOwner.value,
  );

  return hasAvailable ? '' : t('views.nodes.dialogs.AddDiskDialog.noAvailableOwner');
});
const init = async () => {
  const { data } = await NodeApi.nodesDisksDetail({
    page: 1,
    pageSize: -1,
    nodeName: props.name,
  });

  availableDisks.value = data.items?.filter((disk) => disk.status?.claimState === V1Alpha1LocalDiskState.LocalDiskAvailable)
    .map((disk) => ({
      diskType: disk.spec?.diskAttributes?.type,
      owner: disk.spec?.owner ?? 'local-storage',
    } as SimpleDisk)) ?? [];
};

const onConfirm = async () => {
  try {
    await PoolApi.poolsExpandCreate({
      diskType: selectedType.value,
      nodeName: props.name,
      owner: selectedOwner.value,
    });

    nSuccess(t('views.nodes.dialogs.AddDiskDialog.noty.success'));
    emits('resolve');
  } catch (error) {
    nError(
      t('views.nodes.dialogs.AddDiskDialog.noty.error'),
      error,
    );
  }
};

init();
</script>

<template>
  <dao-dialog
    :model-value="true"
    size="lg"
    :header="$t('views.nodes.dialogs.AddDiskDialog.title')"
    :text-cancel="$t('common.cancel')"
    :text-confirm="$t('common.confirm')"
    :confirm-disabled="!!noAvailableDiskTypeMessage || !!noAvailableOwnerMessage"
    @cancel="$emit('reject')"
    @confirm="onConfirm"
  >
    <dao-message
      type="warning"
      class="mb-[20px]"
    >
      <template #default="{ className }">
        <div :class="className">
          <div>{{ $t('views.nodes.dialogs.AddDiskDialog.warningContent.step1') }}</div>
          <div>{{ $t('views.nodes.dialogs.AddDiskDialog.warningContent.step2') }}</div>
        </div>
      </template>
    </dao-message>

    <dao-form>
      <dao-form-item
        :label="$t('views.nodes.dialogs.AddDiskDialog.diskType')"
        :error="noAvailableDiskTypeMessage"
      >
        <dao-select v-model="selectedType">
          <dao-option
            v-for="dt in diskTypes"
            :key="dt"
            :value="dt"
          />
        </dao-select>
      </dao-form-item>

      <dao-form-item
        :label="$t('views.nodes.dialogs.AddDiskDialog.diskOwner')"
        :error="noAvailableOwnerMessage"
      >
        <dao-select v-model="selectedOwner">
          <dao-option
            v-for="o in diskOwners"
            :key="o.value"
            :label="o.label"
            :value="o.value"
          />
        </dao-select>
      </dao-form-item>
    </dao-form>
  </dao-dialog>
</template>

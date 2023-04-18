<template>
  <dao-dialog
    :model-value="true"
    :header="$t('views.nodes.dialogs.UnreserveDiskDialog.title', { name: disk.spec?.devicePath})"
    :text-cancel="$t('common.cancel')"
    :text-confirm="$t('common.confirm')"
    @cancel="$emit('reject')"
    @confirm="onConfirm"
  >
    <div>{{ $t('views.nodes.dialogs.UnreserveDiskDialog.content', { name: disk.spec?.devicePath }) }}</div>
  </dao-dialog>
</template>

<script lang="ts" setup>
import {
  defineEmits,
  defineProps,
  type PropType,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { noty } from '@/plugins/dao-style';
import { Node } from '@/services/Node';
import { type ApiLocalDiskInfo } from '@/services/data-contracts';
import { type HttpError } from '@/types/error';

const props = defineProps({
  node: {
    type: String,
    default: '',
  },
  disk: {
    type: Object as PropType<ApiLocalDiskInfo>,
    default: () => ({}),
  },
});
const emits = defineEmits(['resolve', 'reject']);

const NodeApi = new Node();

const { t } = useI18n();

const onConfirm = async () => {
  const { node, disk } = props;

  try {
    await NodeApi.nodesDisksCreate(
      node,
      disk.diskPathShort ?? '',
      { reserve: false },
    );

    emits('resolve');
    noty.success({
      content: t('views.nodes.dialogs.UnreserveDiskDialog.noty.success'),
    });
  } catch (error) {
    noty.error({
      title: t('views.nodes.dialogs.UnreserveDiskDialog.noty.error'),
      content: ((error as HttpError).error).description,
    });
  }
};
</script>

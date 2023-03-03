<template>
  <dao-dialog
    :model-value="true"
    :header="$t('views.local-volumes.dialogs.ConvertHADialog.title')"
    size="md"
    :text-cancel="$t('common.cancel')"
    :text-confirm="$t('common.confirm')"
    @cancel="$emit('reject')"
    @confirm="onConfirm"
  >
    <div>{{ $t('views.local-volumes.dialogs.ConvertHADialog.content', { name }) }}</div>
    <div>{{ $t('views.local-volumes.dialogs.ConvertHADialog.helper') }}</div>
  </dao-dialog>
</template>

<script lang="ts" setup>
import {
  defineEmits,
  defineProps,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { noty } from '@/plugins/dao-style';
import { Volume } from '@/services/Volume';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['resolve', 'reject']);

const VolumeAPi = new Volume();

const { t } = useI18n();

const onConfirm = async () => {
  try {
    await VolumeAPi.volumesConvertCreate(props.name, {
      abort: false,
    });

    emits('resolve');
    noty.success({
      content: t('views.local-volumes.dialogs.ConvertHADialog.noty.success'),
    });
  } catch (error) {
    noty.error({
      content: t('views.local-volumes.dialogs.ConvertHADialog.noty.error', {
        msg: (error as Record<string, unknown>)?.message,
      }),
    });
  }
};
</script>

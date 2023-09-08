<script setup lang='ts'>
import { DaoConfirmDialogFooter } from '@dao-style/extend';
import { noop } from '@vueuse/shared';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { nError, nSuccess } from '@/utils/noty';

type Emits = {
  (event: 'resolve', content: boolean): void,
  (event: 'reject'): void,
}

const emits = defineEmits<Emits>();

const props = defineProps({
  header: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  deleteFn: {
    type: Function,
    default: noop,
  },
  successMessage: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: undefined,
  },
});

const { t } = useI18n();
const isPosting = ref(false);

const onConfirmDelete = async () => {
  isPosting.value = true;
  try {
    await props.deleteFn();
    nSuccess(
      props.successMessage || t('components.dialogs.DoubleConfirmDialog.noty.success', { name: props.name }),
    );
    emits('resolve', true);
  } catch (e) {
    nError(
      props.errorMessage || t('components.dialogs.DoubleConfirmDialog.noty.error', { name: props.name }),
      e,
    );
  } finally {
    isPosting.value = false;
  }
};
</script>

<template>
  <dao-dialog
    :model-value="true"
    :header="header || $t('components.dialogs.DoubleConfirmDialog.header', {name})"
    @cancel="emits('reject')"
  >
    <span class="break-all">
      {{ content || $t('components.dialogs.DoubleConfirmDialog.content', {name}) }}
    </span>
    <template #footer>
      <dao-confirm-dialog-footer
        :text="name"
        :confirm-loading="isPosting"
        :confirm-text="confirmText"
        @confirm="onConfirmDelete"
        @cancel="emits('reject')"
      />
    </template>
  </dao-dialog>
</template>

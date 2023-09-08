<script lang='ts' setup>
import { defineEmits, defineProps, PropType } from 'vue';
import { nError, nSuccess } from '@/utils/noty';

const emits = defineEmits(['resolve', 'reject']);

const props = defineProps({
  header: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  confirmFn: {
    type: Function as PropType<() => Promise<unknown>>,
    default: () => Promise.resolve(true),
  },
  successMessage: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const handleConfirm = async () => {
  if (props.confirmFn instanceof Function) {
    try {
      await props.confirmFn();

      if (props.successMessage) {
        nSuccess(props.successMessage);
      }
      emits('resolve');
    } catch (error) {
      if (props.errorMessage) {
        nError(props.errorMessage, error);
      }
    }
  }
};
</script>

<template>
  <dao-dialog
    :header="header"
    :model-value="true"
    @confirm="handleConfirm"
    @cancel="emits('reject')"
  >
    {{ content }}
  </dao-dialog>
</template>

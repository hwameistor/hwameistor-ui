<template>
  <dao-dialog
    ref="dialogEl"
    class="monaco-editor-dialog"
    :model-value="true"
    :header="header"
    size="lg"
    :text-cancel="$t('common.cancel')"
    :text-confirm="$t('common.confirm')"
    :confirm-disabled="disabled"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <div
      class="overflow-hidden !w-full"
      :style="{height: throttledHeight + 'px'}"
    >
      <monaco-editor
        :model-value="modelValue"
        :schema="schema"
        :read-only="readOnly"
        @marker-change="disabled = $event !== 0"
      />
    </div>

    <template
      v-if="readOnly"
      #footer
    >
      <dao-button @click="$emit('reject')">
        {{ $t('common.close') }}
      </dao-button>
    </template>
  </dao-dialog>
</template>

<script lang="ts" setup>
import {
  defineEmits, defineProps, onMounted, ref, watchEffect,
} from 'vue';
import MonacoEditor from '@/components/monaco-editor/MonacoEditor.vue';
import { refThrottled, useWindowSize } from '@vueuse/core';
import { Dialog } from '@dao-style/core';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  header: {
    type: String,
    default: 'YAML',
  },
  height: {
    type: [String, Number],
    default: '600px',
  },
  schema: {
    type: Object,
    default: () => ({}),
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});

const curYaml = ref(props.modelValue);

const emits = defineEmits(['resolve', 'reject']);

const disabled = ref(false);

const onConfirm = () => {
  emits('resolve', curYaml.value);
};

const onCancel = () => {
  emits('reject');
};

const dialogEl = ref<InstanceType<typeof Dialog>>();

const computedHeight = ref();
const throttledHeight = refThrottled(computedHeight, 16);

const { height: windowHeight } = useWindowSize();

onMounted(() => {
  const styles = window.getComputedStyle(dialogEl.value?.$el?.querySelector('.dao-dialog__container') as HTMLElement);
  const marginTop = parseFloat(styles.getPropertyValue('margin-top'));
  const marginBottom = parseFloat(styles.getPropertyValue('margin-bottom'));

  const headerHeight = dialogEl.value?.$el?.querySelector('.dao-dialog__header')?.clientHeight ?? 0;
  const footerHeight = dialogEl.value?.$el?.querySelector('.dao-dialog__footer')?.clientHeight ?? 0;

  watchEffect(() => {
    const bodyHeight = windowHeight.value - marginTop - marginBottom - headerHeight - footerHeight;

    computedHeight.value = Math.min(parseFloat(props.height.toString()), bodyHeight);
  });
});
</script>

<style lang="scss" scoped>
.monaco-editor-dialog {
  :deep(.dao-dialog__body) {
    padding: 0;
    overflow: hidden;
  }
}
</style>

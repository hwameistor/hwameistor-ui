<template>
  <dao-dialog
    :model-value="true"
    :header="$t('views.local-volumes.dialogs.ExpandDialog.title')"
    :text-cancel="$t('common.cancel')"
    :text-confirm="$t('common.confirm')"
    :confirm-disabled="!!errorMessage"
    @cancel="$emit('reject')"
    @confirm="handleConfirm"
  >
    <dao-message
      class="mb-[10px]"
      :content="$t('views.local-volumes.dialogs.ExpandDialog.helper')"
    />

    <div class="flex items-start mb-[5px]">
      <div class="w-[249px] flex-none">
        <div class="input-label">
          {{ $t('views.local-volumes.dialogs.ExpandDialog.currentCapacity') }}
        </div>
        <dao-input
          :model-value="originCapacity"
          append="GB"
          type="number"
          disabled
          block
        />
      </div>

      <svg-icon
        class="h-[16px] w-[42px] mx-[10px] mt-[32px]"
        name="arrow"
      />

      <div class="w-[249px] flex-none">
        <div class="input-label">
          {{ $t('views.local-volumes.dialogs.ExpandDialog.targetCapacity') }}
        </div>
        <dao-input
          v-model="targetCapacity"
          append="GB"
          type="number"
          block
          :min="originCapacity"
        />
      </div>
    </div>

    <dao-error-text
      v-if="errorMessage"
      class="mt-[2px]"
      :content="errorMessage"
    />

    <dao-helper-text :content="$t('views.local-volumes.dialogs.ExpandDialog.availableCapacity', { count: availableCapacity })" />
  </dao-dialog>
</template>

<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  ref,
  type PropType,
} from 'vue';
import { Node } from '@/services/Node';
import { Volume } from '@/services/Volume';
import type { ApiVolume } from '@/services/data-contracts';
import { noty } from '@/plugins/dao-style';
import { type HttpError } from '@/types/error';
import { min } from 'lodash-es';
import bytesToUnit from '@/utils/bytesToUnit';
import { useI18n } from 'vue-i18n';
import SvgIcon from '@/components/SvgIcon.vue';

const props = defineProps({
  volume: {
    type: Object as PropType<ApiVolume>,
    default: () => ({}),
  },
});
const emits = defineEmits(['resolve', 'reject']);
const { t } = useI18n();

// GB to Byte rate
const rate = 2 ** 30;

const NodeApi = new Node();
const VolumeApi = new Volume();

const volumePoolName = computed<string>(() => props.volume.spec?.poolName ?? '');
const volumeNodeNames = computed<string[]>(() => props.volume.spec?.accessibility?.nodes ?? []);
const originCapacity = computed<number>(() => bytesToUnit(props.volume.status?.allocatedCapacityBytes ?? 0, 'GB').value);
const targetCapacity = ref<number>(originCapacity.value);

const availableCapacity = ref<number>(0);
const getAvailableCapacity = async () => {
  const res = await NodeApi.nodesList({
    page: 1,
    pageSize: -1,
  });

  const capacity = (res.data.items ?? [])
    .filter((n) => volumeNodeNames.value.includes(n.localStorageNode?.metadata?.name ?? ''))
    .map((n) => n.localStorageNode?.status?.pools?.[volumePoolName.value].freeCapacityBytes ?? 0);

  availableCapacity.value = bytesToUnit(min(capacity) ?? 0, 'GB').value;
};

const errorMessage = computed<string>(() => {
  if (targetCapacity.value <= 0) {
    return t('views.local-volumes.dialogs.ExpandDialog.mustPositiveInteger');
  }

  if (targetCapacity.value < originCapacity.value) {
    return t('views.local-volumes.dialogs.ExpandDialog.targetLowThanOriginal');
  }

  if (targetCapacity.value - originCapacity.value > availableCapacity.value) {
    return t('views.local-volumes.dialogs.ExpandDialog.moreThanAvailable');
  }

  return '';
});

const handleConfirm = async () => {
  try {
    await VolumeApi.volumesExpandCreate(props.volume.metadata?.name ?? '', {
      abort: false,
      targetCapacity: (targetCapacity.value * rate).toString(),
    });

    emits('resolve');
    noty.success({
      content: t('views.local-volumes.dialogs.ExpandDialog.noty.success'),
    });
  } catch (error) {
    noty.error({
      title: t('views.local-volumes.dialogs.ExpandDialog.noty.error'),
      content: ((error as HttpError).error).description,
    });
  }
};

getAvailableCapacity();
</script>

<style lang="scss" scoped>
.input-label {
  margin-bottom: 5px;
  font-size: 13px;
  font-weight: 700;
  line-height: 20px;
  color: var(--dao-gray-040);
}
</style>

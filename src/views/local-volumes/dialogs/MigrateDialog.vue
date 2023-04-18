<template>
  <dao-dialog
    :model-value="true"
    :header="$t('views.local-volumes.dialogs.MigrateDialog.title', { name })"
    size="lg"
    :text-cancel="$t('common.cancel')"
    :text-confirm="$t('common.confirm')"
    @cancel="$emit('reject')"
  >
    <template v-if="volumeNames.length">
      <dao-message
        :content="$t('views.local-volumes.dialogs.MigrateDialog.globalAlert', {
          name,
          names: volumeNames.join(','),
        })"
        class="mb-[20px]"
        :is-close-show="false"
      />

      <dao-table
        id="migrate-local-volume"
        class="mb-[20px]"
        :data="volumeGroupItems"
        :columns="columns"
        hide-toolbar
        :page-layout="[]"
      >
        <template #td-name="{row}">
          {{ row.metadata?.name }}
        </template>

        <template #td-state="{row}">
          {{ row.status?.state }}
        </template>

        <template #td-nodes="{row}">
          {{ row.spec?.accessibility?.nodes?.join(', ') }}
        </template>
      </dao-table>
    </template>

    <dao-form v-slot="{classNames}">
      <dao-form-item
        :label="$t('views.local-volumes.dialogs.MigrateDialog.sourceNode')"
        :helper="$t('views.local-volumes.dialogs.MigrateDialog.sourceNodeHelper')"
      >
        <dao-select
          v-model="sourceNode"
          class="!w-[400px]"
        >
          <dao-option
            v-for="node in volumeGroup?.spec?.accessibility?.nodes ?? []"
            :key="node"
            :value="node"
          />
        </dao-select>
      </dao-form-item>

      <dao-form-item
        :label="$t('views.local-volumes.dialogs.MigrateDialog.targetNode')"
      >
        <div :class="classNames.wrapper.radio">
          <dao-radio-group
            v-model="targetNodeType"
            :vertical="false"
          >
            <dao-radio
              value="auto"
              :label="$t('views.local-volumes.dialogs.MigrateDialog.autoSelect')"
            />
            <dao-radio
              value="manual"
              :label="$t('views.local-volumes.dialogs.MigrateDialog.manualSelect')"
            />
          </dao-radio-group>
        </div>
      </dao-form-item>

      <dao-form-item
        v-if="targetNodeType === 'manual'"
        :label="$t('views.local-volumes.dialogs.MigrateDialog.manualSelectNode')"
      >
        <dao-select
          v-model="targetNode"
          class="!w-[400px]"
        >
          <dao-option
            v-for="node in targetNodes"
            :key="node"
            :value="node ?? ''"
          />
        </dao-select>
      </dao-form-item>
    </dao-form>

    <template #footer>
      <dao-confirm-dialog-footer
        :text="name"
        :confirm-text="$t('views.local-volumes.dialogs.MigrateDialog.migrate')"
        :cancel-text="$t('common.cancel')"
        @confirm="onConfirm"
        @cancel="$emit('reject')"
      />
    </template>
  </dao-dialog>
</template>

<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { DaoConfirmDialogFooter } from '@dao-style/extend';
import { VolumeGroup } from '@/services/VolumeGroup';
import { Node } from '@/services/Node';
import { Volume } from '@/services/Volume';
import type { ApiStorageNode, ApiVolumeGroup, V1Alpha1LocalVolume } from '@/services/data-contracts';
import { noty } from '@/plugins/dao-style';
import { type HttpError } from '@/types/error';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  volumeGroup: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['resolve', 'reject']);

const VolumeGroupApi = new VolumeGroup();
const NodeApi = new Node();
const VolumeApi = new Volume();

const { t } = useI18n();
const volumeGroup = ref<ApiVolumeGroup>();
const volumeGroupItems = ref<V1Alpha1LocalVolume[]>([]);
const nodes = ref<ApiStorageNode[]>([]);
const sourceNode = ref<string>();
const targetNode = ref<string>();
const targetNodeType = ref<'auto' | 'manual'>('auto');
const columns = computed(() => [
  {
    id: 'name',
    header: t('views.local-volumes.dialogs.MigrateDialog.localVolumeName'),
  },
  {
    id: 'state',
    header: t('views.local-volumes.dialogs.MigrateDialog.state'),
  },
  {
    id: 'nodes',
    header: t('views.local-volumes.dialogs.MigrateDialog.node'),
  },
]);

const volumeNames = computed(() => volumeGroupItems.value
  .filter((v) => v.metadata?.name !== props.name)
  .map((v) => v.metadata?.name) ?? []);

const targetNodes = computed(() => nodes.value
  .map((n) => n.localStorageNode?.metadata?.name)
  .filter((n) => !volumeGroup.value?.spec?.accessibility?.nodes?.includes(n ?? '')) ?? []);

const onConfirm = async () => {
  try {
    await VolumeApi.volumesMigrateCreate(props.name, {
      selectedNode: targetNodeType.value === 'manual' ? targetNode.value : undefined,
      srcNode: sourceNode.value,
    });

    emits('resolve');
    noty.success({
      content: t('views.local-volumes.dialogs.MigrateDialog.noty.success'),
    });
  } catch (error) {
    noty.error({
      title: t('views.local-volumes.dialogs.MigrateDialog.noty.error'),
      content: ((error as HttpError).error).description,
    });
  }
};

const getVolumeGroup = async () => {
  const res = await VolumeGroupApi.volumegroupsDetail(props.volumeGroup);

  volumeGroup.value = res.data;
  volumeGroupItems.value = res.data.items ?? [];
};

const queryNodes = async () => {
  const res = await NodeApi.nodesList({
    page: 1,
    pageSize: -1,
  });

  nodes.value = res.data.items ?? [];
};

getVolumeGroup();
queryNodes();
</script>

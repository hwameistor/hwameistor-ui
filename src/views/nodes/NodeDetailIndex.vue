<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header type="3rd">
      <template #breadcrumb>
        <dao-breadcrumb
          :list="[
            {
              label: $t('App.nav.node'),
              to: { name: 'NodeList' },
            },
            {
              value: nodeName,
            },
          ]"
          @navigate="$router.push"
        />
      </template>
    </dao-header>

    <dao-card
      type="simple"
      :title="$t('views.nodes.NodeDetailIndex.basicInfo')"
    >
      <dao-card-item>
        <dao-key-value-layout
          :column="5"
          direction="vertical"
        >
          <dao-key-value-layout-item :label="$t('views.nodes.NodeDetailIndex.nodeStatus')">
            <node-status :status="nodeDetail?.k8SNodeState" />
          </dao-key-value-layout-item>
          <dao-key-value-layout-item :label="$t('views.nodes.NodeDetailIndex.driverStatus')">
            <driver-status :status="nodeDetail?.localStorageNode?.status?.state" />
          </dao-key-value-layout-item>
          <dao-key-value-layout-item
            :label="$t('views.nodes.NodeDetailIndex.HDDUsage')"
            :value="getPercent(
              getDiskUsage('HDD'),
              getDiskTotal('HDD'),
            )"
          />
          <dao-key-value-layout-item
            :label="$t('views.nodes.NodeDetailIndex.SSDUsage')"
            :value="getPercent(
              getDiskUsage('SSD'),
              getDiskTotal('SSD'),
            )"
          />
          <dao-key-value-layout-item
            :label="$t('views.nodes.NodeDetailIndex.usedDisk')"
            :value="`${getBoundDiskCount()}/${nodeDetail?.localDiskNode?.status?.totalDisk ?? '-'}`"
          />
        </dao-key-value-layout>
      </dao-card-item>
    </dao-card>

    <dao-tabs
      class="flex-none mt-[20px]"
      :model-value="activeTab.routeName"
      type="card"
      @click="changeTab"
    >
      <dao-tab-item
        v-for="tab in tabs"
        :key="tab.key"
        :value="tab.routeName"
        :label="tab.display"
      />
    </dao-tabs>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { DaoKeyValueLayout, DaoKeyValueLayoutItem } from '@dao-style/extend';
import { type RouteTab } from '@/types/tab';
import { Node } from '@/services/Node';
import NodeStatus from '@/components/NodeStatus.vue';
import { ApiStorageNode } from '@/services/data-contracts';
import { sum } from 'lodash-es';
import DriverStatus from './components/DriverStatus.vue';

const NodeApi = new Node();

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const nodeName = ref<string>(route.params.name as string);
const nodeDetail = ref<ApiStorageNode>();
const tabs = reactive<RouteTab[]>([
  {
    key: 'local-disk',
    routeName: 'NodeDetailLocalDisks',
    display: t('views.nodes.NodeDetailIndex.localDisk'),
  },
  {
    key: 'migrates',
    routeName: 'NodeDetailMigrates',
    display: t('views.nodes.NodeDetailIndex.migrateRecords'),
  },
]);

const activeTab = computed<RouteTab>(() => {
  const target = tabs.find((tab) => tab.routeName === router.currentRoute.value.name);

  return target || tabs[0];
});

const changeTab = (event: Event, routeName: string) => {
  router.push({ name: routeName });
};

const getNodeDetail = async () => {
  const res = await NodeApi.nodesDetail(nodeName.value);

  nodeDetail.value = res.data;
};

const getDiskUsage = (type: 'HDD' | 'SSD') => {
  const bytes = Object.values(nodeDetail.value?.localStorageNode?.status?.pools ?? {})
    .filter((pool) => pool.class === type)
    .map((pool) => pool.usedCapacityBytes);

  return sum(bytes);
};

const getDiskTotal = (type: 'HDD' | 'SSD') => {
  const bytes = Object.values(nodeDetail.value?.localStorageNode?.status?.pools ?? {})
    .filter((pool) => pool.class === type)
    .map((pool) => pool.totalCapacityBytes);

  return sum(bytes);
};

const getBoundDiskCount = () => {
  const boundedDisks = Object.values(nodeDetail.value?.localDiskNode?.status?.disks ?? {}).filter((disk) => disk.status === 'Bound');

  return boundedDisks.length;
};

const getPercent = (used: number, total: number) => {
  if (!total) {
    return '-';
  }

  return `${((used * 100) / total).toFixed(0)}%`;
};

getNodeDetail();
</script>

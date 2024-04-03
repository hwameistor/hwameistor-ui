<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header :title="$t('App.nav.dashboard')" />

    <div class="flex mx-[-10px]">
      <dao-card
        class="flex-1 mx-[10px]"
        type="headless"
      >
        <dao-card-item class="h-[275px] flex flex-col justify-between">
          <div class="h-[130px]">
            <gauge-chart
              :used="nodeMetric.allocated"
              :total="nodeMetric.total"
              used-color="#4BB0ED"
              unused-color="#E4E7ED"
              :label="$t('views.dashboard.DashboardView.storageUsed')"
            >
              <div class="gauge-chart-percent-label">
                {{ getPercent(nodeMetric.allocated, nodeMetric.total) }}<small class="gauge-chart-percent-label--sm">%</small>
              </div>
            </gauge-chart>
          </div>

          <div>
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.freeCapacity')"
              :value="bytesToUnitDisplay(nodeMetric.allocatable)"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.reservedCapacity')"
              :value="bytesToUnitDisplay(nodeMetric.reserved)"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.allocatedCapacity')"
              :value="bytesToUnitDisplay(nodeMetric.allocated)"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.totalCapacity')"
              :value="bytesToUnitDisplay(nodeMetric.total)"
            />
          </div>
        </dao-card-item>
      </dao-card>

      <dao-card
        class="flex-1 mx-[10px]"
        type="headless"
      >
        <dao-card-item class="h-[275px] flex flex-col justify-between">
          <div class="h-[130px]">
            <gauge-chart
              :used="volumeMetric.ha"
              :total="volumeMetric.total"
              used-color="#4FD886"
              unused-color="#4BB0ED"
              :count="volumeMetric.total"
              :label="$t('views.dashboard.DashboardView.localVolume')"
            />
          </div>

          <div>
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.highAvailabilityVolumes')"
              mark-color="#4FD886"
              :value="volumeMetric.ha"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.noneHighAvailabilityVolumes')"
              mark-color="#4BB0ED"
              :value="volumeMetric.nonHa"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.totalLocalVolumes')"
              :value="volumeMetric.total"
            />
          </div>
        </dao-card-item>
      </dao-card>

      <dao-card
        class="flex-1 mx-[10px]"
        type="headless"
      >
        <dao-card-item class="h-[275px] flex flex-col justify-between">
          <div class="h-[130px]">
            <gauge-chart
              :used="diskMetric.health"
              :total="diskMetric.total"
              used-color="#4FD886"
              unused-color="#FF6161"
              :count="diskMetric.bound"
              :label="$t('views.dashboard.DashboardView.boundedDisk')"
            />
          </div>

          <div>
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.boundedDisk')"
              :value="diskMetric.bound"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.healthy')"
              mark-color="#4FD886"
              :value="diskMetric.health"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.error')"
              mark-color="#FF6161"
              :value="diskMetric.error"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.totalDisk')"
              :value="diskMetric.total"
            />
          </div>
        </dao-card-item>
      </dao-card>

      <dao-card
        class="flex-1 mx-[10px]"
        type="headless"
      >
        <dao-card-item class="h-[275px] flex flex-col justify-between">
          <div class="h-[130px]">
            <gauge-chart
              :used="nodeCountMetric.healthy"
              :total="nodeCountMetric.total"
              used-color="#4FD886"
              unused-color="#FF6161"
              :count="nodeCountMetric.total"
              :label="$t('views.dashboard.DashboardView.totalNode')"
            />
          </div>

          <div>
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.healthy')"
              mark-color="#4FD886"
              :value="nodeCountMetric.healthy"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.error')"
              mark-color="#FF6161"
              :value="nodeCountMetric.total - nodeCountMetric.healthy"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.totalNode')"
              :value="nodeCountMetric.total"
            />
          </div>
        </dao-card-item>
      </dao-card>
    </div>

    <div class="flex mx-[-10px] mt-[16px]">
      <dao-card
        type="simple"
        :title="$t('views.dashboard.DashboardView.storagePoolResource')"
        class="flex-1 mx-[10px]"
      >
        <dao-card-item class="px-[10px] h-[255px] !overflow-visible">
          <percent-panel-item
            v-for="pool in poolResource"
            :key="pool.name"
            class="first:mt-0 mt-[8px] h-[58px]"
            :label="pool.name"
            :percent="pool.percent"
          />
        </dao-card-item>
      </dao-card>

      <dao-card
        type="simple"
        :title="$t('views.dashboard.DashboardView.top5NodeUsage')"
        class="flex-1 mx-[10px]"
      >
        <template #action>
          <dao-select
            v-model="nodeType"
            size="sm"
          >
            <dao-option
              value="SSD"
              :label="$t('views.dashboard.DashboardView.ssdStorage')"
            />
            <dao-option
              value="HDD"
              :label="$t('views.dashboard.DashboardView.hddStorage')"
            />
          </dao-select>
        </template>

        <template #footer>
          <router-link
            v-slot="{navigate}"
            custom
            :to="{name: 'Node'}"
          >
            <dao-text-button
              :prop="{
                type:'link',
              }"
              tag="a"
              class="flex justify-center cursor-pointer h-[36px] align-middle"
              @click="navigate"
            >
              {{ $t('views.dashboard.DashboardView.viewDetail') }}
            </dao-text-button>
          </router-link>
        </template>

        <dao-card-item class="px-[10px] h-[215px] !overflow-visible">
          <percent-panel-item
            v-for="node in nodeResource"
            :key="node.name"
            class="flex-auto first:mt-0 mt-[4px] h-[42px]"
            :label="node.name"
            :percent="node.percent"
            :percent-label-prefix="nodeType"
          />
        </dao-card-item>
      </dao-card>

      <dao-card
        type="simple"
        :title="$t('views.dashboard.DashboardView.componentStatus')"
        class="flex-1 mx-[10px]"
      >
        <dao-card-item class="px-[10px] h-[255px] !overflow-auto">
          <component-panel-item
            v-for="comp in componentStatus"
            :key="comp.name"
            :name="comp.name"
            :status="comp.status"
          />
        </dao-card-item>
      </dao-card>
    </div>

    <div class="dao-card dao-card--simple mt-[16px]">
      <div class="dao-card-header">
        <div class="dao-card-header-item dao-card-header-title">
          {{ $t('views.dashboard.DashboardView.events') }}
        </div>
      </div>
    </div>

    <event-list />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { Node } from '@/services/Node';
import { sum } from 'lodash-es';
import { Volume } from '@/services/Volume';
import { type V1Alpha1DeployStatus, V1Alpha1State } from '@/services/data-contracts';
import { Metric } from '@/services/Metric';
import { Pool } from '@/services/Pool';
import { LocalDisk } from '@/services/LocalDisk';
import { LocalDiskNode } from '@/services/LocalDiskNode';
import GaugeChart from './components/GaugeChart.vue';
import GaugePanelItem from './components/GaugePanelItem.vue';
import PercentPanelItem from './components/PercentPanelItem.vue';
import ComponentPanelItem from './components/ComponentPanelItem.vue';
import EventList from './components/EventList.vue';

// type ResourceItem = {
//   name: string;
//   percent: number;
// }

type NodeSimpleItem = {
  name: string;
  percent: number;
}

type NodesSimpleListByType = {
  SSD: NodeSimpleItem[];
  HDD: NodeSimpleItem[];
}

type PoolSimpleItem = {
  name: string;
  percent: number;
}

type ComponentItem = {
  name: string;
  status: 'NotReady' | 'Running'
}

const NodeApi = new Node();
const VolumeApi = new Volume();
const MetricApi = new Metric();
const PoolApi = new Pool();
const LocalDiskApi = new LocalDisk();
const LocalDiskNodeApi = new LocalDiskNode();

const getPercent = (numerator: number, denominator: number) => {
  if (!denominator) {
    return 0;
  }

  return ((numerator * 100) / denominator).toFixed(0);
};

const nodeMetric = reactive({
  allocatable: 0,
  reserved: 0,
  allocated: 0,
  total: 0,
});
const nodeCountMetric = reactive({
  healthy: 0,
  total: 0,
});
const nodesSimpleListByType = ref<NodesSimpleListByType>({
  SSD: [],
  HDD: [],
});
const nodeType = ref<'SSD' | 'HDD'>('SSD');
const nodeResource = computed(() => {
  const nodeSimpleList = nodesSimpleListByType.value[nodeType.value];

  return nodeSimpleList.sort((b, a) => a.percent - b.percent).slice(0, 5);
});
const queryNodes = async () => {
  const { data } = await NodeApi.nodesList({
    page: 1,
    pageSize: -1,
  });

  nodeMetric.allocatable = sum(data.items?.map(
    (node) => sum(Object.values(node.localStorageNode?.status?.pools ?? {}).map((pool) => pool.freeCapacityBytes)),
  ));
  nodeMetric.allocated = sum(data.items?.map(
    (node) => sum(Object.values(node.localStorageNode?.status?.pools ?? {}).map((pool) => pool.usedCapacityBytes)),
  ));
  nodeMetric.total = sum(data.items?.map(
    (node) => sum(Object.values(node.localStorageNode?.status?.pools ?? {}).map((pool) => pool.totalCapacityBytes)),
  ));

  (data.items ?? []).forEach((node) => {
    const hddUsed = sum(
      Object.values(node.localStorageNode?.status?.pools ?? {})
        .filter((pool) => pool.class === 'HDD')
        .map((pool) => pool.usedCapacityBytes),
    );
    const hddTotal = sum(
      Object.values(node.localStorageNode?.status?.pools ?? {})
        .filter((pool) => pool.class === 'HDD')
        .map((pool) => pool.totalCapacityBytes),
    );
    const ssdUsed = sum(
      Object.values(node.localStorageNode?.status?.pools ?? {})
        .filter((pool) => pool.class === 'SSD')
        .map((pool) => pool.usedCapacityBytes),
    );
    const ssdTotal = sum(
      Object.values(node.localStorageNode?.status?.pools ?? {})
        .filter((pool) => pool.class === 'SSD')
        .map((pool) => pool.totalCapacityBytes),
    );

    const name = node.localStorageNode?.metadata?.name ?? '';

    if (ssdTotal) {
      nodesSimpleListByType.value.SSD.push({
        name,
        percent: ssdUsed / ssdTotal,
      });
    }

    if (hddTotal) {
      nodesSimpleListByType.value.HDD.push({
        name,
        percent: hddUsed / hddTotal,
      });
    }
  });

  if (!nodesSimpleListByType.value.SSD.length && nodesSimpleListByType.value.HDD.length) {
    nodeType.value = 'HDD';
  }
};
const queryLocalNodes = async () => {
  const { data } = await LocalDiskNodeApi.localdisknodesList({});

  nodeCountMetric.total = data.items?.length ?? 0;

  nodeCountMetric.healthy = data.items?.reduce((pre, cur) => {
    let count = pre;

    if (cur.status?.state === V1Alpha1State.NodeStateReady) {
      count += 1;
    }

    return count;
  }, 0) ?? 0;
};

const volumeMetric = reactive({
  ha: 0,
  nonHa: 0,
  total: 0,
});
const queryVolumes = async () => {
  const { data } = await VolumeApi.volumesList({
    page: 1,
    pageSize: -1,
  });

  volumeMetric.ha = data.items?.filter((volume) => volume.spec?.convertible && (volume.spec?.replicaNumber ?? 0) >= 2)?.length ?? 0;
  volumeMetric.total = data.pagination?.total ?? 0;
  volumeMetric.nonHa = volumeMetric.total - volumeMetric.ha;
};

const diskMetric = reactive({
  bound: 0,
  health: 0,
  error: 0,
  total: 0,
});
const queryDisks = async () => {
  const { data } = await LocalDiskApi.localdisksList({});

  diskMetric.total = data.items?.length ?? 0;
  diskMetric.bound = data.items?.filter((disk) => disk.status?.claimState === 'Bound').length ?? 0;
  diskMetric.health = data.items?.filter((disk) => disk.spec?.state === 'Active').length ?? 0;
  diskMetric.error = diskMetric.total - diskMetric.health;

  nodeMetric.reserved = sum(data.items?.filter((disk) => disk.spec?.reserved).map((disk) => disk.spec?.capacity));
};

const poolResource = ref<PoolSimpleItem[]>([]);
const queryPools = async () => {
  const { data } = await PoolApi.poolsList({
    page: 1,
    pageSize: -1,
  });

  poolResource.value = data.items
    ?.map((pool) => ({
      name: pool.poolName ?? '',
      percent: (pool.allocatedCapacityBytes ?? 0) / (pool.totalCapacityBytes ?? 1),
    }))
    .sort((b, a) => a.percent - b.percent) ?? [];
};

const componentStatus = ref<ComponentItem[]>([]);
const getComponentStatus = (health: string, instance: V1Alpha1DeployStatus): 'NotReady' | 'Running' => {
  if (instance.workloadType === 'DaemonSet') {
    if (instance.desiredPodCount && instance.desiredPodCount === instance.availablePodCount) {
      return 'Running';
    }

    return 'NotReady';
  }

  if (instance.workloadType === 'Deployment') {
    return health === 'Normal' ? 'Running' : 'NotReady';
  }

  return 'NotReady';
};
const queryStatus = async () => {
  const { data } = await MetricApi.statusList({});

  componentStatus.value = Object.values(data.componentStatus ?? {})?.map((value) => ({
    name: value.instances.workloadName,
    status: getComponentStatus(value.health, value.instances),
  }));
};

queryNodes();
queryLocalNodes();
queryVolumes();
queryDisks();
queryPools();
queryStatus();
</script>

<style lang="scss">
.dao-text-button.dao-text-button--link:not(.is-disabled):hover::after {
  display: none;
}

.gauge-chart-percent-label {
  font-size: 26px;
  font-weight: 700;
  line-height: 30px;
  color: var(--dao-gray-010);
  text-align: center;

  &--sm {
    font-size: 12px;
  }
}
</style>

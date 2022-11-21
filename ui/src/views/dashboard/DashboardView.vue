<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header :title="$t('App.nav.dashboard')" />

    <div class="flex mx-[-10px]">
      <dao-card
        class="flex-1 mx-[10px] overflow-hidden"
        type="headless"
      >
        <dao-card-item class="h-[275px] flex flex-col justify-between">
          <div class="h-[130px]">
            <gauge-chart
              :used="metric?.allocatedCapacityBytes"
              :total="(metric?.totalCapacityBytes ?? 0) - (metric?.reservedCapacityBytes ?? 0)"
              used-color="#4BB0ED"
              unused-color="#E4E7ED"
              :label="$t('views.dashboard.DashboardView.storageUsed')"
            >
              <div class="gauge-chart-percent-label">
                {{ computedStorageUsageRate }}<small class="gauge-chart-percent-label--sm">%</small>
              </div>
            </gauge-chart>
          </div>

          <div>
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.freeCapacity')"
              :value="bytesToUnitDisplay(metric?.freeCapacityBytes)"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.reservedCapacity')"
              :value="bytesToUnitDisplay(metric?.reservedCapacityBytes)"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.allocatedCapacity')"
              :value="bytesToUnitDisplay(metric?.allocatedCapacityBytes)"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.totalCapacity')"
              :value="bytesToUnitDisplay(metric?.totalCapacityBytes)"
            />
          </div>
        </dao-card-item>
      </dao-card>

      <dao-card
        class="flex-1 mx-[10px] overflow-hidden"
        type="headless"
      >
        <dao-card-item class="h-[275px] flex flex-col justify-between">
          <div class="h-[130px]">
            <gauge-chart
              :used="metric?.highAvailableVolumeNum"
              :total="metric?.localVolumeNum"
              used-color="#4FD886"
              unused-color="#4BB0ED"
              :count="metric?.localVolumeNum"
              :label="$t('views.dashboard.DashboardView.localVolume')"
            />
          </div>

          <div>
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.highAvailabilityVolumes')"
              mark-color="#4FD886"
              :value="metric?.highAvailableVolumeNum"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.noneHighAvailabilityVolumes')"
              mark-color="#4BB0ED"
              :value="metric?.nonHighAvailableVolumeNum"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.totalLocalVolumes')"
              :value="metric?.localVolumeNum"
            />
          </div>
        </dao-card-item>
      </dao-card>

      <dao-card
        class="flex-1 mx-[10px] overflow-hidden"
        type="headless"
      >
        <dao-card-item class="h-[275px] flex flex-col justify-between">
          <div class="h-[130px]">
            <gauge-chart
              :used="metric?.boundedDiskNum"
              :total="metric?.totalDiskNum"
              used-color="#4BB0ED"
              unused-color="#E4E7ED"
              :count="metric?.boundedDiskNum"
              :label="$t('views.dashboard.DashboardView.boundedDisk')"
            />
          </div>

          <div>
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.boundedDisk')"
              :value="metric?.boundedDiskNum"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.healthy')"
              mark-color="#4FD886"
              :value="metric?.healthyDiskNum"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.error')"
              mark-color="#FF6161"
              :value="metric?.unHealthyDiskNum"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.totalDisk')"
              :value="metric?.totalDiskNum"
            />
          </div>
        </dao-card-item>
      </dao-card>

      <dao-card
        class="flex-1 mx-[10px] overflow-hidden"
        type="headless"
      >
        <dao-card-item class="h-[275px] flex flex-col justify-between">
          <div class="h-[130px]">
            <gauge-chart
              :used="metric?.claimedNodeNum"
              :total="metric?.totalNodeNum"
              used-color="#4BB0ED"
              unused-color="#E4E7ED"
              :count="metric?.claimedNodeNum"
              :label="$t('views.dashboard.DashboardView.claimedNode')"
            />
          </div>

          <div>
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.claimedNodes')"
              mark-color="#4BB0ED"
              :value="metric?.claimedNodeNum"
            />
            <gauge-panel-item
              :label="$t('views.dashboard.DashboardView.totalNode')"
              :value="metric?.totalNodeNum"
            />
          </div>
        </dao-card-item>
      </dao-card>
    </div>

    <div class="flex mx-[-10px] mt-[16px]">
      <dao-card
        type="simple"
        :title="$t('views.dashboard.DashboardView.storagePoolResource')"
        class="flex-1 mx-[10px] overflow-hidden"
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
        class="flex-1 mx-[10px] overflow-hidden"
      >
        <template #action>
          <dao-select
            v-model="nodeType"
            size="sm"
            @change="queryNodeResource"
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

        <dao-card-item class="px-[10px] h-[229px] !overflow-visible">
          <percent-panel-item
            v-for="node in nodeResource?.slice(0,5)"
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
        class="flex-1 mx-[10px] overflow-hidden"
      >
        <dao-card-item class="px-[10px] h-[255px] !overflow-auto">
          <component-panel-item
            v-for="comp in componentStatus"
            :key="comp.name"
            :name="comp.name"
            :status="comp.state"
          />
        </dao-card-item>
      </dao-card>
    </div>

    <div class="dao-card dao-card--simple mt-[16px]">
      <div class="dao-card-header">
        <div class="dao-card-header-item dao-card-header-title">
          {{ $t('views.dashboard.DashboardView.operationRecords') }}
        </div>
      </div>
    </div>

    <dao-table
      id="dashboard-operation-records"
      :data="state.items"
      :columns="columns"
      :page-size="pagination.pageSize"
      :current-page="pagination.page"
      :total="pagination.total"
      @page-change="handleChangePage"
      @size-change="handleChangePageSize"
      @refresh="handleRefresh"
    >
      <template #search>
        <dao-input
          v-model="filterData.name"
          type="search"
          block
          borderless
          @keyup.enter="handleSearch"
          @after-reset="handleSearch"
        />
      </template>

      <template #td-startTime="{value}">
        {{ useDateFormat(value) }}
      </template>

      <template #td-endTime="{value}">
        {{ useDateFormat(value) }}
      </template>
    </dao-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQueryTable, useDateFormat } from '@dao-style/extend';
import {
  Metric,
  type GetBaseMetricResult,
  type ComponentStatusItem,
  type QueryOptionsRequest,
} from '@/services/MetricService';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { computed } from '@vue/reactivity';
import GaugeChart from './components/GaugeChart.vue';
import GaugePanelItem from './components/GaugePanelItem.vue';
import PercentPanelItem from './components/PercentPanelItem.vue';
import ComponentPanelItem from './components/ComponentPanelItem.vue';

type ResourceItem = {
  name: string;
  percent: number;
}

const { t } = useI18n();

const metric = ref<GetBaseMetricResult>();
const computedStorageUsageRate = computed(() => {
  if (!metric.value?.allocatedCapacityBytes || !metric.value?.totalCapacityBytes) {
    return 0;
  }

  return ((metric.value.allocatedCapacityBytes * 100) / (metric.value.totalCapacityBytes - metric.value.reservedCapacityBytes ?? 0)).toFixed(0);
});
const queryMetrics = async () => {
  const res = await Metric.GetBaseMetric({});

  metric.value = res;
};

const poolResource = ref<ResourceItem[]>();
const queryPoolResource = async () => {
  const res = await Metric.QueryPoolUsage({});

  poolResource.value = res.storagePoolsUse?.map((item) => ({
    name: item.name,
    percent: (item.allocatedCapacityBytes ?? 0) / (item.totalCapacityBytes ?? 1),
  })).sort((a, b) => b.percent - a.percent);
};

const nodeResource = ref<ResourceItem[]>();
const nodeType = ref<'SSD' | 'HDD'>('SSD');
const queryNodeResource = async () => {
  const res = await Metric.QueryTop5NodeUsage({
    storagePoolClass: nodeType.value,
  });

  nodeResource.value = res.nodeStoragesUse?.map((item) => ({
    name: item.name,
    percent: (item.allocatedCapacityBytes ?? 0) / (item.totalCapacityBytes ?? 1),
  })).sort((a, b) => b.percent - a.percent);
};

const componentStatus = ref<ComponentStatusItem[]>([]);
const queryComponentStatus = async () => {
  const res = await Metric.GetComponentStatus({});

  componentStatus.value = res.modulesStatus ?? [];
};

const columns = reactive([
  {
    id: 'eventName',
    header: t('views.dashboard.DashboardView.eventName'),
  },
  {
    id: 'eventType',
    header: t('views.dashboard.DashboardView.eventType'),
  },
  {
    id: 'status',
    header: t('views.dashboard.DashboardView.status'),
  },
  {
    id: 'description',
    header: t('views.dashboard.DashboardView.description'),
  },
  {
    id: 'startTime',
    header: t('views.dashboard.DashboardView.startTime'),
  },
  {
    id: 'endTime',
    header: t('views.dashboard.DashboardView.endTime'),
  },
]);

const queryOptions = (req: QueryOptionsRequest) => Metric.QueryOptions({
  ...req,
});

const [{
  state,
  pagination,
  handleChangePage,
  handleChangePageSize,
  handleRefresh,
}, {
  filterData,
  handleSearch,
}] = useQueryTable(queryOptions, {
  page: 1,
  pageSize: 10,
  name: '',
});

queryMetrics();
queryPoolResource();
queryNodeResource();
queryComponentStatus();
</script>

<style lang="scss">
.dao-text-button.dao-text-button--link:not(.is-disabled):hover::after {
  display: none;
}

.dao-card.dao-card--simple .dao-card-header {
  height: 22px;
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

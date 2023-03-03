<template>
  <div class="px-[30px] pb-[20px]">
    <dao-header type="3rd">
      <template #breadcrumb>
        <dao-breadcrumb
          :list="[
            {
              label: $t('App.nav.pool'),
              to: { name: 'PoolList' },
            },
            {
              value: poolName,
            },
          ]"
          @navigate="$router.push"
        />
      </template>
    </dao-header>

    <dao-card
      type="simple"
      :title="$t('views.pools.PoolDetail.basicInfo')"
    >
      <dao-card-item>
        <dao-key-value-layout
          :column="3"
          direction="vertical"
        >
          <dao-key-value-layout-item
            :label="$t('views.pools.PoolDetail.diskType')"
            :value="poolDetail?.items?.[0].class"
          />
          <dao-key-value-layout-item
            :label="$t('views.pools.PoolDetail.storageUsage')"
            :value="getPercent(poolDetail?.allocatedCapacityBytes, poolDetail?.totalCapacityBytes)"
          />
          <dao-key-value-layout-item
            :label="$t('views.pools.PoolDetail.totalCapacity')"
            :value="bytesToUnitDisplay(poolDetail?.totalCapacityBytes)"
          />
          <dao-key-value-layout-item
            :label="$t('views.pools.PoolDetail.nodeCount')"
            :value="poolDetail?.nodeNames?.length ?? 0"
          />
          <dao-key-value-layout-item
            :label="$t('views.pools.PoolDetail.createTime')"
            :value="useDateFormat(poolDetail?.createTime)"
          />
        </dao-key-value-layout>
      </dao-card-item>
    </dao-card>

    <div class="dao-card dao-card--simple mt-[20px]">
      <div class="dao-card-header">
        <div class="dao-card-header-item dao-card-header-title">
          {{ $t('views.pools.PoolDetail.nodes') }}
        </div>
      </div>
    </div>

    <pool-nodes :name="poolName" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { DaoKeyValueLayout, DaoKeyValueLayoutItem, useDateFormat } from '@dao-style/extend';
import { bytesToUnitDisplay } from '@/utils/bytesToUnit';
import { Pool } from '@/services/Pool';
import type { ApiStoragePool } from '@/services/data-contracts';
import PoolNodes from './components/PoolNodes.vue';

const PoolApi = new Pool();

const route = useRoute();
const poolName = ref<string>(route.params.name as string);
const poolDetail = ref<ApiStoragePool>();

const getPoolDetail = async () => {
  const { data } = await PoolApi.poolsDetail(poolName.value);

  poolDetail.value = data;
};

const getPercent = (used?: number, total?: number) => {
  if (!used || !total) {
    return '-';
  }

  return `${((used * 100) / total).toFixed(0)}%`;
};

getPoolDetail();
</script>

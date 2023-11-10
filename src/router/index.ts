import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DashboardView from '@/views/dashboard/DashboardView.vue';
import NodeList from '@/views/nodes/NodeList.vue';
import SettingsView from '@/views/settings/SettingsView.vue';
import RouterContent from '@/views/RouterContent.vue';
import NodeDetailIndex from '@/views/nodes/NodeDetailIndex.vue';
import NodeDetailLocalDisks from '@/views/nodes/NodeDetailLocalDisks.vue';
import NodeDetailMigrates from '@/views/nodes/NodeDetailMigrates.vue';
import PoolList from '@/views/pools/PoolList.vue';
import PoolDetail from '@/views/pools/PoolDetail.vue';
import LocalVolumeList from '@/views/local-volumes/LocalVolumeList.vue';
import LocalVolumeDetail from '@/views/local-volumes/LocalVolumeDetail.vue';
import LocalVolumeReplicas from '@/views/local-volumes/components/LocalVolumeReplicas.vue';
import LocalVolumeOperations from '@/views/local-volumes/components/LocalVolumeOperations.vue';
import LocalVolumeSnapshots from '@/views/local-volumes/components/LocalVolumeSnapshots.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/nodes',
    name: 'Node',
    component: RouterContent,
    redirect: { name: 'NodeList' },
    children: [
      {
        path: '',
        name: 'NodeList',
        component: NodeList,
      },
      {
        path: ':name',
        name: 'NodeDetailIndex',
        component: NodeDetailIndex,
        redirect: { name: 'NodeDetailLocalDisks' },
        children: [
          {
            path: 'disks',
            name: 'NodeDetailLocalDisks',
            component: NodeDetailLocalDisks,
          },
          {
            path: 'migrates',
            name: 'NodeDetailMigrates',
            component: NodeDetailMigrates,
          },
        ],
      },
    ],
  },
  {
    path: '/pools',
    name: 'Pool',
    component: RouterContent,
    redirect: { name: 'PoolList' },
    children: [
      {
        path: '',
        name: 'PoolList',
        component: PoolList,
      },
      {
        path: ':name',
        name: 'PoolDetail',
        component: PoolDetail,
      },
    ],
  },
  {
    path: '/local-volumes',
    name: 'LocaleVolume',
    component: RouterContent,
    redirect: { name: 'LocalVolumeList' },
    children: [
      {
        path: '',
        name: 'LocalVolumeList',
        component: LocalVolumeList,
      },
      {
        path: ':name',
        name: 'LocalVolumeDetail',
        component: LocalVolumeDetail,
        redirect: {
          name: 'LocalVolumeReplicas',
        },
        children: [
          {
            path: 'replicas',
            name: 'LocalVolumeReplicas',
            component: LocalVolumeReplicas,
          },
          {
            path: 'snapshots',
            name: 'LocalVolumeSnapshots',
            component: LocalVolumeSnapshots,
          },
          {
            path: 'operations',
            name: 'LocalVolumeOperations',
            component: LocalVolumeOperations,
          },
        ],
      },
    ],
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Dashboard' },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;

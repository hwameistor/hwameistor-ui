import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardView from '@/views/dashboard/DashboardView.vue';
import NodeIndex from '@/views/nodes/NodeIndex.vue';
import PoolIndex from '@/views/pools/PoolIndex.vue';
import LocalVolumeIndex from '@/views/local-volumes/LocalVolumeIndex.vue';
import SettingsView from '@/views/settings/SettingsView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/nodes',
    name: 'Node',
    component: NodeIndex,
  },
  {
    path: '/pools',
    name: 'Pool',
    component: PoolIndex,
  },
  {
    path: '/local-volumes',
    name: 'LocaleVolume',
    component: LocalVolumeIndex,
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

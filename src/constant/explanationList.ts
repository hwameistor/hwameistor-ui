import { i18n } from '@/plugins/vue-i18n';
import { computed } from 'vue';

/**
 * 名词解释组件，
 * key 需要唯一
 */
export interface ExplanationItem {
  key: string;
  title: string;
  content: string;
}

export const explanationsList = computed<Record<string, ExplanationItem[]>>(() => ({
  node: [
    {
      key: 'node',
      title: i18n.t('constant.explanationList.node.title'),
      content: i18n.t('constant.explanationList.node.content'),
    },
  ],
  pool: [
    {
      key: 'pool',
      title: i18n.t('constant.explanationList.pool.title'),
      content: i18n.t('constant.explanationList.pool.content'),
    },
  ],
  localVolume: [
    {
      key: 'localVolume',
      title: i18n.t('constant.explanationList.localVolume.title'),
      content: i18n.t('constant.explanationList.localVolume.content'),
    },
  ],
}));

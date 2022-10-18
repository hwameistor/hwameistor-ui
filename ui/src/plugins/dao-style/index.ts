import type { App } from 'vue';

import daoStyle from '@dao-style/core';
import '@dao-style/core/dist/style.css';

import { installer } from '@dao-style/extend';

const components = {
};

const installDaoStyle = (Vue: App): void => {
  Vue.use(daoStyle);

  Vue.use(installer(components));
};

export default installDaoStyle;

import type { App } from 'vue';

import daoStyle from '@dao-style/core';
import '@dao-style/core/dist/style.css';

import {
  createNoty,
  setNotyDefault,
  installer,
} from '@dao-style/extend';
import '@dao-style/extend/dist/styles/noty-layout.css';
import '@dao-style/extend/dist/styles/loading-layout.css';
import '@dao-style/extend/dist/styles/spinner-dot.css';
import '@dao-style/extend/dist/styles/spinner-circle.css';

export const noty = createNoty();

setNotyDefault({
  showClose: true,
  // duration: 5000,
});

const components = {
};

const installDaoStyle = (Vue: App): void => {
  noty.install(Vue);
  Vue.use(daoStyle);

  Vue.use(installer(components));
};

export default installDaoStyle;

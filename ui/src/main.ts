import type { App } from 'vue';
import { createApp } from 'vue';
import router from '@/router';
import pluginInstall, { loadLanguageAsync } from './plugins';
import AppElement from './App.vue';

interface RenderProps {
  container?: HTMLElement;
}

let app: App<Element> | undefined;

async function render(props: RenderProps = {}) {
  const { container } = props;

  app = createApp(AppElement);
  app.use(pluginInstall);
  app.use(router);
  await loadLanguageAsync('en-US');
  app.mount(container ? container.querySelector('#app') ?? '#app' : '#app');

  return app;
}

render();

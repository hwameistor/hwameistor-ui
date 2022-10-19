import { createApp, type App } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import router from '@/router';
import pluginInstall, { loadLanguageAsync } from './plugins';
import AppElement from './App.vue';
import 'normalize.css/normalize.css';

interface RenderProps {
  container?: HTMLElement;
}

let app: App<Element> | undefined;

async function render(props: RenderProps = {}) {
  const { container } = props;

  app = createApp(AppElement);
  app.use(pluginInstall);
  app.use(router);

  const store = useLocalStorage('hwameistor-locale', 'en-US');

  await loadLanguageAsync(store.value);
  app.mount(container ? container.querySelector('#app') ?? '#app' : '#app');

  return app;
}

render();

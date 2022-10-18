import pluginInstall from "./plugins";
import type { App } from "vue";
import { createApp } from "vue";
import AppElement from "./App.vue";

interface RenderProps {
  container?: HTMLElement;
}

let app: App<Element> | undefined;

async function render(props: RenderProps = {}) {
  const { container } = props;
  app = createApp(AppElement);
  app.use(pluginInstall);
  app.mount(container ? container.querySelector("#app") ?? "#app" : "#app");
  return app;
}

render();

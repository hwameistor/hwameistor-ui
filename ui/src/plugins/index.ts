import daoStyleInstall from "./dao-style";
import type { App } from "vue";

export default function install<T>(app: App<T>) {
  app.use(daoStyleInstall);
}

export {};

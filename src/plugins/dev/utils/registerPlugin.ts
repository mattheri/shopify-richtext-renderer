import registeredPlugins from "../plugins";
import { Plugin, PluginHook } from "../types";

export default function registerPlugin(plugins: Plugin[] | Plugin = []) {
  const p = Array.isArray(plugins) ? plugins : [plugins];
  p.forEach((plugin) => {
    const hook = plugin.hooks as PluginHook;
    registeredPlugins[hook].add(plugin.fn.bind(plugin));
  });
}

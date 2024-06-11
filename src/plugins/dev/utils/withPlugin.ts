import registeredPlugins from "../plugins";
import stores from "../stores";
import { PluginHook } from "../types";

export default function withPlugin<T extends (...args: any) => any>(
  fn: T,
  type: PluginHook
): T {
  if (typeof fn !== "function") throw new Error("fn must be a function");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return (...args: Parameters<T>): ReturnType<T> => {
    const plugins = [...registeredPlugins[type]];
    const result = fn(...args);
    console.log("plugins", plugins, "type", type);
    return plugins.reduce((acc, plugin) => {
      let specificArgs = {};

      switch (type) {
        case "before_node_creation":
          specificArgs = {
            futureReactNode: result,
          };
          break;
        case "after_node_creation":
          specificArgs = {
            reactNode: result,
          };
          break;
      }
      return typeof plugin === "function"
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          plugin.apply(plugin, [{ ...stores, ...specificArgs }])
        : acc;
    }, result);
  };
}

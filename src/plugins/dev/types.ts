// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
import { createElement } from "react";

import type {
  AugmentedRichTextNode,
  Config,
  FutureReactNode,
  RichTextNode,
} from "../../types";

export type EmptyObject = Record<string, never>;

export type PluginHook =
  | "before_data_process"
  | "before_node_creation"
  | "after_node_creation";

export type BeforeDataProcessArgs = {
  data: RichTextNode;
  globalConfig: Config;
  props?: any;
};

export type RegisteredPlugins = {
  before_data_process: Set<Plugin<"before_data_process">["fn"]>;
  before_node_creation: Set<Plugin<"before_node_creation">["fn"]>;
  after_node_creation: Set<Plugin<"after_node_creation">["fn"]>;
};

export type BeforeNodeCreationArgs = {
  data: RichTextNode;
  globalConfig: Config;
  futureReactNode: FutureReactNode;
  props?: any;
};

export type AfterNodeCreationArgs = {
  data: RichTextNode;
  globalConfig: Config;
  reactNode: ReturnType<typeof createElement>;
  props?: any;
};

export type BeforeDataProcessPlugin = (
  args?: BeforeDataProcessArgs
) => AugmentedRichTextNode | undefined;
export type BeforeNodeCreationPlugin = (
  args?: BeforeNodeCreationArgs
) => FutureReactNode | undefined;
export type AfterNodeCreationPlugin = (
  args?: AfterNodeCreationArgs
) => ReturnType<typeof createElement> | undefined;

export type PluginDataStores = {
  data: RichTextNode;
  props: any;
  globalConfig: Config;
};

export type PluginFnMap = {
  before_data_process: BeforeDataProcessPlugin;
  before_node_creation: BeforeNodeCreationPlugin;
  after_node_creation: AfterNodeCreationPlugin;
};

export type PluginFn<T extends PluginHook> = PluginFnMap[T];

export type Plugin<T extends PluginHook = any> = {
  name: string;
  hooks: T;
  fn: PluginFn<T>;
  [key: string]: any;
};

export type PluginFunction<T extends (...args: any) => Plugin> = T;

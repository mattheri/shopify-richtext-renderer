import type { ElementType, FunctionComponent } from "react";

import type { Plugin } from "../plugins";
import type { Attributes } from "../types";

const richtextrendererConfig = {
  h1: {},
  h2: {},
  h3: {},
  h4: {},
  h5: {},
  h6: {},
  list: {},
  listItem: {},
  a: {},
  p: {},
  text: {},
  strong: {},
  em: {},
  globalPlugins: [],
};

export type RichtextrendererConfigMap = {
  [P in keyof typeof richtextrendererConfig]?: {
    as?: ElementType | FunctionComponent;
    attributes?: Attributes & Record<string, unknown>;
  };
};

export type RichtextrendererConfig = RichtextrendererConfigMap & {
  globalPlugins?: Plugin[] | Plugin;
};

export type RichtextRendererConfigKeys = keyof Omit<
  RichtextrendererConfigMap,
  "globalPlugins"
>;

export default richtextrendererConfig as RichtextrendererConfig;

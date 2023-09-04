import type { Attributes } from "../types";
import type { ElementType, FunctionComponent } from "react";

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
  paragraph: {},
  text: {},
};

export type RichtextrendererConfig = {
  [P in keyof typeof richtextrendererConfig]?: {
    as?: ElementType | FunctionComponent;
    attributes?: Attributes & Record<string, unknown>;
  };
};

export default richtextrendererConfig as RichtextrendererConfig;

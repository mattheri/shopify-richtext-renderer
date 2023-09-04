import type {
  FunctionComponent,
  HTMLAttributes,
  ElementType,
  ComponentPropsWithoutRef,
  CSSProperties,
} from "react";
import type { RichtextrendererConfig } from "./utils/richtextRendererConfig";

export type RichTextNode = {
  type:
    | "root"
    | "paragraph"
    | "list"
    | "list-item"
    | "heading"
    | "text"
    | "link";
  level?: number;
  children?: RichTextNode[];
  value?: string;
  bold?: boolean;
  italic?: boolean;
  url?: string;
  target?: string;
  title?: string;
  listType?: "ordered" | "unordered";
};

export type FutureReactNode = {
  type: string | FunctionComponent<any>;
  attributes: {
    key?: string;
    href?: string;
    target?: string;
    title?: string;
    style?: CSSProperties;
  };
  children?: string | FutureReactNode[];
};

export type Props<T extends ElementType> = ComponentPropsWithoutRef<T>;

export type ReactElementAttributes<Component extends ElementType> = {
  as?: Component;
} & Props<Component>;

export type ElementProps<
  H1 extends ElementType,
  H2 extends ElementType,
  H3 extends ElementType,
  H4 extends ElementType,
  H5 extends ElementType,
  H6 extends ElementType,
  Paragraph extends ElementType,
  List extends ElementType,
  ListItem extends ElementType,
  A extends ElementType,
  Text extends ElementType
> = {
  h1?: ReactElementAttributes<H1>;
  h2?: ReactElementAttributes<H2>;
  h3?: ReactElementAttributes<H3>;
  h4?: ReactElementAttributes<H4>;
  h5?: ReactElementAttributes<H5>;
  h6?: ReactElementAttributes<H6>;
  paragraph?: ReactElementAttributes<Paragraph>;
  list?: ReactElementAttributes<List>;
  listItem?: ReactElementAttributes<ListItem>;
  a?: ReactElementAttributes<A>;
  text?: ReactElementAttributes<Text>;
};

export type NormalizedElementProps = {
  [P in keyof ElementProps<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >]?: Omit<ReactElementAttributes<any>, "customElement">;
};

export type ElementPropsGeneric = ElementProps<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;

export type Attributes = HTMLAttributes<HTMLElement>;

export type Config = RichtextrendererConfig;

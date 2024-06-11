import type { ElementType } from "react";

import { Plugin } from "../plugins";
import stores from "../plugins/dev/stores";
import registerPlugin from "../plugins/dev/utils/registerPlugin";
import type { ElementProps, RichTextNode } from "../types";
import baseNode from "../utils/baseNode";
import createElement from "../utils/createElement";
import createNode from "../utils/node";
import richtextrendererConfig from "../utils/richtextRendererConfig";
import validateEmptyTree from "../utils/validateEmptyTree";

type Options<
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
  Text extends ElementType,
  Strong extends ElementType,
  Em extends ElementType
> = ElementProps<
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
  List,
  ListItem,
  A,
  Text,
  Strong,
  Em
> & {
  plugins?: Plugin[] | Plugin;
};

export default function useRichtextRenderer<
  H1 extends ElementType = "h1",
  H2 extends ElementType = "h2",
  H3 extends ElementType = "h3",
  H4 extends ElementType = "h4",
  H5 extends ElementType = "h5",
  H6 extends ElementType = "h6",
  Paragraph extends ElementType = "p",
  List extends ElementType = "ul",
  ListItem extends ElementType = "li",
  A extends ElementType = "a",
  Text extends ElementType = "span",
  Strong extends ElementType = "strong",
  Em extends ElementType = "em"
>(
  data: string | RichTextNode,
  options: Options<
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    Paragraph,
    List,
    ListItem,
    A,
    Text,
    Strong,
    Em
  > = {}
) {
  if (data) {
    let node: RichTextNode | null = null;
    try {
      node = typeof data === "string" ? JSON.parse(data) : data;
    } catch {
      node = typeof data === "string" ? baseNode(data) : baseNode();
    }

    node = validateEmptyTree(node);

    if (!node) return null;
    const { plugins, ...rest } = options;
    Object.assign(stores, {
      data: node,
      props: rest,
      globalConfig: richtextrendererConfig,
    });

    if (plugins) {
      registerPlugin(plugins);
    }

    return createElement(createNode(node, rest));
  }
  return null;
}

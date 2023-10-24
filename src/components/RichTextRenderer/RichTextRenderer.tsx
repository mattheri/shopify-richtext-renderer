import type { ElementProps, RichTextNode } from "../../types";
import type { ElementType, HTMLAttributes } from "react";

import React from "react";
import createElement from "../../utils/createElement";
import createNode from "../../utils/node";
import validateEmptyTree from "../../utils/validateEmptyTree";
import baseNode from "../../utils/baseNode";

type Props<
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
> = HTMLAttributes<HTMLElement> &
  ElementProps<H1, H2, H3, H4, H5, H6, Paragraph, List, ListItem, A, Text> & {
    data: string | RichTextNode;
    enableMarkdownSyntax?: boolean;
  };

export default function RichTextRenderer<
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
  Text extends ElementType = "span"
>({
  data,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  list,
  listItem,
  a,
  paragraph,
  text,
  ...props
}: Props<H1, H2, H3, H4, H5, H6, Paragraph, List, ListItem, A, Text>) {
  if (data) {
    let node: RichTextNode | null = null;
    try {
      node = typeof data === "string" ? JSON.parse(data) : data;
    } catch {
      node = typeof data === "string" ? baseNode(data) : baseNode();
    }

    const elementProps = {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      list,
      listItem,
      a,
      paragraph,
      text,
    };

    node = validateEmptyTree(node);

    if (!node) return null;

    return (
      <div {...props}>{createElement(createNode(node, elementProps))}</div>
    );
  }
  return null;
}

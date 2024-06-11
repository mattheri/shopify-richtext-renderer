import type { ElementType } from "react";
import React from "react";

import { useRichtextRenderer } from "../../hooks";
import { Plugin } from "../../plugins";
import type { ElementProps, RichTextNode } from "../../types";

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
  data: string | RichTextNode;
  plugins?: Plugin[] | Plugin;
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
  Text extends ElementType = "span",
  Strong extends ElementType = "strong",
  Em extends ElementType = "em"
>({
  data,
  ...props
}: Props<
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
>) {
  const Element = useRichtextRenderer(data, props);

  return Element;
}

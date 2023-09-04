import type {
  RichTextNode,
  NormalizedElementProps,
  ElementPropsGeneric,
} from "../types";
import type { FunctionComponent } from "react";

import richtextrendererConfig from "./richtextRendererConfig";

const nodeTypeMap = {
  heading: ["p", "p", "p", "p", "p", "p"],
  list: {
    ordered: "ol",
    unordered: "ul",
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "list-item": "li",
  link: "a",
  paragraph: "p",
  text: "span",
  break: "br",
};

export default function provideNodeProperties(
  node: RichTextNode,
  elementProps?: ElementPropsGeneric
) {
  const nodeLevel = node.level ?? 1;
  let defaultNode: string;

  if (node.type === "heading") {
    defaultNode = nodeTypeMap.heading[nodeLevel - 1];
  } else if (node.type === "list") {
    defaultNode = nodeTypeMap.list[node.listType ?? "unordered"];
  } else if (node.type === "root") {
    defaultNode = "div";
  } else {
    defaultNode = nodeTypeMap[node.type];
  }

  const key = (
    node.level ? `h${node.level}` : node.type
  ) as keyof typeof richtextrendererConfig;
  const elementPropsAttributesOnly = Object.entries(elementProps ?? {}).reduce(
    (acc, [_key, value]) => {
      if (!value) return acc;

      const tValue = Object.assign({}, value);
      const key = _key as keyof ElementPropsGeneric;
      delete tValue.as;
      acc[key] = tValue;

      return acc;
    },
    {} as NormalizedElementProps
  );

  let type: string | FunctionComponent;

  if (!node.value && node.type === "text") {
    type = nodeTypeMap.break;
  } else {
    type =
      elementProps?.[key]?.as ?? richtextrendererConfig[key]?.as ?? defaultNode;
  }

  return {
    type,
    nodeAttributes:
      type === nodeTypeMap.break
        ? null
        : {
            ...(richtextrendererConfig[key]?.attributes ?? {}),
            ...(elementPropsAttributesOnly?.[key] ?? {}),
          },
  };
}

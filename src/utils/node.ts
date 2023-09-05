import type {
  ElementPropsGeneric,
  FutureReactNode,
  RichTextNode,
} from "../types";
import provideNodeProperties from "./provideNodeProperties";

export default function createNode(
  node: RichTextNode,
  elementProps?: ElementPropsGeneric
): FutureReactNode {
  const { type, nodeAttributes } = provideNodeProperties(node, elementProps);

  const styles = [
    node.bold ? ["fontWeight", "bold"] : [],
    node.italic ? ["fontStyle", "italic"] : [],
  ];

  const url = nodeAttributes?.href ?? node.url;
  const target = nodeAttributes?.target ?? node.target;

  const attributes = {
    key: `${node.type}-${Math.random().toString(36)}`,
    ...(nodeAttributes ?? {}),
    ...(url ? { href: url } : {}),
    ...(target ? { target } : node.type === "link" ? { target: "_blank" } : {}),
    ...(node.title ? { title: node.title } : {}),
    ...(node.bold || node.italic
      ? {
          style: {
            ...Object.fromEntries(styles),
            ...(nodeAttributes?.style ?? {}),
          },
        }
      : {}),
  };

  return {
    type,
    attributes,
    children:
      node.value ||
      node.children?.map((child) => createNode(child, elementProps)),
  };
}

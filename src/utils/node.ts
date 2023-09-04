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

  const attributes = {
    key: `${node.type}-${Math.random().toString(36)}`,
    ...(nodeAttributes ?? {}),
    ...(node.url ? { href: node.url } : {}),
    ...(node.target ? { target: node.target } : {}),
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

import withPlugin from "../plugins/dev/utils/withPlugin";
import type {
  AugmentedRichTextNode,
  ElementPropsGeneric,
  FutureReactNode,
  RichTextNode,
} from "../types";
import augmentNode from "./augmentNode";
import provideNodeProperties from "./provideNodeProperties";

export default withPlugin(function createNode(
  node: RichTextNode | AugmentedRichTextNode,
  elementProps?: ElementPropsGeneric
): FutureReactNode {
  const augmentedNode = augmentNode(node);
  const { type, nodeAttributes } = provideNodeProperties(
    augmentedNode,
    elementProps
  );

  const url = nodeAttributes?.href ?? node.url;
  const target = nodeAttributes?.target ?? node.target;

  const attributes = {
    key: `${augmentedNode.type}-${Math.random().toString(36)}`,
    ...(nodeAttributes ?? {}),
    ...(url ? { href: url } : {}),
    ...(target ? { target } : node.type === "link" ? { target: "_blank" } : {}),
    ...(augmentedNode.title ? { title: node.title } : {}),
    ...(augmentedNode.bold || augmentedNode.italic
      ? {
          style: {
            ...(nodeAttributes?.style ?? {}),
          },
        }
      : {}),
  };

  const t = withPlugin(createNode, "before_node_creation");

  return {
    type,
    attributes,
    children:
      augmentedNode.value ||
      augmentedNode.children?.map((child) => t(child, elementProps)),
  };
},
"before_node_creation");

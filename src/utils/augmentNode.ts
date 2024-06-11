import withPlugin from "../plugins/dev/utils/withPlugin";
import { AugmentedRichTextNode, RichTextNode } from "../types";

export default withPlugin(function augmentNode(
  node: RichTextNode | AugmentedRichTextNode
): AugmentedRichTextNode {
  const children = node.children;
  const value = node.value;

  const emNode: AugmentedRichTextNode = {
    type: "em",
    children,
    value,
  };

  const strongNode: AugmentedRichTextNode = {
    type: "strong",
    children,
    value,
  };

  if (node.bold && node.italic) {
    strongNode.children = [emNode];
    strongNode.value = undefined;

    return {
      ...node,
      children: [strongNode],
      value: undefined,
    };
  } else if (node.italic) {
    return {
      ...node,
      children: [emNode],
      value: undefined,
    };
  } else if (node.bold) {
    return {
      ...node,
      children: [strongNode],
      value: undefined,
    };
  } else {
    return node;
  }
},
"before_data_process");

import type { AugmentedRichTextNode, RichTextNode } from "../types";
import { DEFAULT_NODE, NODETYPES_MAP } from "./constants";

export default function getNodeType(node: AugmentedRichTextNode) {
  switch (node.type) {
    case "list":
      return NODETYPES_MAP.list[node.listType ?? "unordered"];
    case "root":
      return DEFAULT_NODE;
    default:
      return NODETYPES_MAP[node.type];
  }
}

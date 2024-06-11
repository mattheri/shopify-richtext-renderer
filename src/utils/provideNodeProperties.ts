import type { AugmentedRichTextNode, ElementPropsGeneric } from "../types";
import { KEY_MAP, NODETYPES_MAP } from "./constants";
import getNodeType from "./getNodeType";
import getNormalizedElementProps from "./getNormalizedElementProps";
import type { RichtextRendererConfigKeys } from "./richtextRendererConfig";
import richtextrendererConfig from "./richtextRendererConfig";

export default function provideNodeProperties(
  node: AugmentedRichTextNode,
  elementProps?: ElementPropsGeneric
) {
  const nodeLevel = node.level ?? 1;
  const defaultNode = getNodeType(node);

  const key = (
    node.level || node.type === "heading" ? `h${nodeLevel}` : KEY_MAP[node.type]
  ) as RichtextRendererConfigKeys;
  const elementPropsAttributesOnly = getNormalizedElementProps(elementProps);

  const type =
    !node.value && node.type === "text"
      ? NODETYPES_MAP.break
      : elementProps?.[key]?.as ??
        richtextrendererConfig[key]?.as ??
        defaultNode;

  return {
    type,
    nodeAttributes:
      type === NODETYPES_MAP.break
        ? null
        : {
            ...(richtextrendererConfig[key]?.attributes ?? {}),
            ...(elementPropsAttributesOnly?.[key] ?? {}),
          },
  };
}

import { RichTextNode } from "../types";

export default function validateEmptyTree(node: RichTextNode | null) {
  if (!node) return null;

  const { children, type } = node;
  if (type === "root" && children?.length === 1) {
    const child = children[0];
    const childChildren = child.children?.[0];
    const hasNoValueProperty = childChildren?.value === undefined;
    const valueIsEmtpy = childChildren?.value === "";

    if (!childChildren || hasNoValueProperty || valueIsEmtpy) return null;
  }

  return node;
}

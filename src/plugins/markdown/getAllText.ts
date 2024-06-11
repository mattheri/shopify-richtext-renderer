import type { RichTextNode } from "../../types";

export default function getAllText(
  data: RichTextNode,
  delimiter?: string
): string[] {
  return Object.entries(data).reduce<string[]>((acc, [key, value]) => {
    if (key === "value" && value && typeof value === "string") acc.push(value);
    if (key === "value" && !value) return acc;
    if (key === "children" && Array.isArray(value)) {
      return acc.concat(value.flatMap((child) => getAllText(child, delimiter)));
    }

    return acc;
  }, []);
}

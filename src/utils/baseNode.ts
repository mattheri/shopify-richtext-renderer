import type { RichTextNode } from "../types";

export default function baseNode(text?: string): RichTextNode {
  return {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            value: text || "",
          },
        ],
      },
    ],
  };
}

export const NON_VALID_ATTRIBUTES = {
  TYPE: "type",
  LEVEL: "level",
};

export const NODETYPES_MAP = {
  heading: "span",
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
  strong: "strong",
  em: "em",
} as const;

export const DEFAULT_NODE = "div";

export const KEY_MAP = {
  heading: "heading",
  list: "list",
  link: "a",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "list-item": "listItem",
  paragraph: "p",
  text: "text",
  root: "root",
  strong: "strong",
  em: "em",
} as const;

import { createElement as _createElement } from "react";

import withPlugin from "../plugins/dev/utils/withPlugin";
import type { FutureReactNode } from "../types";
import cleanAttributes from "./cleanAttributes";

export default withPlugin(function createElement(
  node: FutureReactNode
): ReturnType<typeof _createElement> {
  const children =
    typeof node?.children === "string"
      ? node.children
      : node.children?.map((child) => createElement(child));
  const attr = cleanAttributes(node.attributes);

  return _createElement(node.type, attr, children);
},
"after_node_creation");

import { TokensList, marked } from "marked";
import { Fragment } from "react";

import { FutureReactNode } from "../../types";
import { Plugin, PluginFunction } from "../dev/types";
import getAllText from "./getAllText";

function markdown(): Plugin<"before_node_creation"> {
  return {
    fn(args) {
      if (!args?.data) return args?.futureReactNode;

      const { data } = args;
      const text = getAllText(data);

      return this.markdownFutureReactNode(text);
    },
    hooks: "before_node_creation",
    name: "markdown",
    markdownFutureReactNode: (
      text: string[],
      futureReactNode: Partial<FutureReactNode> = {}
    ) => ({
      ...futureReactNode,
      type: "div",
      attributes: {
        style: { display: "contents" },
        dangerouslySetInnerHTML: {
          __html: text.map((t) => marked(t, { async: false })).join(""),
        },
      },
    }),
  };
}

export default markdown as PluginFunction<typeof markdown>;

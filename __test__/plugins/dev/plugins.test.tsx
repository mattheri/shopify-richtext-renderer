import React from "react";

import { render } from "@testing-library/react";

import { RichTextRenderer, setRichtextRendererConfig } from "../../../src";
import { Plugin } from "../../../src/plugins";
import markdown from "../../../src/plugins/markdown";

const richTextData =
  '{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","value":"# Hello World"}]}]}';

const plugin: Plugin<"before_node_creation"> = {
  hooks: "before_node_creation",
  name: "markdown",
  fn: (data) => {
    return data?.futureReactNode;
  },
};

const otherPlugin: Plugin<"before_node_creation"> = {
  hooks: "before_node_creation",
  name: "markdown",
  fn: (data) => {
    return data?.futureReactNode;
  },
};

describe("plugins", () => {
  test("should register local plugin for one component", () => {
    const { container } = render(
      <>
        <RichTextRenderer data={richTextData} plugins={plugin} />
        <RichTextRenderer data={richTextData} plugins={otherPlugin} />
      </>
    );

    expect(plugin).toBeCalledTimes(1);
  });
});

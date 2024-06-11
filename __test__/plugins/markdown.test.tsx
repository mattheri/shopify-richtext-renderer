import React from "react";

import { render } from "@testing-library/react";

import { RichTextRenderer } from "../../src";
import { markdown } from "../../src/plugins";

const richTextData =
  '{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","value":"# Hello World"}]}]}';
const multipleNodesData =
  '{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","value":"# Hello World"}]},{"type":"paragraph","children":[{"type":"text","value":"## Subtitle"}]}]}';

describe("Markdown plugin", () => {
  test("should render simple html", () => {
    const html = '<div style="display: contents;"><h1>Hello World</h1>\n</div>';
    const { container } = render(
      <RichTextRenderer data={richTextData} plugins={markdown()} />
    );

    expect(container.innerHTML).toBe(html);
  });

  test("should render simple html with string data", () => {
    const html = '<div style="display: contents;"><h1>Hello World</h1>\n</div>';
    const { container } = render(
      <RichTextRenderer data="# Hello World" plugins={markdown()} />
    );

    expect(container.innerHTML).toBe(html);
  });

  test("should render more complex html on multiple nodes", () => {
    const html =
      '<div style="display: contents;"><h1>Hello World</h1>\n<h2>Subtitle</h2>\n</div>';
    const { container } = render(
      <RichTextRenderer data={multipleNodesData} plugins={markdown()} />
    );

    expect(container.innerHTML).toBe(html);
  });
});

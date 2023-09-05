import type { Config } from "../src";

import React from "react";
import { render } from "@testing-library/react";

import { RichTextRenderer, setRichtextRendererConfig } from "../src";

const richTextData =
  '{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","value":"Award-winning mineral sunscreens formulated with non-nano zinc oxide, the safest sunscreen according to the EWG."}]}]}';
const stringData =
  "Award-winning mineral sunscreens formulated with non-nano zinc oxide, the safest sunscreen according to the EWG.";
const noData = "";

describe("RichTextRenderer", () => {
  test("renders", () => {
    const { container } = render(<RichTextRenderer data={richTextData} />);

    expect(container).toBeDefined();
  });

  test("renders with string data", () => {
    const { container } = render(<RichTextRenderer data={stringData} />);

    expect(container).toBeDefined();
  });

  test("Does not render without data", () => {
    const { container } = render(<RichTextRenderer data={noData} />);
    expect(container.innerHTML).toBe("");
  });

  test("renders correct HTML with rich text data", () => {
    const html =
      "<div><div><p><span>Award-winning mineral sunscreens formulated with non-nano zinc oxide, the safest sunscreen according to the EWG.</span></p></div></div>";
    const { container } = render(<RichTextRenderer data={richTextData} />);

    expect(container.innerHTML).toBe(html);
  });

  test("renders correct HTML with string data", () => {
    const html = "<div><div><p><span>Hello World</span></p></div></div>";
    const { container } = render(<RichTextRenderer data="Hello World" />);

    expect(container.innerHTML).toBe(html);
  });

  test("renders correct attributes with global configuration", () => {
    const config: Config = {
      paragraph: {
        attributes: {
          className: "paragraph",
        },
      },
    };

    setRichtextRendererConfig(config);
    const html =
      '<div><div><p class="paragraph"><span>Award-winning mineral sunscreens formulated with non-nano zinc oxide, the safest sunscreen according to the EWG.</span></p></div></div>';
    const { container } = render(<RichTextRenderer data={richTextData} />);

    expect(container.innerHTML).toBe(html);
  });

  test("renders correct attributes with props local configuration", () => {
    const html =
      '<div><div><p class="paragraph"><span>Award-winning mineral sunscreens formulated with non-nano zinc oxide, the safest sunscreen according to the EWG.</span></p></div></div>';
    const { container } = render(
      <RichTextRenderer
        data={richTextData}
        paragraph={{ className: "paragraph" }}
      />
    );

    expect(container.innerHTML).toBe(html);
  });

  test("renders props attributes if they are clashing with global configuration attributes", () => {
    const config: Config = {
      paragraph: {
        attributes: {
          className: "paragraph",
        },
      },
    };

    setRichtextRendererConfig(config);

    const html =
      '<div><div><p class="paragraph-props"><span>Award-winning mineral sunscreens formulated with non-nano zinc oxide, the safest sunscreen according to the EWG.</span></p></div></div>';
    const { container } = render(
      <RichTextRenderer
        data={richTextData}
        paragraph={{ className: "paragraph-props" }}
      />
    );

    expect(container.innerHTML).toBe(html);
  });

  test("renders correct custom element with global configuration", () => {
    const config: Config = {
      paragraph: {
        as: "div",
      },
    };

    setRichtextRendererConfig(config);

    const html =
      "<div><div><div><span>Award-winning mineral sunscreens formulated with non-nano zinc oxide, the safest sunscreen according to the EWG.</span></div></div></div>";
    const { container } = render(<RichTextRenderer data={richTextData} />);

    expect(container.innerHTML).toBe(html);
  });

  test("renders correct custom element with props local configuration", () => {
    const html =
      "<div><div><div><span>Award-winning mineral sunscreens formulated with non-nano zinc oxide, the safest sunscreen according to the EWG.</span></div></div></div>";
    const { container } = render(
      <RichTextRenderer data={richTextData} paragraph={{ as: "div" }} />
    );

    expect(container.innerHTML).toBe(html);
  });

  test("renders correct react element with global configuration", () => {
    const FancyReactElement = ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement>) => (
      <div data-fancy-el {...props}>
        {children}
      </div>
    );

    const config: Config = {
      paragraph: {
        as: FancyReactElement,
      },
    };

    setRichtextRendererConfig(config);

    const html =
      '<div><div><div data-fancy-el="true"><span>Award-winning mineral sunscreens formulated with non-nano zinc oxide, the safest sunscreen according to the EWG.</span></div></div></div>';
    const { container } = render(<RichTextRenderer data={richTextData} />);

    expect(container.innerHTML).toBe(html);
  });

  test("renders correct react element with props configuration", () => {
    const FancyReactElement = ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement>) => (
      <div data-fancy-el {...props}>
        {children}
      </div>
    );

    const html =
      '<div><div><div data-fancy-el="true"><span>Award-winning mineral sunscreens formulated with non-nano zinc oxide, the safest sunscreen according to the EWG.</span></div></div></div>';
    const { container } = render(
      <RichTextRenderer
        data={richTextData}
        paragraph={{ as: FancyReactElement }}
      />
    );

    expect(container.innerHTML).toBe(html);
  });
});

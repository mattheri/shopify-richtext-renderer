import {
  type FutureReactNode,
  type RichTextNode,
  type ElementPropsGeneric,
  type Config,
  setRichtextRendererConfig,
} from "../src";

import createNode from "../src/utils/node";

describe("createNode", () => {
  test("should create a FutureReactNode", () => {
    const node: RichTextNode = {
      type: "paragraph",
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };
    const expected: FutureReactNode = {
      type: "p",
      attributes: {
        title: "Hello world!",
        style: {},
      },
      children: [
        {
          type: "strong",
          attributes: {},
          children: [
            {
              type: "em",
              attributes: {},
              children: "Hello world!",
            },
          ],
        },
      ],
    };

    expect(createNode(node)).toMatchObject(expected);
  });

  test("should add attributes from elementProps", () => {
    const node: RichTextNode = {
      type: "paragraph",
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };
    const elementProps: ElementPropsGeneric = {
      p: {
        style: {
          color: "red",
        },
      },
    };
    const expected: FutureReactNode = {
      type: "p",
      attributes: {
        title: "Hello world!",
        style: {
          color: "red",
        },
      },
      children: [
        {
          type: "strong",
          attributes: {},
          children: [
            {
              type: "em",
              attributes: {},
              children: "Hello world!",
            },
          ],
        },
      ],
    };

    expect(createNode(node, elementProps)).toMatchObject(expected);
  });

  test("should add attributes from richtextrendererConfig", () => {
    const node: RichTextNode = {
      type: "paragraph",
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };
    const config: Config = {
      p: {
        attributes: {
          style: {
            color: "blue",
          },
        },
      },
    };

    setRichtextRendererConfig(config);
    const expected: FutureReactNode = {
      type: "p",
      attributes: {
        title: "Hello world!",
        style: {
          color: "blue",
        },
      },
      children: [
        {
          type: "strong",
          attributes: {},
          children: [
            {
              type: "em",
              attributes: {},
              children: "Hello world!",
            },
          ],
        },
      ],
    };

    expect(createNode(node)).toMatchObject(expected);
  });

  test("should add the correct attributes for a anchor element", () => {
    const node: RichTextNode = {
      type: "link",
      value: "Hello world!",
      url: "https://example.com",
      children: [],
    };
    const expected: FutureReactNode = {
      type: "a",
      attributes: {
        href: "https://example.com",
      },
      children: "Hello world!",
    };

    expect(createNode(node)).toMatchObject(expected);
  });

  test("should add the correct attributes for a anchor element with elementProps", () => {
    const node: RichTextNode = {
      type: "link",
      value: "Hello world!",
      url: "https://example.com",
      children: [],
    };
    const elementProps: ElementPropsGeneric = {
      a: {
        target: "_self",
      },
    };

    const expected: FutureReactNode = {
      type: "a",
      attributes: {
        href: "https://example.com",
        target: "_self",
      },
      children: "Hello world!",
    };

    expect(createNode(node, elementProps)).toMatchObject(expected);
  });

  test("should add a target _blank by default for a anchor element", () => {
    const node: RichTextNode = {
      type: "link",
      value: "Hello world!",
      url: "https://example.com",
      children: [],
    };
    const expected: FutureReactNode = {
      type: "a",
      attributes: {
        href: "https://example.com",
        target: "_blank",
      },
      children: "Hello world!",
    };

    expect(createNode(node)).toMatchObject(expected);
  });
});

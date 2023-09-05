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
        style: {
          fontWeight: "bold",
          fontStyle: "italic",
        },
      },
      children: "Hello world!",
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
      paragraph: {
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
          fontWeight: "bold",
          fontStyle: "italic",
          color: "red",
        },
      },
      children: "Hello world!",
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
      paragraph: {
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
          fontWeight: "bold",
          fontStyle: "italic",
          color: "blue",
        },
      },
      children: "Hello world!",
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

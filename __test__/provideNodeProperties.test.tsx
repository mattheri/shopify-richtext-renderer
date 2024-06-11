import React from "react";

import type { Config, RichTextNode } from "../src";
import { setRichtextRendererConfig } from "../src";
import provideNodeProperties from "../src/utils/provideNodeProperties";

describe("provideNodeProperties", () => {
  test("should return a node type and node attributes", () => {
    const node: RichTextNode = {
      type: "paragraph",
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };
    const expected = {
      type: "p",
      nodeAttributes: {},
    };

    expect(provideNodeProperties(node)).toMatchObject(expected);
  });

  test("should return a node type p", () => {
    const node: RichTextNode = {
      type: "paragraph",
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };
    const expected = {
      type: "p",
      nodeAttributes: {},
    };

    expect(provideNodeProperties(node)).toMatchObject(expected);
  });

  test("should return a node type p for a heading by default", () => {
    const node: RichTextNode = {
      type: "heading",
      level: 1,
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };
    const expected = {
      type: "span",
      nodeAttributes: {},
    };

    expect(provideNodeProperties(node)).toMatchObject(expected);
  });

  test("should provide a default level of 1 for a heading", () => {
    const config: Config = {
      h1: {
        as: "h1",
      },
    };
    setRichtextRendererConfig(config);

    const node: RichTextNode = {
      type: "heading",
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };

    const expected = {
      type: "h1",
      nodeAttributes: {},
    };

    expect(provideNodeProperties(node)).toMatchObject(expected);
  });

  test("should return a unordered list type by default", () => {
    const node: RichTextNode = {
      type: "list",
      children: [],
    };
    const expected = {
      type: "ul",
      nodeAttributes: {},
    };

    expect(provideNodeProperties(node)).toMatchObject(expected);
  });

  test("should return a br type if no value and the type is text", () => {
    const node: RichTextNode = {
      type: "text",
      children: [],
    };
    const expected = {
      type: "br",
      nodeAttributes: {},
    };

    expect(provideNodeProperties(node)).toMatchObject(expected);
  });

  test("should return a node type and node attributes with elementProps", () => {
    const node: RichTextNode = {
      type: "paragraph",
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };
    const expected = {
      type: "div",
      nodeAttributes: {
        className: "paragraph",
      },
    };

    expect(
      provideNodeProperties(node, {
        p: {
          as: "div",
          className: "paragraph",
        },
      })
    ).toMatchObject(expected);
  });

  test("should return a node type with attributes from global configuration", () => {
    const node: RichTextNode = {
      type: "paragraph",
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };
    const expected = {
      type: "div",
      nodeAttributes: {
        className: "paragraph",
      },
    };
    const config: Config = {
      p: {
        as: "div",
        attributes: {
          className: "paragraph",
        },
      },
    };
    setRichtextRendererConfig(config);

    expect(provideNodeProperties(node)).toMatchObject(expected);
  });

  test("should return a node type with attributes from global configuration and elementProps", () => {
    const node: RichTextNode = {
      type: "paragraph",
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };
    const expected = {
      type: "div",
      nodeAttributes: {
        className: "paragraph",
      },
    };
    const config: Config = {
      p: {
        as: "p",
        attributes: {
          className: "paragraph-props",
        },
      },
    };
    setRichtextRendererConfig(config);

    expect(
      provideNodeProperties(node, {
        p: {
          as: "div",
          className: "paragraph",
        },
      })
    ).toMatchObject(expected);
  });

  test("should return a node with a custom element type", () => {
    const TestElement = () => <div />;

    const node: RichTextNode = {
      type: "paragraph",
      value: "Hello world!",
      bold: true,
      italic: true,
      title: "Hello world!",
      children: [],
    };
    const expected = {
      type: TestElement,
      nodeAttributes: {
        className: "paragraph",
      },
    };
    const config: Config = {
      p: {
        as: TestElement,
        attributes: {
          className: "paragraph",
        },
      },
    };
    setRichtextRendererConfig(config);

    expect(provideNodeProperties(node)).toMatchObject(expected);
  });
});

import type { RichTextNode, Config } from "../src";

import React from "react";
import provideNodeProperties from "../src/utils/provideNodeProperties";
import { setRichtextRendererConfig } from "../src";

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
        paragraph: {
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
      paragraph: {
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
      paragraph: {
        as: "p",
        attributes: {
          className: "paragraph-props",
        },
      },
    };
    setRichtextRendererConfig(config);

    expect(
      provideNodeProperties(node, {
        paragraph: {
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
      paragraph: {
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

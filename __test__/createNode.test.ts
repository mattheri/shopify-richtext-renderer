import type {
  FutureReactNode,
  RichTextNode,
  ElementPropsGeneric,
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
});

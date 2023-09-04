import type { FutureReactNode } from "../src";

import { createElement as _createElement } from "react";
import createElement from "../src/utils/createElement";

describe("createElement", () => {
  test("should create a react element", () => {
    const node: FutureReactNode = {
      type: "p",
      attributes: {
        key: "1",
        style: {
          fontWeight: "bold",
        },
      },
      children: "Hello world!",
    };
    const expected = _createElement(
      "p",
      {
        key: "1",
        style: {
          fontWeight: "bold",
        },
      },
      "Hello world!"
    );

    expect(createElement(node)).toEqual(expected);
  });
});

import cleanAttributes from "../src/utils/cleanAttributes";
import { NON_VALID_ATTRIBUTES } from "../src/utils/constants";

describe("cleanAttributes", () => {
  test("should remove non valid attributes", () => {
    const attributes = Object.fromEntries(
      Object.values(NON_VALID_ATTRIBUTES).map((value) => [value, "something"])
    );
    const expected = {};

    expect(cleanAttributes(attributes)).toEqual(expected);
  });

  test("should not remove valid attributes", () => {
    const expected = {
      href: "https://example.com",
      target: "_blank",
      title: "Example",
      style: "font-weight: bold;",
    };
    const attributes = {
      ...expected,
      ...Object.fromEntries(
        Object.values(NON_VALID_ATTRIBUTES).map((value) => [value, "something"])
      ),
    };

    expect(cleanAttributes(attributes)).toEqual(expected);
  });
});

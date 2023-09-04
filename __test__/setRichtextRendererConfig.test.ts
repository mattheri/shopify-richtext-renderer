import type { Config } from "../src";

import { setRichtextRendererConfig } from "../src";
import richtextrendererConfig from "../src/utils/richtextRendererConfig";

describe("setRichtextRendererConfig", () => {
  test("should set richtext renderer config", () => {
    const newConfig: Config = {
      ...richtextrendererConfig,
      h1: {
        as: "h1",
        attributes: {
          className: "h1",
        },
      },
    };

    setRichtextRendererConfig(newConfig);

    expect(richtextrendererConfig).toEqual(newConfig);
  });

  test("should throw error when config is not an object", () => {
    const newConfig = "test";

    expect(() => setRichtextRendererConfig(newConfig)).toThrowError(
      "Config must be an object"
    );
  });
});

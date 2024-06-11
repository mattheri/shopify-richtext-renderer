import type { ElementPropsGeneric, NormalizedElementProps } from "../types";

export default function getNormalizedElementProps(
  props?: ElementPropsGeneric
): NormalizedElementProps {
  return Object.entries(props ?? {}).reduce<NormalizedElementProps>(
    (acc, [_key, value]) => {
      if (!value) return acc;

      const tValue = Object.assign({}, value);
      const key = _key as keyof ElementPropsGeneric;
      delete tValue.as;
      acc[key] = tValue;

      return acc;
    },
    {}
  );
}

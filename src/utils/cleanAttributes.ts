import { NON_VALID_ATTRIBUTES } from "./constants";

export default function cleanAttributes(attr: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(attr)
      .map(([key, value]) => {
        if (Object.values(NON_VALID_ATTRIBUTES).includes(key)) return false;
        return [key, value];
      })
      .filter(Boolean) as [string, string][]
  );
}

export const isObject = (
  value: unknown,
): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};


export const hasProperty = <
  K extends string,
>(
  value: unknown,
  key: K,
): value is Record<K, unknown> => {
  return (
    isObject(value) &&
    key in value
  );
};
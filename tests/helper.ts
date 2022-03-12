export const unfreezeImport = <T>(module: T, key: keyof T): void => {
  const meta = Object.getOwnPropertyDescriptor(module, key);
  const getter = meta.get;

  const originalValue = getter() as T[typeof key];
  let currentValue = originalValue;
  let isMocked = false;

  Object.defineProperty(module, key, {
    ...meta,
    get: () => (isMocked ? currentValue : getter()),
    set(newValue: T[typeof key]) {
      isMocked = newValue !== originalValue;
      currentValue = newValue;
    },
  });
};

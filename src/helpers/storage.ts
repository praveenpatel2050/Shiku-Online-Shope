/**Local Storage */

export const setLocalData = (key: string, value: unknown): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getLocalData = (key: string) => {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

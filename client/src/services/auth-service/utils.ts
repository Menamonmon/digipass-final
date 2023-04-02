import { PERSISTED_AUTH_STATE_ID } from "./consts";

// This is done in a hacky way that makes some assumptions about the structure of the state
const store = typeof window !== "undefined" ? localStorage : undefined;
export const getPersistedJwt = (): string => {
  const state = retrievePersistedState(PERSISTED_AUTH_STATE_ID);
  return state?.jwt || "";
};

export const persistState = (values: Object, key: string) => {
  store?.setItem(key, JSON.stringify(values));
};

export const retrievePersistedState = (
  key: string
): Record<string, any> | undefined => {
  const rawState = store?.getItem(key);
  if (rawState) {
    return JSON.parse(rawState);
  }
};

export const clearPersistedState = (key: string) => {
  store?.removeItem(key);
};

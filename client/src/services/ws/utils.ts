import { config } from "../../../config";
import { getPersistedJwt } from "../auth-service";

export const genWsUrl = () => {
  const url = new URL(config.backendUrl);
  const protocol = url.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${url.host}/websockets?jwt=${getPersistedJwt()}`;
};

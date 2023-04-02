import useWebSocket, { Options } from "react-use-websocket";
import { genWsUrl } from "../services/ws";

export const useWs = (options?: Options, connect?: boolean) => {
  return useWebSocket(genWsUrl(), options, connect);
};

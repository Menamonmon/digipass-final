import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";
import { config } from "../../config";
import { getPersistedJwt } from "../services/auth-service";

const fetchQuery: FetchFunction = (operation, variables) => {
  return fetch(`${config.backendUrl}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getPersistedJwt(),
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
};

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(fetchQuery);

export const RelayEnvironment = new Environment({ store, network });

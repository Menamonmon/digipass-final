import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  clearPersistedState,
  persistState,
  retrievePersistedState,
} from "../../services/auth-service";

interface LockedRouteProps {
  isLocked: () => boolean;
}
const LOCKED_ROUTE_KEY = "locked-route";

export const LockedRoute: React.FC<LockedRouteProps> = ({
  isLocked,
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    persistState({ lockedRoute: router.asPath }, LOCKED_ROUTE_KEY);
    return () => {
      const state = retrievePersistedState(LOCKED_ROUTE_KEY);
      if (state?.lockedRoute && isLocked()) {
        router.push(state.lockedRoute);
      } else {
        clearPersistedState(LOCKED_ROUTE_KEY);
      }
    };
  }, []);

  return <>{children}</>;
};

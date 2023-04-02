import { userInfo } from "os";
import { AuthChecker } from "type-graphql";
import { AuthenticatedGraphQLContext } from "./types";

export const authChecker: AuthChecker<AuthenticatedGraphQLContext> = (
  { root, args, context, info },
  roles
) => {
  if (context.user) {
    const user = context.user;
    if (roles.length > 0) {
      return roles.includes(user.userType);
    }
    return true;
  }

  return false; // or false if access is denied
};

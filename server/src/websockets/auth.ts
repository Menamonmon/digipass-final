import { IncomingMessage } from "http";
import { CurrentUserJwtInfo } from "../auth/types";
import jsonwebtoken from "jsonwebtoken";

export async function verifyConnection(
  jwt: string
): Promise<CurrentUserJwtInfo | null> {
  if (jwt) {
    try {
      const { id, email, userType } = jsonwebtoken.verify(
        jwt,
        process.env.JWT_SECRET
      ) as CurrentUserJwtInfo;
      const returnValue = { id, email, userType };
      return returnValue;
    } catch (err) {
      return null;
    }
  }
  return null;
}

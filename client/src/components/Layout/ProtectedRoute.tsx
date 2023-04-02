import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

interface ProtectedRouteProps {
  redirect: string;
  override?: boolean;
  alternativeChildren?: ReactNode;
  allowed?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirect,
  allowed,
  children,
  override,
  alternativeChildren,
}) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  let needToRedirect = true;
  if (!override) {
    needToRedirect = allowed !== undefined ? allowed : isAuthenticated;
  }
  useEffect(() => {
    if (!needToRedirect && !alternativeChildren) {
      router.push(redirect);
    }
  }, [needToRedirect]);
  return <>{needToRedirect ? children : alternativeChildren}</>;
};

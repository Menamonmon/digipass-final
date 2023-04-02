import React from "react";
import useAuth from "../../hooks/useAuth";
import { PageNotFound } from "./PageNotFound";
import { ProtectedRoute } from "./ProtectedRoute";

export const TeacherLayout: React.FC<{}> = ({ children }) => {
  const { authStatus } = useAuth();
  const isTeacher =
    authStatus === "new_teacher" || authStatus === "old_teacher";

  return (
    <ProtectedRoute
      allowed={isTeacher}
      redirect="/"
      alternativeChildren={<PageNotFound />}
    >
      {children}
    </ProtectedRoute>
  );
};

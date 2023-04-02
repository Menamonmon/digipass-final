import { useRouter } from "next/router";
import { Fragment } from "react";
import { TeacherLayout, StudentLayout } from "../components/Layout";

export const useAppLayout = () => {
  const router = useRouter();
  const path = router.asPath;
  let routeType = "general";
  if (path.startsWith("/teacher")) {
    routeType = "teacher";
  } else if (path.startsWith("/student")) {
    routeType = "student";
  }
  const AppLayout =
    routeType === "general"
      ? Fragment
      : routeType === "student"
      ? StudentLayout
      : TeacherLayout;
  return AppLayout;
};

import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import RequestPassForm from "../../components/Passes/RequestPassForm";

const Page: NextPage<{}> = () => {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;
  return <RequestPassForm classroomId={classroomId} />;
};

export default Page;

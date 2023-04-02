import { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import CountdownTimerWrapper from "../../components/Passes/CountdownTimerWrapper";

const Page: NextPage<{}> = () => {
  const router = useRouter();
  const passId = router.query.passId as string;
  return <CountdownTimerWrapper passId={passId} />;
};

export default Page;

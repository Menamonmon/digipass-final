import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/Layout";
import useAuth from "../hooks/useAuth";

const Home: NextPage = () => {
  const { authStatus } = useAuth();
  return (
    <>
      <Head>
        <title>Welcome to digipass!</title>
      </Head>
      <div>
        <a
          href={`${
            authStatus.endsWith("student") ? "student" : "teacher"
          }/classrooms`}
        >
          Classrooms
        </a>
      </div>
    </>
  );
};

export default Home;

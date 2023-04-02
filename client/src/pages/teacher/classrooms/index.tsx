import { IconButton } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { DetailedClassroomsList } from "../../../components/Classrooms/DetailedClassroomsList";

const ClassroomsPage: NextPage<{}> = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My Classrooms</title>
      </Head>
      <DetailedClassroomsList />
      <button
        className="absolute flex justify-center w-10 h-10 text-4xl xs:right-20 sm:right-20 lg:right-32 xl:right-60 2xl:right-1/4 bottom-10 btn btn-circle btn-sm tooltip"
        data-tip="Create new classroom!"
        onClick={() => router.push("/teacher/classrooms/add")}
      >
        <MdAddCircleOutline />
      </button>
    </>
  );
};

export default ClassroomsPage;

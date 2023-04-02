import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useState } from 'react'
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect } from 'react';


type PendingState = "pending" | "approved" | "denied"

const PendingPassWrapper: React.FC<{}> = () => {
  const teacherName = 'John Doe';
  const classroomName = '501';
  const router = useRouter()
  const [pendingState, setPendingState] = useState<PendingState>('approved');
  const pendingStateIcon = {
    'pending': <CircularProgress color="secondary"/>,
    'approved': "",
    'denied': <Link href="/student/classrooms"><h2><span className="underline" >Go back</span>.</h2></Link>,
  };
  let alertBackgroundColor; 
  let alertMessage;
  let statusMessage;
  useEffect(() => {
    if (pendingState=='approved'){
      router.push("/student/pass-countdown`")
    }
  }, [pendingState]);


  switch (pendingState) {
    case 'pending': {
      alertBackgroundColor = 'bg-purple-400'
      alertMessage = 'Request Submitted!'
      statusMessage = 'Pending Approval'
      break;
    }
    case 'approved': {
      alertBackgroundColor = 'bg-green-400'
      alertMessage = 'Request Approved!'
      statusMessage = 'You got a pass!'
      break;
    }
    case 'denied': {
      alertBackgroundColor = 'bg-red-400'
      alertMessage = 'Request Denied.'
      statusMessage = 'You did not get a pass :('
      break;
    }
  }
  return (
       <div>
        <div className={`${alertBackgroundColor} text-[#2B303B] my-5 p-2 text-center rounded flex justify-center gap-x-2`}> 
           <span>{alertMessage}</span>
        </div>
        <div className="bg-[#BBC5DC] text-[#2B303B] p-5 rounded my-5">
          <h2 className="underline mb-5">Request Details</h2>
          <h4>{`Teacher: ${teacherName}`}</h4>
          <h4>{`Class: ${classroomName}`}</h4>
        </div>
        <h1 className="text-center">{statusMessage}</h1>
        <div className="text-center my-5">
          {pendingStateIcon[pendingState]}
        </div>
    </div>
  )
};

export default PendingPassWrapper;

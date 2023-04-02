import { config } from "./../../config";
import { useState } from "react";
import { CurrentUserJwtInfo } from "./../../../server/src/auth/types";
import io, { Socket } from "socket.io-client";
import useAuth from "./useAuth";

interface ExpandedSocket extends Socket {
  userInfo: CurrentUserJwtInfo;
}

let socket: ExpandedSocket;

export const useSockets = (
  onPassApproved: Function,
  onPassRejected: Function,
  onTeacherQueueChanged: Function
) => {
  const { authStatus, jwt } = useAuth();
  const [approvedPassId, setApprovedPassId] = useState("");

  const initializeSocket = async (cb?: (newSocket: ExpandedSocket) => void) => {
    if (socket) {
      return;
    }
    const newSocket = io(config.backendUrl, {
      query: { jwt },
    }) as ExpandedSocket;
    socket = newSocket;

    if (cb) {
      cb(newSocket);
    }

    if (socket) {
      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("queue-changed", (newPassesIdList) => {
        onTeacherQueueChanged(JSON.parse(newPassesIdList));
      });

      socket.on("pass-approved", (data) => {
        onPassApproved(data.passId);
      });

      socket.on("pass-rejected", (data) => {
        onPassRejected(data.passId);
      });
    }
  };

  const initiateTeacherSesssion = () => {
    if (authStatus.endsWith("teacher") && socket) {
      socket.emit("placement");
    } else {
      alert("ERROR: PLACEMENT FOR TEACHER FAILED");
    }
  };
  const placeStudentInClassroom = ({
    classroomId,
    teacherId,
    passId,
  }: {
    classroomId: string;
    teacherId: string;
    passId: string;
  }) => {
    if (authStatus.endsWith("student") && socket) {
      socket.emit(
        "placement",
        JSON.stringify({ classroomId, teacherId, passId })
      );
    } else {
      console.log("SOCKET", socket);
      console.log("AUTH STATUS", authStatus);
      alert("ERROR: PLACEMENT FOR STUDENT FAILED");
    }
  };

  return {
    socket,
    initializeSocket,
    initiateTeacherSesssion,
    placeStudentInClassroom,
  };
};

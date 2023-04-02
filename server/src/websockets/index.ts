import { PrismaClient } from "@prisma/client";
import { CurrentUserJwtInfo } from "./../auth/types";
import { Server } from "http";
import { verifyConnection } from "./auth";
import { Server as SocketIOServer, Socket } from "socket.io";

interface ExpandedSocket extends Socket {
  userInfo: CurrentUserJwtInfo;
}

const teacherQueues = {
  teacher: ["PASSID", "PASSID"],
};

export default async (prisma: PrismaClient, expressServer: Server) => {
  const io = new SocketIOServer(expressServer, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  });

  io.on("connection", (socket: ExpandedSocket) => {
    io.use(async (socket: any, next) => {
      if (socket.handshake.query && socket.handshake.query) {
        const userInfo = await verifyConnection(
          socket.handshake.query.jwt as string
        );
        socket.userInfo = userInfo;
        console.log("USER CONNECTED: ", userInfo?.email);
        next();
      } else {
        next(new Error("Authentication error"));
      }
    });

    // socket.on("teacher-rejected-pass", async (msg: string) => {
    //   const teacherId = socket.userInfo.id;
    //   const parsedMsg = JSON.parse(msg);

    //   const studentId: string = parsedMsg.studentId;
    //   const passId = parsedMsg.passId;
    //   const queue = teacherQueues[teacherId];
    //   if (queue) {
    //     queue.splice(queue.indexOf(passId), 1);
    //     socket.emit("queue-changed", JSON.stringify(queue));
    //     const roomSockets = (await io.in(teacherId).fetchSockets()) as any;

    //     const studentSocket = roomSockets.find(
    //       (socket) => socket?.userInfo?.id === studentId
    //     );
    //     studentSocket.emit("pass-approved");
    //   } else {
    //     console.log("TEACHER QUEUE DOES NOT EXIST: ", teacherId);
    //   }
    // });

    socket.on("teacher-approved-pass", async (msg: string) => {
      const teacherId = socket.userInfo.id;
      const parsedMsg = JSON.parse(msg);

      const studentId: string = parsedMsg.studentId;
      const passId = parsedMsg.passId;
      const queue = teacherQueues[teacherId];
      if (queue) {
        queue.splice(queue.indexOf(passId), 1);
        socket.emit("queue-changed", JSON.stringify(queue));
        const roomSockets = (await io.in(teacherId).fetchSockets()) as any;

        const studentSocket = roomSockets.find(
          (socket) => socket?.userInfo?.id === studentId
        );
        studentSocket.emit("pass-approved");
      } else {
        console.log("TEACHER QUEUE DOES NOT EXIST: ", teacherId);
      }
    });

    socket.on("placement", async (msg?: string) => {
      const { userInfo } = socket;
      const userId = userInfo?.id;
      console.log("PLACEMENT INVOKED FOR: ", userInfo?.email);
      console.log("MSG: ", msg);

      if (
        (userInfo &&
          userInfo.userType === "teacher" &&
          io.sockets.adapter.rooms[userId]) ||
        !userInfo
      ) {
        io.close();
      } else {
        if (!msg && userInfo.userType === "teacher") {
          socket.join(userId);
          teacherQueues[userId] = [];
          socket.emit("queue-changed", JSON.stringify([]));
        } else {
          const { classroomId, teacherId, passId } = JSON.parse(msg);
          console.log(io.sockets.adapter.rooms.get(teacherId));
          if (
            userInfo.userType === "student" &&
            io.sockets.adapter.rooms.get(teacherId)
          ) {
            socket.join(teacherId);
            teacherQueues[teacherId].push(passId);

            const roomSockets = (await io.in(teacherId).fetchSockets()) as any;

            const teacherSocket = roomSockets.find(
              (socket) => socket?.userInfo?.id === teacherId
            );
            teacherSocket.emit(
              "queue-changed",
              JSON.stringify(teacherQueues[teacherId])
            );
            console.log(teacherSocket);
            console.log(roomSockets.length);
          }
        }
      }
    });
  });
};

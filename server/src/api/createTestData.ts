import { male_names_list } from "./createTestDataConsts";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import prismaLogger from "./prisma-logger";
import { capitalize } from "lodash";
interface Classroom {
  teacher: string;
  students: string[];
}

export const generateData = () => {
  function makeName() {
    return capitalize(
      Date.now().toString(36) + Math.random().toString(36).substring(2)
    );
  }
  const names: string[] = Array(100);
  for (let i = 0; i < names.length; i++) {
    names[i] = makeName();
  }
  console.log(names);
  function generateRandomName() {
    return male_names_list[Math.floor(Math.random() * male_names_list.length)];
    return names[Math.floor(Math.random() * names.length)];
  }
  function genFakeUser() {
    const firstName = generateRandomName();
    const lastName = generateRandomName();
    return {
      firstName,
      lastName,
      email: `${firstName}@${lastName}.com`,
      pictureUrl: `https://picsum.photos/100`,
    };
  }

  function genRandomNumber(start: number, end: number) {
    const diff = end - start;
    return Math.floor(Math.random() * diff) + start;
  }

  function genFakeClassroom() {
    return {
      title: generateRandomName(),
      startHour: genRandomNumber(0, 24),
      endHour: genRandomNumber(0, 24),
      startMinute: genRandomNumber(0, 60),
      endMinute: genRandomNumber(0, 60),
    };
  }

  async function createTestData(prisma: PrismaClient) {
    // Creating a random list of students and teachers
    const classroomList = [];
    const tempStudentsList = [];
    for (let i = 0; i < 1000; i++) {
      if (i % 50 == 0) {
        const teacher = await prisma.teacher.create({
          data: {
            userProfile: { create: genFakeUser() },
          },
        });
        const classroom = await prisma.classroom.create({
          data: {
            ...genFakeClassroom(),
            teacher: { connect: { id: teacher.id } },
            studentToClassroomMappings: {
              createMany: {
                data: tempStudentsList.map(({ id }) => ({
                  assignedById: teacher.id,
                  studentId: id,
                })),
              },
            },
          },
        });
        classroomList.push(classroom);
      } else {
        try {
          const student = await prisma.student.create({
            data: {
              userProfile: { create: genFakeUser() },
              studentId: genRandomNumber(100000, 999999).toString(),
            },
          });
          tempStudentsList.push({
            id: student.id,
          });
        } catch {}
      }
    }
  }
  const prisma = new PrismaClient();
  prisma.$connect();
  prisma.$use(prismaLogger);
  createTestData(prisma);
};

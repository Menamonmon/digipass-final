import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateOneClassroomResolver,
  StudentsOnClassrooms,
} from "../../prisma/generated/type-graphql";
import { AuthenticatedGraphQLContext } from "../auth/types";
import {
  FullClassroom,
  LimitedClassroom,
  StudentsOnClassroomsWithAssociatedStudent,
  TeacherClassroomUpdateInput,
} from "./types";
import { User } from "../../prisma/generated/type-graphql";

@Resolver()
class ClassroomsResolvers {
  @Authorized("teacher")
  @Mutation(() => FullClassroom, { nullable: true })
  async updateClassroom(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("classroomId") classroomId: string,
    @Arg("data")
    data: TeacherClassroomUpdateInput
  ): Promise<FullClassroom | null> {
    const { id: teacherId } = user;
    const existingClassroom = await prisma.classroom.findUnique({
      where: {
        id_teacherId: {
          teacherId,
          id: classroomId,
        },
      },
    });
    if (!existingClassroom.archived) {
      const updatedClassrooms = await prisma.classroom.update({
        where: {
          id_teacherId: {
            teacherId,
            id: classroomId,
          },
        },
        data,
      });
      return updatedClassrooms;
    } else {
      return null;
    }
  }

  @Authorized("teacher")
  @Mutation(() => FullClassroom, { nullable: true })
  async archiveClassroom(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("classroomId") classroomId: string
  ): Promise<FullClassroom | null> {
    const { id: teacherId } = user;
    return await prisma.classroom.update({
      where: {
        id_teacherId: {
          id: classroomId,
          teacherId,
        },
      },
      data: {
        archived: true,
      },
    });
  }

  @Authorized("teacher")
  @Mutation(() => FullClassroom, { nullable: true })
  async unarchiveClassroom(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("classroomId") classroomId: string
  ): Promise<FullClassroom | null> {
    const { id: teacherId } = user;
    return await prisma.classroom.update({
      where: {
        id_teacherId: {
          id: classroomId,
          teacherId,
        },
      },
      data: {
        archived: false,
      },
    });
  }

  @Authorized("teacher")
  @Mutation(() => StudentsOnClassroomsWithAssociatedStudent, { nullable: true })
  async addStudentToClassroom(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("classroomId") classroomId: string,
    @Arg("studentId") studentId: string
  ): Promise<StudentsOnClassroomsWithAssociatedStudent | null> {
    const { id: teacherId } = user;
    return await prisma.studentsOnClassrooms.create({
      data: {
        classroom: {
          connect: {
            id: classroomId,
          },
        },
        assignedBy: {
          connect: {
            id: teacherId,
          },
        },
        student: {
          connect: {
            id: studentId,
          },
        },
      },
      include: {
        student: {
          include: {
            userProfile: true,
            passes: true,
          },
        },
      },
    });
  }

  // To remove a student from a classroom, the teacher must be the one who assigned them
  @Authorized("teacher")
  @Mutation(() => StudentsOnClassrooms, { nullable: true })
  async removeStudentFromClassroom(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("classroomId") classroomId: string,
    @Arg("studentId") studentId: string
  ): Promise<StudentsOnClassrooms | null> {
    const { id: teahcerId } = user;
    return (
      await prisma.studentsOnClassrooms.deleteMany({
        where: {
          classroomId,
          studentId,
          assignedById: teahcerId,
        },
      })
    )[0];
  }

  @Authorized("teacher")
  @Query(() => FullClassroom, { nullable: true })
  async teacherClassroom(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("classroomId") classroomId: string
  ): Promise<FullClassroom | null> {
    const { id: teacherId } = user;
    const classroom = await prisma.classroom.findUnique({
      where: {
        id_teacherId: {
          teacherId,
          id: classroomId,
        },
      },
      include: {
        passes: true,
        studentToClassroomMappings: {
          select: {
            student: { include: { userProfile: true, passes: true } },
          },
        },
      },
    });

    if (classroom && !classroom.archived) {
      return {
        ...classroom,
        students: classroom.studentToClassroomMappings.map(
          (mapping) => mapping.student
        ),
        studentToClassroomMappings: null,
      };
    }
    return null;
  }

  @Authorized("teacher")
  @Query(() => [FullClassroom], { nullable: true })
  async teacherClassrooms(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext
  ): Promise<FullClassroom[] | null> {
    const { id: teacherId } = user;
    const classrooms = await prisma.classroom.findMany({
      where: { teacherId },
      orderBy: { archived: "asc" },
    });
    return classrooms;
  }

  @Authorized("student")
  @Query(() => LimitedClassroom, { nullable: true })
  async studentClassroom(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("classroomId", { nullable: true }) classroomId?: string,
    @Arg("classCode", { nullable: true }) classCode?: string
  ): Promise<LimitedClassroom | null> {
    if (classroomId || classCode) {
      const classroom = await prisma.classroom.findUnique({
        where: { id: classroomId, classCode: classCode },
      });
      if (!classroom.archived) {
        return classroom;
      }
    }
    return null;
  }

  @Authorized("student")
  @Query(() => [FullClassroom], { nullable: true })
  async studentClassrooms(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext
  ): Promise<FullClassroom[] | null> {
    const { id: studentId } = user;
    const classrooms = await prisma.classroom.findMany({
      where: {
        archived: false,
        studentToClassroomMappings: {
          some: {
            studentId,
          },
        },
      },
    });
    return classrooms;
  }

  @Authorized("teacher")
  @Query(() => [User])
  async searchStudents(
    @Ctx() { prisma }: AuthenticatedGraphQLContext,
    @Arg("query", { nullable: true }) query: string
  ): Promise<User[]> {
    const searchValidationRegex = /^[A-Za-z.]+$/;
    if (!query || !searchValidationRegex.test(query)) {
      return [];
    }
    const queryOrStatements = [
      `
		("public"."Student"."id") IN 
			(SELECT "t0"."id" FROM "public"."Student" AS "t0" INNER JOIN "public"."User" AS "j0" ON ("j0"."id") = ("t0"."id") 
				WHERE ("j0"."firstName"::text ILIKE '%${query}%' AND "t0"."id" IS NOT NULL))
	  `,
      `
		("public"."Student"."id") IN 
			(SELECT "t0"."id" FROM "public"."Student" AS "t0" INNER JOIN "public"."User" AS "j0" ON ("j0"."id") = ("t0"."id") 
				WHERE ("j0"."lastName"::text ILIKE '%${query}%' AND "t0"."id" IS NOT NULL))
	  `,
      `
		("public"."Student"."id") IN 
			(SELECT "t0"."id" FROM "public"."Student" AS "t0" INNER JOIN "public"."User" AS "j0" ON ("j0"."id") = ("t0"."id") 
				WHERE ("j0"."email"::text ILIKE '%${query}%' AND "t0"."id" IS NOT NULL))
	  `,
    ]
      .filter((value) => value.length !== 0)
      .join(" OR ");

    const result: User[] = await prisma.$queryRawUnsafe(`
	SELECT * FROM "public"."Student" 
	LEFT JOIN "public"."User" AS "orderby_0_User" ON ("public"."Student"."id" = "orderby_0_User"."id") 
	WHERE (
		${queryOrStatements}
	) 
	ORDER BY "orderby_0_User"."firstName" ASC 
	;
	`);

    return result;
  }
}

export const classroomsResolvers = [
  ClassroomsResolvers,
  CreateOneClassroomResolver,
];

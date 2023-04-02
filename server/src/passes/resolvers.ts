import { UpdateMany } from "./../classrooms/types";
import { datastream } from "googleapis/build/src/apis/datastream";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Pass } from "../../prisma/generated/type-graphql";
import { AuthenticatedGraphQLContext } from "../auth/types";
import { mapTimeToToday } from "./utilts";
import { FullPass } from "../classrooms/types";
import { update } from "lodash";

@Resolver()
class PassMutationsResolver {
  // Return null if the pass doesn't exist or
  // the teacher is trying to edit a pass that in none of his classrooms
  @Authorized("teacher")
  @Mutation(() => UpdateMany, { nullable: true })
  async teacherUpdatePass(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("passId") passId: string,
    @Arg("approved") approved: boolean,
    @Arg("duration", { nullable: true }) duration?: number
  ): Promise<UpdateMany | null> {
    // Ensure that the pass exists
    // Ensure that it has a classroom asscoiated with it
    // Ensure that the teacher of that classroom is the same as the teacher making the mutaiton

    const { id: teacherId } = user;
    let passDuration: number;
    if (!duration) {
      const passToUpdate = await prisma.pass.findUnique({
        where: {
          id_issuerId: {
            id: passId,
            issuerId: teacherId,
          },
        },
      });
      passDuration = passToUpdate?.duration;
    } else {
      passDuration = duration;
    }
    let startTime: Date | undefined;
    let endTime: Date | undefined;
    if (approved) {
      startTime = new Date();
      endTime = new Date(startTime.getTime() + passDuration * 60 * 1000);
    }
    const updatedPasses = await prisma.pass.updateMany({
      where: {
        id: passId,
        issuerId: teacherId,
        classroom: {
          teacherId,
          archived: false,
        },
      },
      data: {
        duration: passDuration,
        startTime,
        endTime,
        approved,
      },
    });
    if (updatedPasses["count"] === 1) {
      return updatedPasses;
    }
    return null;
  }

  @Authorized("teacher")
  @Query(() => FullPass, { nullable: true })
  async teacherGetPass(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("passId") passId: string
  ): Promise<FullPass | null> {
    const { id: issuerId } = user;
    return await prisma.pass.findUnique({
      where: {
        id_issuerId: {
          id: passId,
          issuerId,
        },
      },
      include: {
        student: {
          select: {
            studentId: true,
            passesUsed: true,
            id: true,
            userProfile: true,
          },
        },
      },
    });
  }

  @Authorized("teacher")
  @Query(() => [Pass], { nullable: true })
  async teacherGetMyPasses(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("classroomId", { nullable: true }) classroomId?: string
  ): Promise<Pass[] | null> {
    const { id: issuerId } = user;
    return await prisma.pass.findMany({
      where: {
        classroomId,
        issuerId,
      },
    });
  }

  // Returns null if the student already has a pass during the time period of that class
  // or if that class doesn't exist
  @Authorized("student")
  @Mutation(() => Pass, { nullable: true })
  async studentCreatePass(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("classroomId") classroomId: string,
    @Arg("reason") reason: string
  ): Promise<Pass | null> {
    const { id } = user;
    const studentId = id;
    const classroom = await prisma.classroom.findUnique({
      where: { id: classroomId },
    });

    if (classroom && !classroom.archived) {
      // Checking if the student already has a pass for that specific class

      const todayClassroomStartTime = mapTimeToToday(
        classroom.startHour,
        classroom.startMinute
      );
      const todayClassroomEndTime = mapTimeToToday(
        classroom.endHour,
        classroom.endMinute
      );
      const existingPassForToday = await prisma.pass.findFirst({
        where: {
          studentId,
          classroomId: classroom.id,
          createdAt: {
            gt: todayClassroomStartTime,
            lt: todayClassroomEndTime,
          },
        },
      });
      if (existingPassForToday) {
        return null;
      }
      const newPass = await prisma.pass.create({
        data: {
          studentId,
          classroomId: classroom.id,
          duration: 7,
          approved: false,
          reason: reason,
          issuerId: classroom.teacherId,
        },
      });

      //TODO: Implement ping teacher event and specific student joining the classroom's passses lobby
      return newPass;
    }
    return null;
  }

  @Authorized("student")
  @Query(() => Pass, { nullable: true })
  async studentGetPass(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext,
    @Arg("passId") passId: string
  ): Promise<Pass | null> {
    const { id: studentId } = user;
    return await prisma.pass.findUnique({
      where: {
        id_studentId: {
          id: passId,
          studentId,
        },
      },
    });
  }

  @Authorized("student")
  @Query(() => [Pass], { nullable: true })
  async studentGetMyPasses(
    @Ctx() { prisma, user }: AuthenticatedGraphQLContext
  ): Promise<Pass[] | null> {
    const { id: studentId } = user;
    return await prisma.pass.findMany({
      where: {
        studentId,
      },
    });
  }
}

export const passesResolvers = [PassMutationsResolver];

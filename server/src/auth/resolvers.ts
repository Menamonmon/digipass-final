import { identifyEmailType } from "./userVerification";
import { GraphQLContext } from "./../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import jsonwebtoken from "jsonwebtoken";
import {
  AuthenticatedGraphQLContext,
  BaseRegistrationResponse,
  CurrentUser,
} from "./types";
import { oauth2Client } from "./google-oauth-client";
import { User } from "@prisma/client";

@Resolver()
class RegisterResolver {
  @Mutation(() => BaseRegistrationResponse, { nullable: true })
  async registerUserWithGoogle(
    @Ctx() { prisma }: GraphQLContext,
    @Arg("idToken") idToken: string,
    @Arg("userType", { nullable: true }) userType: "student" | "teacher" | null
  ): Promise<BaseRegistrationResponse | null> {
    try {
      // Fetching the user data using the Google ID token
      const ticket = await oauth2Client.verifyIdToken({
        idToken,
        audience: process.env.CLIENT_ID,
      });
      const {
        given_name: firstName,
        family_name: lastName,
        picture: pictureUrl,
        email,
      } = ticket.getPayload();
      const emailType = userType === null ? identifyEmailType(email) : userType;

      let userProfile: User;
      // Checking if the user exists and if they do verifying that the existing user type matches the incoming one
      const existingUserProfile = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUserProfile) {
        const matchingStudent = await prisma.student.findUnique({
          where: { id: existingUserProfile.id },
        });
        const matchingTeacher = await prisma.teacher.findUnique({
          where: { id: existingUserProfile.id },
        });
        if (emailType === "student" && matchingTeacher) {
          return null;
        } else if (emailType === "teacher" && matchingStudent) {
          return null;
        } else if (emailType === "neither") {
          return null;
        }
      }

      try {
        userProfile = await prisma.user.update({
          data: { lastLogin: new Date() },
          where: { email },
        });
      } catch {
        userProfile = undefined;
      }
      let accountStatus: BaseRegistrationResponse["userType"] = "old_student";
      if (userProfile) {
        if (emailType === "teacher") {
          accountStatus = "old_teacher";
        }
      } else {
        userProfile = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            pictureUrl,
          },
        });
        if (emailType === "teacher") {
          await prisma.teacher.create({
            data: { id: userProfile.id },
          });
          accountStatus = "new_teacher";
        } else {
          const studentId = email.split("@")[0];
          await prisma.student.create({
            data: { id: userProfile.id, studentId },
          });
          accountStatus = "new_student";
        }
      }

      const expiresIn = 2 * 60 * 60;
      const jwt = jsonwebtoken.sign(
        {
          id: userProfile.id,
          email: userProfile.email,
          userType: emailType === "teacher" ? "teacher" : "student",
        },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          subject: userProfile.id.toString(),
          expiresIn: expiresIn,
        }
      );
      return { jwt, userType: accountStatus, expiresIn };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

@Resolver()
class CurrentUserResolver {
  @Query(() => CurrentUser, { nullable: true })
  async currentUser(
    @Ctx() { prisma, user: jwtUserInfo }: AuthenticatedGraphQLContext
  ): Promise<CurrentUser | null> {
    if (jwtUserInfo) {
      const { id } = jwtUserInfo;
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          pictureUrl: true,
        },
      });
      return user;
    }
    return null;
  }
}

export const authResolvers = [RegisterResolver, CurrentUserResolver];

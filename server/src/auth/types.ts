import { Field, ObjectType } from "type-graphql";
import { Student, Teacher } from "../../prisma/generated/type-graphql";
import { GraphQLContext } from "../types";

@ObjectType()
export class BaseRegistrationResponse {
  @Field()
  jwt: string;

  @Field()
  expiresIn: number;

  @Field()
  userType: "new_teacher" | "old_teacher" | "new_student" | "old_student";
}

@ObjectType()
export class TeacherRegistrationResponse extends BaseRegistrationResponse {
  @Field()
  userType: "new_teacher" | "old_teacher";
}

@ObjectType()
export class StudentRegistrationResponse extends BaseRegistrationResponse {
  @Field()
  userType: "new_student" | "old_student";
}

@ObjectType()
export class CurrentUser {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  pictureUrl: string;
}

export interface CurrentUserJwtInfo {
  id: string;
  email: string;
  userType: "student" | "teacher";
}
export interface AuthenticatedGraphQLContext extends GraphQLContext {
  user: CurrentUserJwtInfo | null;
}

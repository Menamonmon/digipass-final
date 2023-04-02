import { Max, Min } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  Classroom as ShallowClassroom,
  Pass,
  Student,
  StudentsOnClassrooms,
  User,
} from "../../prisma/generated/type-graphql";

@InputType()
export class TeacherClassroomUpdateInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Max(24)
  @Min(0)
  startHour?: number;

  @Field({ nullable: true })
  @Max(24)
  @Min(0)
  endHour?: number;

  @Field({ nullable: true })
  @Max(60)
  @Min(0)
  startMinute?: number;

  @Field({ nullable: true })
  @Max(60)
  @Min(0)
  endMinute?: number;
}

@ObjectType()
export class FullStudent extends Student {
  @Field((type) => User)
  userProfile: User;

  @Field((type) => [Pass])
  passes: Pass[];
}

@ObjectType()
export class CompleteStudent extends Student {
  @Field((type) => User)
  userProfile: User;
}

@ObjectType()
export class UpdateMany {
  @Field((type) => Int)
  count: number;
}

@ObjectType()
export class FullPass extends Pass {
  @Field((type) => CompleteStudent)
  student: CompleteStudent;
}

@ObjectType()
export class StudentsOnClassroomsWithAssociatedStudent extends StudentsOnClassrooms {
  @Field((type) => FullStudent)
  student: FullStudent;
}

@ObjectType({})
export class FullClassroom extends ShallowClassroom {
  @Field((type) => [Pass])
  passes?: Pass[];

  @Field((type) => [FullStudent])
  students?: FullStudent[];
}

@ObjectType()
export class LimitedClassroom {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description?: string;

  @Field()
  startHour: number;

  @Field()
  startMinute: number;

  @Field()
  endHour: number;

  @Field()
  endMinute: number;

  @Field()
  classCode: string;

  @Field()
  teacherId: string;
}

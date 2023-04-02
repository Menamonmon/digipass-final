export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
}

export type AuthUserType =
  | "not_authenticated"
  | "new_student"
  | "old_student"
  | "new_teacher"
  | "old_teacher";

import React, { useState } from "react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { ClassroomStudentsTab_teacherClassroom$key } from "./__generated__/ClassroomStudentsTab_teacherClassroom.graphql";
import { AddStudentModal } from "./AddStudentModal";
import { useRouter } from "next/router";

const classroomStudentsFragment = graphql`
  fragment ClassroomStudentsTab_teacherClassroom on FullStudent
  @relay(plural: true) {
    userProfile {
      id
      firstName
      lastName
      email
      pictureUrl
    }
  }
`;
interface ClassroomStudentsTabProps {
  students: ClassroomStudentsTab_teacherClassroom$key;
}

export const ClassroomStudentsTab: React.FC<ClassroomStudentsTabProps> = ({
  students,
}) => {
  const data = useFragment(classroomStudentsFragment, students);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const classroomId = router.query.classroomId;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={handleOpen}>
        Add Student
      </button>
      <AddStudentModal
        classroomId={(classroomId as string) ?? ""}
        open={open}
        onClose={handleClose}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

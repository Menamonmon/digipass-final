import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { ClassroomPassesTab_teacherClassroom$key } from "./__generated__/ClassroomPassesTab_teacherClassroom.graphql";

const classroomPassesFragment = graphql`
  fragment ClassroomPassesTab_teacherClassroom on Pass @relay(plural: true) {
    id
    reason
    createdAt
    approved
    startTime
    endTime
    duration
    studentId
  }
`;

interface ClassroomPassesTabProps {
  passes: ClassroomPassesTab_teacherClassroom$key;
}

export const ClassroomPassesTab: React.FC<ClassroomPassesTabProps> = ({
  passes,
}) => {
  const data = useFragment(classroomPassesFragment, passes);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

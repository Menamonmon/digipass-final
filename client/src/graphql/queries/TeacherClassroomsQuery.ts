import { graphql } from "relay-runtime";

export const TeacherClassroomsQuery = graphql`
  query TeacherClassroomsQuery {
    teacherClassrooms {
      id
      title
      description
      classCode
      createdAt
      archived
      startHour
      startMinute
      endHour
      endMinute
    }
  }
`;

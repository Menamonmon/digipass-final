import { graphql } from "react-relay";
export const ArchiveClassroomMutation = graphql`
  mutation ArchiveClassroomMutation($classroomId: String!) {
    archiveClassroom(classroomId: $classroomId) {
      id
    }
  }
`;

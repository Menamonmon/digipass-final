import React from "react";
import StudentLookupItem, { Student } from "./StudentLookupItem";
import { AddStudentModalQuery$data } from "./__generated__/AddStudentModalQuery.graphql";

interface StudentLookupListProps {
  onChoose: (chosenStudent: Student) => void;
  students: readonly Student[];
}

const StudentLookupList: React.FC<StudentLookupListProps> = ({
  onChoose,
  students,
}) => {
  return (
    <div className="flex flex-col overflow-y-scroll bg-white rounded-lg max-h-40">
      {students.map((student, idx) => (
        <StudentLookupItem
          {...student}
          key={idx}
          onClick={() => {
            onChoose(student);
          }}
        />
      ))}
    </div>
  );
};

export default StudentLookupList;

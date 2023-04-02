import Image from "next/image";
import React from "react";
import { AddStudentModalQuery$data } from "./__generated__/AddStudentModalQuery.graphql";

export type Student = AddStudentModalQuery$data["searchStudents"][0];

const StudentLookupItem: React.FC<Student & { onClick: () => void }> = ({
  email,
  firstName,
  lastName,
  pictureUrl,
  onClick,
  id,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between px-3 py-1 text-black border-t border-black hover:cursor-pointer hover:bg-gray-200"
    >
      <div>
        <p className="text-sm">
          {firstName} {lastName}
        </p>
        <p className="text-xs">{email}</p>
      </div>
      <Image
        src={pictureUrl}
        width="50px"
        height="50px"
        className="rounded-full"
      />
    </div>
  );
};

export default StudentLookupItem;

import { Modal } from "@mui/material";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { toast } from "react-toastify";
import { graphql } from "relay-runtime";
import { Student } from "./StudentLookupItem";
import StudentLookupList from "./StudentLookupList";
import { AddStudentModalMutation } from "./__generated__/AddStudentModalMutation.graphql";
import {
  AddStudentModalQuery,
  AddStudentModalQuery$data,
} from "./__generated__/AddStudentModalQuery.graphql";

interface AddStudentModalProps {
  open: boolean;
  classroomId: string;
  onClose: () => void;
}

const searchStudentsQuery = graphql`
  query AddStudentModalQuery($query: String) {
    searchStudents(query: $query) {
      id
      firstName
      lastName
      email
      pictureUrl
    }
  }
`;

const addStudentToClassroomMutation = graphql`
  mutation AddStudentModalMutation($studentId: String!, $classroomId: String!) {
    addStudentToClassroom(studentId: $studentId, classroomId: $classroomId) {
      classroomId
      assignedAt
      student {
        userProfile {
          id
          firstName
          lastName
          email
          pictureUrl
        }
      }
    }
  }
`;

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  open,
  onClose,
  classroomId,
}) => {
  const [query, setQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<
    undefined | AddStudentModalQuery$data["searchStudents"][0]
  >();
  const [searchStudentsArgs, setSearchStudentsArgs] = useState({
    options: { fetchKey: 0 },
    variables: { query: "" },
  });

  const { searchStudents } = useLazyLoadQuery<AddStudentModalQuery>(
    searchStudentsQuery,
    searchStudentsArgs.variables,
    searchStudentsArgs.options
  );

  const [addStudent, addingStudent] = useMutation<AddStudentModalMutation>(
    addStudentToClassroomMutation
  );

  const refetch = useCallback(() => {
    setSearchStudentsArgs((prev) => ({
      options: {
        fetchKey: (prev?.options.fetchKey ?? 0) + 1,
      },
      variables: { query },
    }));
  }, [query]);

  const handleStudentChosen = (student: Student) => {
    setSelectedStudent(student);
    setQuery("");
  };

  const handleSubmit = () => {
    if (selectedStudent?.id && classroomId) {
      addStudent({
        variables: { studentId: selectedStudent.id, classroomId },
        updater: (store, data) => {
          const { addStudentToClassroom } = data;

          if (addStudentToClassroom) {
            const existing = store.get(addStudentToClassroom.classroomId);
            const currentStudentsList = existing?.getLinkedRecords("students");
            const newStudent = store
              .getRootField("addStudentToClassroom")
              ?.getLinkedRecord("student");

            if (newStudent && currentStudentsList) {
              currentStudentsList.unshift(newStudent);
              existing?.setLinkedRecords(currentStudentsList, "students");
            }
          }
        },
      });
      onClose();
    } else {
      toast("Error: Invalid classroomId or studentId", { type: "error" });
    }
  };

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="inline-flex flex-col w-full h-full">
        <div className="flex flex-col justify-between w-1/2 p-5 m-auto rounded-lg shadow-lg bg-zinc-700 h-1/2">
          <h4>Add A Student</h4>
          {/* Modal Content */}
          <div className="h-72">
            <input
              className="w-full input"
              placeholder="Lookup a student by name or email....."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <StudentLookupList
              students={searchStudents}
              onChoose={handleStudentChosen}
            />
            <div>
              {selectedStudent ? (
                <>
                  <h5>Selected Student:</h5>
                  <div className="flex items-center justify-between px-3">
                    <div>
                      <p>
                        {selectedStudent.firstName} {selectedStudent.lastName} (
                        {selectedStudent.email})
                      </p>
                    </div>
                    <Image
                      src={selectedStudent.pictureUrl}
                      width="50px"
                      height="50px"
                      className="rounded-full"
                    />
                  </div>
                </>
              ) : (
                <h5>No Student Selected!</h5>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-end gap-3">
            <button className="btn" onClick={onClose}>
              Close
            </button>
            <button
              className="btn"
              onClick={handleSubmit}
              disabled={!selectedStudent || addingStudent}
            >
              {addingStudent ? "Adding...." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddStudentModal;

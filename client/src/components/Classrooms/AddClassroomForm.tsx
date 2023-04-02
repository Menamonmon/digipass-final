import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-relay";
import { toast } from "react-toastify";
import { graphql } from "relay-runtime";
import useAuth from "../../hooks/useAuth";
import { hourValidator, minuteValidator } from "../../utils";
import InputField from "../Utils/InputField";
import {
  ClassroomCreateInput,
  AddClassroomFormMutation,
} from "./__generated__/AddClassroomFormMutation.graphql";
import { IoChevronBack } from "react-icons/io5";

const addClassroomMutation = graphql`
  mutation AddClassroomFormMutation($data: ClassroomCreateInput!) {
    createOneClassroom(data: $data) {
      id
      title
      startHour
      startMinute
    }
  }
`;

const initialClassroom: ClassroomCreateInput = {
  title: "",
  description: undefined,
  teacher: { connect: { id: null } },
  endHour: 0,
  endMinute: 0,
  startHour: 0,
  startMinute: 0,
};

const AddClassroomForm: React.FC = () => {
  const [classroom, setClassroom] =
    useState<NonNullable<ClassroomCreateInput>>(initialClassroom);
  const [addClassroom, addingClassroom] =
    useMutation<AddClassroomFormMutation>(addClassroomMutation);
  const router = useRouter();

  const { userProfile } = useAuth();

  const isClassroomValid = (classroom: ClassroomCreateInput) => {
    const {
      title,
      startMinute,
      endMinute,
      startHour,
      endHour,
      teacher: { connect },
    } = classroom;
    return (
      minuteValidator(endMinute) &&
      minuteValidator(startMinute) &&
      hourValidator(startHour) &&
      hourValidator(endHour) &&
      title.length !== 0 &&
      userProfile !== undefined &&
      userProfile.id &&
      connect?.id
    );
  };

  const handleUpdate = (value: string | number, fieldName: string) => {
    setClassroom((prev) => ({
      ...prev,
      [fieldName]: value,
      teacher: { connect: { id: userProfile?.id || null } },
    }));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (isClassroomValid(classroom)) {
      addClassroom({
        variables: { data: classroom },
        onError(error) {
          toast("An error has occurred while submitting your classroom.", {
            type: "error",
          });
          console.log(error);
        },
        onCompleted(response, errors) {
          setClassroom(initialClassroom);
          toast("Classroom added successfully", {
            type: "success",
            autoClose: false,
            closeButton: ({ closeToast, theme, type }) => (
              <button
                className="inline-flex items-center justify-center btn btn-sm"
                onClick={(e) => {
                  router.push("/teacher/classrooms/");
                  closeToast(e);
                }}
              >
                <IoChevronBack /> Classrooms
              </button>
            ),
          });
        },
      });
    } else {
      toast("Please check the classroom fields before submitting!", {
        type: "error",
      });
    }
    return false;
  };

  const commonInputClasses = "ring rounded-lg";
  return (
    <div className="flex flex-col gap-5 my-5">
      <h5>Create a Classroom</h5>
      <form className="flex flex-col gap-5 my-5" onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <h4>Title:</h4>
          <InputField
            className={clsx("h4", commonInputClasses)}
            name="title"
            disabled={addingClassroom}
            onUpdate={handleUpdate}
            value={classroom["title"]}
            required
          />
        </div>
        <div className="flex gap-2">
          <p>Description:</p>
          <InputField
            className={clsx("max-w-xs min-h-16", commonInputClasses)}
            name="description"
            disabled={addingClassroom}
            onUpdate={handleUpdate}
            value={classroom["description"]}
            component="textarea"
          />
        </div>
        <div className="flex justify-between w-1/2">
          <div className="flex gap-2">
            <p>Start Time:</p>
            <div className="flex gap-2">
              <InputField
                className={clsx("w-5", commonInputClasses)}
                name="startHour"
                disabled={addingClassroom}
                onUpdate={handleUpdate}
                value={classroom["startHour"]}
                isValid={hourValidator}
                type="int"
                required
              />
              <InputField
                className={clsx("w-5", commonInputClasses)}
                name="startMinute"
                disabled={addingClassroom}
                onUpdate={handleUpdate}
                value={classroom["startMinute"]}
                isValid={minuteValidator}
                type="int"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <p>End Time:</p>
            <div className="flex gap-2">
              <InputField
                className={clsx("w-5", commonInputClasses)}
                name="endHour"
                disabled={addingClassroom}
                onUpdate={handleUpdate}
                value={classroom["endHour"]}
                isValid={hourValidator}
                type="int"
                required
              />
              <InputField
                className={clsx("w-5", commonInputClasses)}
                name="endMinute"
                disabled={addingClassroom}
                onUpdate={handleUpdate}
                value={classroom["endMinute"]}
                isValid={minuteValidator}
                type="int"
                required
              />
            </div>
          </div>
        </div>
        <button
          className="btn"
          disabled={!isClassroomValid(classroom) || addingClassroom}
        >
          {addingClassroom ? "Creating classroom..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddClassroomForm;

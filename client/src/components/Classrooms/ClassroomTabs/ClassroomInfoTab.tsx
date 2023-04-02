import React from "react";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { useFragment, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import { hourValidator, minuteValidator } from "../../../utils";
import { Editable } from "../../Utils/Editable";
import CopyButton from "../../Utils/CopyButton";
import Switch from "../../Utils/Switch";
import { ClassroomInfoTab_teacherClassroom$key } from "./__generated__/ClassroomInfoTab_teacherClassroom.graphql";
import { ClassroomInfoTab_updateClassroomMutation } from "./__generated__/ClassroomInfoTab_updateClassroomMutation.graphql";

import { ArchiveClassroomMutation } from "../../../graphql/mutations/ArchiveClassroomMutation";
import { ArchiveClassroomMutation as ArchiveClassroomMutationType } from "../../../graphql/mutations/__generated__/ArchiveClassroomMutation.graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PassQueue from "../../Passes/PassQueue";

const classroomInfoFragment = graphql`
  fragment ClassroomInfoTab_teacherClassroom on FullClassroom {
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
`;

const updateClassroomMutation = graphql`
  mutation ClassroomInfoTab_updateClassroomMutation(
    $data: TeacherClassroomUpdateInput!
    $classroomId: String!
  ) {
    updateClassroom(data: $data, classroomId: $classroomId) {
      id
    }
  }
`;

interface ClassroomTabInfoProps {
  classroomInfo: ClassroomInfoTab_teacherClassroom$key;
}

export const ClassroomInfoTab: React.FC<ClassroomTabInfoProps> = ({
  classroomInfo,
}) => {
  const router = useRouter();

  const data = useFragment(classroomInfoFragment, classroomInfo);
  const [commitUpdate, isUpdating] =
    useMutation<ClassroomInfoTab_updateClassroomMutation>(
      updateClassroomMutation
    );

  const [commitClassArchive, isArchivingClass] =
    useMutation<ArchiveClassroomMutationType>(ArchiveClassroomMutation);
  const archive = () => {
    commitClassArchive({
      variables: { classroomId: data.id },
      onCompleted(response, errors) {
        if (response.archiveClassroom) {
          toast("Successfully archived class", {
            autoClose: 1000,
            type: "success",
          });
        }

        if (errors) {
          toast(
            "An error occurred while trying to archive the classroom. Try again later",
            {
              autoClose: 2000,
              type: "error",
            }
          );
        }
      },
    });
  };

  const handleUpdate = (newValue: string | number, name: string) => {
    commitUpdate({
      variables: {
        classroomId: data.id,
        data: { [name]: newValue },
      },
      updater: (store, data) => {
        const { updateClassroom } = data;

        if (updateClassroom) {
          const existing = store.get(updateClassroom.id);
          existing?.setValue(newValue, name);
        }
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 my-5">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <p className="h4">Title:</p>
          <Editable
            className="h4"
            name="title"
            disabled={isUpdating}
            onUpdate={handleUpdate}
            required
          >
            {data.title}
          </Editable>
        </div>
        <div className="flex items-center justify-center gap-2 p-1 rounded-lg ring">
          Class Code: {data.classCode}
          <CopyButton value={data.classCode} />
        </div>
        <div className="flex items-center justify-center gap-2">
          Archived:{" "}
          <Switch
            value={!data.archived}
            activeIcon={<HiLockOpen />}
            inactiveIcon={<HiLockClosed />}
            disabled={isArchivingClass}
            switchCallback={() => {
              archive();
              router.reload();
            }}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <p>Description:</p>
        <Editable
          disabled={isUpdating}
          onUpdate={handleUpdate}
          className="max-w-xs min-h-16"
          name="description"
          inputComponent="textarea"
        >
          {data.description?.trim()
            ? data.description
            : "No description provided"}
        </Editable>
      </div>
      <div className="flex justify-between w-1/2">
        <div className="flex gap-2">
          <p>Start Time:</p>
          <div className="flex">
            <Editable
              className="w-5"
              disabled={isUpdating}
              onUpdate={handleUpdate}
              type="int"
              name="startHour"
              isValid={hourValidator}
            >
              {data.startHour.toString().padStart(2, "0")}
            </Editable>
            :
            <Editable
              className="w-5"
              disabled={isUpdating}
              onUpdate={handleUpdate}
              name="startMinute"
              type="int"
              isValid={minuteValidator}
            >
              {data.startMinute.toString().padStart(2, "0")}
            </Editable>
          </div>
        </div>
        <div className="flex gap-2">
          <p>End Time:</p>
          <div className="flex">
            <Editable
              className="w-5"
              disabled={isUpdating}
              onUpdate={handleUpdate}
              type="int"
              name="endHour"
              isValid={hourValidator}
            >
              {data.endHour.toString().padStart(2, "0")}
            </Editable>
            :
            <Editable
              className="w-5"
              disabled={isUpdating}
              onUpdate={handleUpdate}
              name="endMinute"
              type="int"
              isValid={minuteValidator}
            >
              {data.endMinute.toString().padStart(2, "0")}
            </Editable>
          </div>
        </div>
      </div>
    </div>
  );
};

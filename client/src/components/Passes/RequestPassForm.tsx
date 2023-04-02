import { useState } from "react";
import React from "react";
import InputField, { InputFieldProps } from "../Utils/InputField";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";
import { graphql } from "relay-runtime";
import { useRouter } from "next/router";
import { useMutation } from "react-relay";
import { RequestPassFormMutation } from "./__generated__/RequestPassFormMutation.graphql";
import { toast } from "react-toastify";
import { useSockets } from "../../hooks/useSockets";

type RequestPassFormInput = {
  reason: string;
  duration: number;
};

const requestPassMutation = graphql`
  mutation RequestPassFormMutation(
    $classroomId: String!
    $reason: String!
    $duration: Int!
  ) {
    studentCreatePass(
      classroomId: $classroomId
      reason: $reason
      duration: $duration
    ) {
      id
      studentId
      issuerId
      reason
      duration
      classroomId
    }
  }
`;

const RequestPassForm: React.FC<{ classroomId: string }> = ({
  classroomId,
}) => {
  const router = useRouter();
  const { userProfile } = useAuth();
  const [passRequest, setPassRequest] = useState<
    NonNullable<RequestPassFormInput>
  >({ reason: "", duration: 0 });

  const { socket, initializeSocket, placeStudentInClassroom } = useSockets(
    (approvedPassId: string) => {
      router.push("/student/pass-countdown", {
        query: { passId: approvedPassId },
      });
    },
    (rejectedPassId: string) => {
      router.push("/student/pending-pass", { query: { rejected: true } });
    },
    () => {}
  );

  const [requestPass, requestingPass] =
    useMutation<RequestPassFormMutation>(requestPassMutation);

  const validatePassRequest = () => {
    return true;
  };
  const handleUpdate: InputFieldProps["onUpdate"] = (value, fieldName) => {
    console.log(value, fieldName);
    setPassRequest((prev) => ({ ...prev, [fieldName]: value }));
  };
  const name = userProfile?.firstName + " " + userProfile?.lastName;

  const onSubmit = async () => {
    const { duration, reason } = passRequest;
    if (socket) {
      alert("You already created a pass!");
      return;
    }
    await requestPass({
      variables: { duration, reason, classroomId },
      onCompleted: ({ studentCreatePass }) => {
        if (studentCreatePass) {
          const { classroomId, issuerId, id: passId } = studentCreatePass;
          initializeSocket((newSocket) => {
            placeStudentInClassroom({
              classroomId,
              teacherId: issuerId,
              passId,
            });
          });
          router.push("/student/pending-pass");
        } else {
          toast(
            "Failed to request a pass please reload and check your inputs and try again later!"
          );
        }
      },
    });
  };

  return (
    <div className="flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-blue-300 to-blue-600 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Request a Hall Pass</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <div className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600">
                    {name}
                  </div>

                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Name
                  </label>
                </div>

                <div className="relative">
                  <InputField
                    className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                    name="reason"
                    disabled={requestingPass}
                    onUpdate={handleUpdate}
                    value={passRequest.reason}
                    isValid={validatePassRequest}
                    type="string"
                    required
                  />
                  <label
                    htmlFor="reason"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Reason
                  </label>
                </div>
                <div className="relative">
                  <InputField
                    className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                    name="duration"
                    disabled={requestingPass}
                    onUpdate={handleUpdate}
                    value={passRequest.duration}
                    isValid={validatePassRequest}
                    errorMessage="Please choose a duration between 1 mins and 30 mins."
                    type="int"
                    required
                  />
                  <label
                    htmlFor="time"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Enter duration (in minutes)
                  </label>
                </div>
                <div className="flex justify-between">
                  <div className="relative">
                    <button
                      onClick={onSubmit}
                      className="px-2 py-1 text-white bg-blue-500 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="relative">
                    <Link
                      href={`/student/classrooms/${classroomId}`}
                      className="px-2 py-1 text-white bg-red-500 rounded-md"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPassForm;

import React from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import { PassQueueItemQuery } from "./__generated__/PassQueueItemQuery.graphql";
import { useSockets } from "../../hooks/useSockets";
import { PassQueueItemMutation } from "./__generated__/PassQueueItemMutation.graphql";

interface Props {
  passId: string;
}

const getPassQuery = graphql`
  query PassQueueItemQuery($passId: String!) {
    teacherGetPass(passId: $passId) {
      id
      reason
      duration
      student {
        userProfile {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const updatePassMutation = graphql`
  mutation PassQueueItemMutation($approved: Boolean!, $passId: String!) {
    teacherUpdatePass(approved: $approved, passId: $passId) {
      count
    }
  }
`;

const PassQueueItem: React.FC<Props> = ({ passId }) => {
  const { teacherGetPass } = useLazyLoadQuery<PassQueueItemQuery>(
    getPassQuery,
    { passId }
  );

  const [updatePass, updatingPass] =
    useMutation<PassQueueItemMutation>(updatePassMutation);

  const { socket } = useSockets(
    () => {},
    () => {},
    () => {}
  );

  return teacherGetPass ? (
    <div className="flex flex-col gap-3 p-5 rounded-lg bg-slate-500">
      <div>
        Pass Request From: {teacherGetPass.student.userProfile.firstName}{" "}
        {teacherGetPass.student.userProfile.lastName}
      </div>
      <div>Duration: {teacherGetPass.duration}</div>
      <div>Reason: {teacherGetPass.reason}</div>

      <div className="flex flex-row justify-between">
        <button
          className="bg-green-500 btn btn-sm"
          disabled={updatingPass}
          onClick={() => {
            updatePass({
              variables: { approved: true, passId },
              onCompleted: (res) => {
                console.log(res);
                console.log(passId);
                if (res.teacherUpdatePass) {
                  socket.emit(
                    "teacher-approved-pass",
                    JSON.stringify({
                      passId,
                      studentId: teacherGetPass.student.userProfile.id,
                    })
                  );
                } else {
                  alert("REQUEST FAILED");
                }
              },
            });
          }}
        >
          Approve
        </button>
        <button disabled={updatingPass} className="bg-red-500 btn btn-sm">
          Deny
        </button>
      </div>
    </div>
  ) : (
    <>INVALID ID</>
  );
};

export default PassQueueItem;

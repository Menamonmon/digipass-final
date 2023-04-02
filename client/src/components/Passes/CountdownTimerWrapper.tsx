import React from "react";
import CountdownTimer from "./CountdownTimer";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";

// const getPassQuery = graphql`
//   query CountdownTimerWrapperQuery($passId: String!) {
//     teacherGetPass(passId: $passId) {
//       id
//       reason
//       duration
//       student {
//         userProfile {
//           id
//           firstName
//           lastName
//         }
//       }
//     }
//   }
// `;

const CountdownTimerWrapper: React.FC<{ passId: string }> = ({ passId }) => {
  //   const data = useLazyLoadQuery(getPassQuery, { passId });
  const studentName = "Michael";
  const durationinMinutes = 15;
  const reason = "Bathroom";
  return (
    <div className="flex flex-col justify-center pt-20 text-center">
      <div className="flex justify-center font-sans text-4xl hover:font-serif">
        Hello, {studentName}. You are alloted for {durationinMinutes} of Hall
        Pass for {reason}.
      </div>
      <div className="flex justify-center pt-10 font-sans text-2xl hover:font-serif">
        Time Left:
      </div>
      <div className="flex justify-center pt-10">
        <CountdownTimer duration={durationinMinutes} />
      </div>
    </div>
  );
};

export default CountdownTimerWrapper;

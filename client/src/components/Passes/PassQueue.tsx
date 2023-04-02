import React from "react";
import PassQueueItem from "./PassQueueItem";

interface PassQueueProps {
  passIds: string[];
}

const PassQueue: React.FC<PassQueueProps> = ({ passIds }) => {
  return (
    <div className="flex flex-col">
      <h4 className="my-5">Pass Request Queue</h4>
      <div className="flex flex-row">
        {passIds.map((passId) => (
          <PassQueueItem passId={passId} />
        ))}
      </div>
      {passIds.length === 0 && <div>No pending students in the queue</div>}
    </div>
  );
};

export default PassQueue;

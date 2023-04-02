import React from "react";

interface AddStudentToClassroomModalProps {}

const AddStudentToClassroomModal: React.FC<
  AddStudentToClassroomModalProps
> = () => {
  return (
    <div className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">
          Congratulations random Internet user!
        </h3>
        <p className="py-4">
          You've been selected for a chance to get one year of subscription to
          use Wikipedia for free!
        </p>
        <div className="modal-action">
          <label htmlFor="add-classroom-input-modal" className="btn">
            Yay!
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddStudentToClassroomModal;

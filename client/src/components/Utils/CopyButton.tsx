import React, { useCallback } from "react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

interface CopyButtonProps {
  value: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value }) => {
  const notifyOfSuccessfulCopy = () =>
    toast("Copied", {
      autoClose: 500,
      type: "success",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const copyClassCodeToClipboard = useCallback(async () => {
    navigator.clipboard.writeText(value).then(notifyOfSuccessfulCopy);
  }, [value]);

  return (
    <button
      className="flex items-center text-xl btn btn-circle btn-sm tooltip"
      data-tip="Copy this!"
      onClick={copyClassCodeToClipboard}
    >
      <MdContentCopy />
    </button>
  );
};

export default CopyButton;

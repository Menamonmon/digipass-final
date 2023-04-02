import React, { useCallback } from "react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

interface SwitchProps {
  value: boolean;
  activeIcon: React.ReactElement;
  inactiveIcon: React.ReactElement;
  switchCallback: () => void;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  disabled,
  activeIcon,
  inactiveIcon,
  switchCallback,
}) => {
  return (
    <button
      className="flex items-center text-xl btn btn-circle btn-sm"
      disabled={disabled}
      onClick={switchCallback}
    >
      {value ? activeIcon : inactiveIcon}
    </button>
  );
};

export default Switch;

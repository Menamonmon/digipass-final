import clsx from "clsx";
import { parse } from "path";
import React, { useEffect, useRef, useState } from "react";

export interface InputFieldProps {
  value: string | number | undefined | null;
  name: string;
  onUpdate: (value: string | number, fieldName: string) => void;
  disabled: boolean;
  required?: boolean;
  className?: string;
  component?: React.ElementType;
  isValid?: (value: string | number) => boolean;
  errorMessage?: string;
  type?: "string" | "int" | "float";
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  onUpdate,
  disabled,
  className,
  required,
  value = undefined,
  component: InputComponent = "input",
  isValid = () => true,
  errorMessage,
  type = "string",
}) => {
  const inputRef = useRef();

  const [outOfFocus, setOutOfFocus] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const evalErrors = (parsedValue: string | number) => {
    setErrors([]);
    if (Number.isNaN(parsedValue)) {
      if ((type === "float" || type === "int") && parsedValue !== "") {
        setErrors((prev) => [...prev, `${value} is not a number!`]);
      }
    }

    if (
      required &&
      typeof parsedValue === "string" &&
      parsedValue.trim() === ""
    ) {
      setErrors((prev) => [...prev, `This field is required!`]);
    }

    try {
      if (!isValid(parsedValue)) {
        setErrors((prev) => [...prev, errorMessage || "Invalid value"]);
      }
    } catch (err) {
      setErrors((prev) => [...prev, errorMessage || "Invalid value"]);
    }
  };

  useEffect(() => {
    evalErrors(value || "");
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    let parsedValue =
      type === "float"
        ? parseFloat(value)
        : type === "int"
        ? parseInt(value)
        : value;
    setErrors([]);
    if (Number.isNaN(parsedValue)) {
      parsedValue = value;
      if ((type === "float" || type === "int") && parsedValue !== "") {
        setErrors((prev) => [...prev, `${value} is not a number!`]);
      }
    }

    if (required && value.trim() === "") {
      setErrors((prev) => [...prev, `This field is required!`]);
    }

    try {
      if (!isValid(parsedValue)) {
        setErrors((prev) => [...prev, errorMessage || "Invalid value"]);
      }
    } catch (err) {
      setErrors((prev) => [...prev, errorMessage || "Invalid value"]);
    }

    onUpdate(parsedValue, name);
  };

  return (
    <div
      className={
        errors.length > 0 && outOfFocus
          ? "tooltip tooltip-error tooltip-open"
          : ""
      }
      data-tip={errors.join(" ")}
    >
      <InputComponent
        onFocus={() => {
          setOutOfFocus(false);
        }}
        onBlur={() => {
          setOutOfFocus(true);
        }}
        disabled={disabled}
        className={clsx("bg-inherit caret whitespace-pre-wrap", className)}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default InputField;

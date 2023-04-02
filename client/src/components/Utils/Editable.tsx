import clsx from "clsx";
import { parse } from "node:path/win32";
import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useOutsideClick } from "../../hooks/useOutsideClick";

interface EditableProps {
  name: string;
  onUpdate: (value: string | number, fieldName: string) => void;
  children: string;
  disabled: boolean;
  required?: boolean;
  className?: string;
  inputComponent?: React.ElementType;
  isValid?: (value: string | number) => boolean;
  type?: "string" | "int" | "float";
}

export const Editable: React.FC<EditableProps> = ({
  children,
  name,
  onUpdate,
  disabled,
  className,
  required,
  inputComponent: InputComponent = "input",
  isValid = () => true,
  type = "string",
}) => {
  const [inFocus, setInFocus] = useState(false);
  const [value, setValue] = useState<string | number>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isNotEmpty = (value: string | number) => {
    return required ? value.toString() !== "" : true;
  };

  const handleOutsideClick = () => {
    setInFocus(false);
  };

  const handleInsideClick = () => {
    setInFocus(true);
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e?.preventDefault();
    if (isNotEmpty(value) && isValid(value)) {
      onUpdate(value, name);
      setInFocus(false);
    } else {
      toast("Invalid input or you can't leave the field empty", {
        type: "error",
      });
    }
    return false;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    let parsedValue =
      type === "float"
        ? parseFloat(value)
        : type === "int"
        ? parseInt(value)
        : value;
    if (Number.isNaN(parsedValue)) parsedValue = "";
    setValue(parsedValue);
  };

  const handleControlEnterPress: KeyboardEventHandler = (e) => {
    if (
      (e.metaKey || e.ctrlKey) &&
      e.key === "Enter" &&
      InputComponent === "textarea"
    ) {
      handleSubmit(e);
    }
  };

  useOutsideClick(inputRef, handleOutsideClick);

  useEffect(() => {
    if (inFocus) {
      setValue(children);
    }
  }, [inFocus]);

  useEffect(() => {
    setValue(children);
  }, [children]);

  return inFocus ? (
    <div
      className={InputComponent === "textarea" ? "tooltip tooltip-open" : ""}
      data-tip="Save: ⌘ + Enter (Mac) or Ctrl + Enter (Win.)"
    >
      <form onSubmit={handleSubmit} className={clsx("flex", className)}>
        <InputComponent
          disabled={disabled}
          ref={inputRef}
          className={clsx(className, "bg-inherit caret whitespace-pre-wrap")}
          value={value}
          onChange={handleChange}
          onClick={handleInsideClick}
          onKeyDown={handleControlEnterPress}
          autoFocus
        />
      </form>
    </div>
  ) : (
    <div
      onClick={handleInsideClick}
      className={className}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};

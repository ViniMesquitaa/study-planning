import type { ChangeEvent, ReactNode } from "react";
import { Input } from "@/components/ui/input";

interface InputTextUIProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "password" | "email" | "number";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
  name?: string;
  children?: ReactNode;
  autoComplete?: string;
  error?: string;
  id?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

const InputTextUI: React.FC<InputTextUIProps> = ({
  type,
  onChange,
  placeholder,
  value,
  name,
  children,
  autoComplete = "off",
  error,
  id,
  inputRef,
  ...props
}) => {
  return (
    <div className="space-y-2 w-full">
      <div className="relative w-full">
        {children && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 z-10">
            {children}
          </span>
        )}

        <Input
          id={id}
          ref={inputRef}
          name={name}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          {...props}
          className={error ? "border-red-500" : ""}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputTextUI;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  // adicione ref explícito
  inputRef?: React.Ref<HTMLInputElement>;
 
}

export const InputField = ({
  id,
  label,
  error,
  inputRef,

  ...props
}: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        {...props}
        ref={inputRef} // aqui repassamos o ref corretamente
        className={error ? "border-red-500" : ""}
      
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

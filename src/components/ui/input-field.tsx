import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const InputField = ({
  id,
  label,
  error,
  success,
  helperText,
  inputRef,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <div className="space-y-2 w-full">
      <Label
        htmlFor={id}
        className="text-sm font-semibold text-foreground"
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          {...props}
          ref={inputRef}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive pr-10",
            success && "border-success focus-visible:ring-success/50 focus-visible:border-success pr-10",
            className
          )}
        />
        {error && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-destructive" />
        )}
        {success && !error && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
        )}
      </div>
      {error && (
        <div className="flex items-start gap-1.5">
          <p className="text-destructive text-sm font-medium flex-1">
            {error}
          </p>
        </div>
      )}
      {helperText && !error && (
        <p className="text-muted-foreground text-sm">
          {helperText}
        </p>
      )}
    </div>
  );
};

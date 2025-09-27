import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";

interface Step3NewPasswordProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const Step3NewPassword = ({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: Step3NewPasswordProps) => (
  <>
    <p className="text-gray-600 font-light text-sm md:text-base text-center mb-6">
      Digite sua nova senha
    </p>

    <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
      <InputField
        id="password"
        label="Nova senha"
        type="password"
        placeholder="Digite sua nova senha"
        onChange={onPasswordChange}
        value={password}
        name="password"
        autoComplete="new-password"
      />

      <InputField
        id="confirmPassword"
        label="Confirmar senha"
        type="password"
        placeholder="Confirme sua nova senha"
        onChange={onConfirmPasswordChange}
        value={confirmPassword}
        name="confirmPassword"
        autoComplete="new-password"
      />

      <Button type="submit" className="w-full">
        Redefinir senha
      </Button>
    </form>
  </>
);

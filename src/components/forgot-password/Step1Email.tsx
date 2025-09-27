import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";

interface Step1EmailProps {
  fullName: string;
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFullNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const Step1Email = ({
  fullName,
  email,
  onEmailChange,
  onFullNameChange,
  onSubmit,
}: Step1EmailProps) => (
  <>
    <p className="text-gray-600 font-light text-sm md:text-base text-center mb-6">
      Digite seu email para receber o código de verificação
    </p>

    <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
      <InputField
        id="fullName"
        label="Nome completo"
        type="text"
        placeholder="Digite seu nome completo"
        onChange={onFullNameChange}
        value={fullName}
        name="fullName"
        autoComplete="off"
      />

      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Digite seu email"
        onChange={onEmailChange}
        value={email}
        name="email"
        autoComplete="off"
      />

      <Button type="submit" className="w-full">
        Enviar código
      </Button>
    </form>
  </>
);

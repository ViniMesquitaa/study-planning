import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
import { GoogleButton } from "@/components/ui/google-button";
import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  studyReason: z.string().min(1, "Por favor selecione uma opção"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const studyReasons = [
  { value: "career", label: "Progressão na carreira" },
  { value: "knowledge", label: "Adquirir conhecimento" },
  { value: "exams", label: "Preparação para exames" },
  { value: "certification", label: "Certificações profissionais" },
  { value: "university", label: "Vestibular/Universidade" },
  { value: "other", label: "Outros motivos" },
];

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);
    // TODO: Implement registration logic
    navigate("/landing");
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
    // TODO: Implement Google OAuth
    navigate("/landing");
  };

  return (
    <AuthFormWrapper
      title="Criar conta"
      subtitle="Comece sua jornada de estudos"
    >
      <div className="space-y-6">
        {/* Google Sign Up Button */}
        <GoogleButton onClick={handleGoogleSignUp}>
          Cadastrar com Google
        </GoogleButton>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Ou
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <InputField
            id="name"
            label="Nome completo"
            placeholder="Digite seu nome completo"
            inputRef={register("name").ref}
            onChange={register("name").onChange}
            onBlur={register("name").onBlur}
            name={register("name").name}
            error={errors.name?.message}
            autoComplete="off"
          />

          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            inputRef={register("email").ref}
            onChange={register("email").onChange}
            onBlur={register("email").onBlur}
            name={register("email").name}
            error={errors.email?.message}
            autoComplete="off"
          />

          <InputField
            id="password"
            label="Senha"
            type="password"
            placeholder="Mínimo 6 caracteres"
            inputRef={register("password").ref}
            onChange={register("password").onChange}
            onBlur={register("password").onBlur}
            name={register("password").name}
            error={errors.password?.message}
            autoComplete="off"
          />

          <SelectField
            id="studyReason"
            label="Por que você quer estudar?"
            value={watch("studyReason") || ""}
            onChange={(value) => setValue("studyReason", value)}
            options={studyReasons}
            error={errors.studyReason?.message}
          />

          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              id="terms"
              required
              className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
            />
            <label htmlFor="terms" className="text-muted-foreground">
              Concordo com os{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Criar Conta
          </Button>
        </form>

        {/* Login Link */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Já tem uma conta? </span>
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Faça login
          </Link>
        </div>
      </div>
    </AuthFormWrapper>
  );
};

export default Register;

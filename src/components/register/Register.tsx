import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { Link } from "react-router-dom";
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

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);
    // Implementar lógica de registro
  };

  return (
    <AuthFormWrapper title="Criar Conta">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <InputField
          id="name"
          label="Nome Completo"
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
          placeholder="Digite seu email"
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
          placeholder="Digite sua senha"
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

        <Button type="submit" className="w-full">
          Criar Conta
        </Button>

        <div className="text-center text-sm mt-4">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </div>
      </form>
    </AuthFormWrapper>
  );
};

export default Register;

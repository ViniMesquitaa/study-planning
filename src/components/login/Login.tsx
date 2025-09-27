import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    navigate("/landing");
  };

  return (
    <AuthFormWrapper title="Login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <InputField
          id="email"
          label="Email"
          placeholder="Digite seu email"
          inputRef={register("email").ref} // repassa o ref para o RHF
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

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <Button type="submit" className="w-full">
          Entrar
        </Button>

        <div className="text-center text-sm mt-4">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </div>
      </form>
    </AuthFormWrapper>
  );
};

export default Login;

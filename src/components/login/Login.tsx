import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { GoogleButton } from "@/components/ui/google-button";
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

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // TODO: Implement Google OAuth
    navigate("/landing");
  };

  return (
    <AuthFormWrapper
      title="Entrar"
      subtitle="Bem-vindo de volta"
    >
      <div className="space-y-6">
        {/* Google Sign In Button */}
        <GoogleButton onClick={handleGoogleLogin} />

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

        {/* Email/Password Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <InputField
            id="email"
            label="Email"
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
            placeholder="••••••••"
            inputRef={register("password").ref}
            onChange={register("password").onChange}
            onBlur={register("password").onBlur}
            name={register("password").name}
            error={errors.password?.message}
            autoComplete="off"
          />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
              />
              <label
                htmlFor="remember"
                className="text-muted-foreground cursor-pointer"
              >
                Lembrar de mim
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-primary hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Entrar
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Não tem uma conta? </span>
          <Link
            to="/register"
            className="text-primary hover:underline font-medium"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </AuthFormWrapper>
  );
};

export default Login;

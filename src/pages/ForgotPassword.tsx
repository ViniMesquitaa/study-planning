import { useState } from "react";
import { Link } from "react-router-dom";

import { Step1Email } from "../components/forgot-password/Step1Email";
import { Step3NewPassword } from "../components/forgot-password/Step3NewPassword";
import { Step2OTP } from "../components/forgot-password/Step2OTP";
import { AuthFormWrapper } from "../components/auth/AuthFormWrapper";

interface ForgotPasswordProps {
  email: string;
  fullName: string;
}

const ForgotPassword = () => {
  const [forgotPasswordUser, setForgotPasswordUser] =
    useState<ForgotPasswordProps>({
      email: "",
      fullName: "",
    });
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Email:", forgotPasswordUser.email);
    console.log("Nome completo:", forgotPasswordUser.fullName);
    setStep(2);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP enviado:", otp);
    setStep(3);
  };

  const handleResendOtp = () => {
    console.log("Reenviar OTP para:", forgotPasswordUser.email);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova senha:", password);
    // Adicionar lógica de redefinição de senha
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Recuperação de senha";
      case 2:
        return "Verificação de código";
      case 3:
        return "Nova senha";
      default:
        return "Recuperação de senha";
    }
  };

  return (
    <AuthFormWrapper title={getStepTitle()}>
      <div className="space-y-4">
        {step === 1 && (
          <Step1Email
            email={forgotPasswordUser.email}
            fullName={forgotPasswordUser.fullName}
            onFullNameChange={(e) =>
              setForgotPasswordUser((prev) => ({
                ...prev,
                fullName: e.target.value,
              }))
            }
            onEmailChange={(e) =>
              setForgotPasswordUser((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            onSubmit={handleSubmit}
          />
        )}

        {step === 2 && (
          <Step2OTP
            email={forgotPasswordUser.email}
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleOtpSubmit}
            onResend={handleResendOtp}
          />
        )}

        {step === 3 && (
          <Step3NewPassword
            password={password}
            confirmPassword={confirmPassword}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
            onSubmit={handlePasswordSubmit}
          />
        )}

        <div className="text-center text-sm mt-6">
          Lembrou da senha?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </div>
      </div>
    </AuthFormWrapper>
  );
};

export default ForgotPassword;

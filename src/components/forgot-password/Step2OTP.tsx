import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";

interface Step2OTPProps {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
}

export const Step2OTP = ({
  email,
  otp,
  setOtp,
  onSubmit,
  onResend,
}: Step2OTPProps) => (
  <>
    <p className="text-gray-600 font-light text-sm md:text-base text-center mb-6">
      Digite o código de 6 dígitos enviado para {email}
    </p>

    <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
      <div className="flex justify-center">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          containerStyle="flex gap-2"
          inputStyle={{
            width: "3rem",
            height: "3rem",
            fontSize: "1.2rem",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            color: "#1f2937",
            backgroundColor: "white",
            outline: "none",
            textAlign: "center",
            transition: "border-color 0.2s ease",
          }}
        />
      </div>

      <Button type="submit" className="w-full">
        Verificar código
      </Button>

      <div className="text-center text-sm">
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={onResend}
        >
          Reenviar código
        </button>
      </div>
    </form>
  </>
);

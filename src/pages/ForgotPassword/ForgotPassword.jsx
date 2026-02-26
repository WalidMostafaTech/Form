import { useState } from "react";
import CheckEmail from "./sections/CheckEmail";
import OTP from "./sections/OTP";
import ResetPassword from "./sections/ResetPassword";
import AuthContainer from "@/components/form/AuthContainer";

const ForgotPassword = () => {
  const steps = [
    {
      id: 1,
      title: "Forget Your Password",
      description: "Enter your email to receive a password reset link.",
    },
    {
      id: 2,
      title: "Check Your Messages",
      description: "Enter the OTP sent to your email to verify your identity.",
    },
    {
      id: 3,
      title: "Reset Your Password",
      description: "Create a new password for your account.",
    },
  ];

  const [step, setStep] = useState(3);

  const goNext = () => {
    if (step >= steps.length) return;
    setStep((prev) => prev + 1);
  };

  const [parentData, setParentData] = useState({});

  return (
    <AuthContainer
      title={steps.find((s) => s.id === step)?.title}
      description={steps.find((s) => s.id === step)?.description}
    >
      {/* Step Content */}
      {step === 1 && (
        <CheckEmail
          setParentData={setParentData}
          parentData={parentData}
          goNext={goNext}
        />
      )}
      {step === 2 && (
        <OTP
          setParentData={setParentData}
          parentData={parentData}
          goNext={goNext}
        />
      )}
      {step === 3 && (
        <ResetPassword setParentData={setParentData} parentData={parentData} />
      )}
    </AuthContainer>
  );
};

export default ForgotPassword;

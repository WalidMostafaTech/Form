import StepProgress from "@/components/common/StepProgress";
import AuthContainer from "@/components/form/AuthContainer";
import { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { useTranslation } from "react-i18next";

const RegisterCompany = () => {
  const { t } = useTranslation();
  const steps = [1, 2, 3];

  const [step, setStep] = useState(1);

  const goNext = () => {
    if (step >= steps.length) return;
    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const [parentData, setParentData] = useState({});

  return (
    <AuthContainer
      title={t("registerCompany.createAccount")}
      description={t("registerCompany.enterDetails")}
    >
      <StepProgress steps={steps} currentStep={step} onStepClick={setStep} />

      {/* Step Content */}
      {step === 1 && (
        <Step1
          setParentData={setParentData}
          parentData={parentData}
          goNext={goNext}
        />
      )}
      {step === 2 && (
        <Step2
          setParentData={setParentData}
          parentData={parentData}
          goNext={goNext}
        />
      )}
      {step === 3 && (
        <Step3 setParentData={setParentData} parentData={parentData} />
      )}
    </AuthContainer>
  );
};

export default RegisterCompany;

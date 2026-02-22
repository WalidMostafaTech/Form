import { useState } from "react";
import CheckEmail from "./sections/CheckEmail";
import ResetPassword from "./sections/ResetPassword";
import OTP from "./sections/OTP";

const ForgotPassword = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parentData, setParentData] = useState({
    email: "",
    otp: "",
    password: "",
    password_confirmation: "",
    reset_token: "",
  });

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <>
      {currentIndex === 0 && (
        <CheckEmail goNext={handleNext} setParentData={setParentData} />
      )}
      {currentIndex === 1 && (
        <OTP
          goNext={handleNext}
          parentData={parentData}
          setParentData={setParentData}
        />
      )}
      {currentIndex === 2 && (
        <ResetPassword parentData={parentData}/>
      )}
    </>
  );
};

export default ForgotPassword;

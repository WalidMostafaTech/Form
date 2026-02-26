import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Link } from "react-router";
import { z } from "zod";

import FormError from "@/components/form/FormError";
import { verifyOtp, resendOtp } from "@/api/forgotPasswordServices";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const OTP = ({ goNext, parentData, setParentData }) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const timerNum = 60;
  const [countdown, setCountdown] = useState(timerNum);

  /* ================== Verify OTP ================== */
  const {
    mutate: verifyOtpMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ code, email }) => verifyOtp({ code, email }),
    onSuccess: (data) => {
      setParentData((prev) => ({
        ...prev,
        otp: getValues("otp"),
        reset_token: data.reset_token,
      }));

      goNext();
    },
  });

  /* ================== Resend OTP ================== */
  const { mutate: resendOtpMutation, isPending: isResending } = useMutation({
    mutationFn: (email) => resendOtp(email),
    onSuccess: () => {
      setCountdown(timerNum);
    },
  });

  /* ================== Countdown ================== */
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  /* ================== Handlers ================== */
  const onSubmit = (data) => {
    verifyOtpMutation({
      code: data.otp,
      email: parentData.email,
    });
  };

  const handleResend = () => {
    resendOtpMutation(parentData.email);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 items-center"
      dir="ltr"
    >
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              containerClassName="justify-center"
            >
              <InputOTPGroup className="gap-2 lg:gap-4">
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="text-xl rounded-full! w-10 h-10 border border-primary bg-white text-black"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {errors.otp && (
              <p className="text-sm text-red-600 text-center">
                {errors.otp.message}
              </p>
            )}
          </div>
        )}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Verifying..." : "Confirm Code"}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        Didn't receive the code?
        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0 || isResending}
          className={`text-primary hover:underline cursor-pointer ms-1 ${
            countdown > 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
        </button>
      </p>

      <Link
        to="/login"
        className="text-sm hover:underline cursor-pointer text-muted-foreground"
      >
        Back to Login
      </Link>

      {error && (
        <FormError errorMsg={error.response?.data?.message || "Invalid OTP"} />
      )}
    </form>
  );
};

export default OTP;

import AuthContainer from "@/components/form/AuthContainer";
import MainInput from "@/components/form/MainInput";
import FormError from "@/components/form/FormError";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { FaLock } from "react-icons/fa";
import { useMemo } from "react";
import { getPasswordStrength, strengthLabel } from "@/utils/PasswordStrength";

import { z } from "zod";
import { useNavigate } from "react-router";
import { resetPassword } from "@/api/forgotPasswordServices";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

const ResetPasswordPage = ({ parentData }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const {
    mutate: resetPasswordMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => resetPassword(payload),
    onSuccess: () => {
      navigate("/login");
    },
  });

  const onSubmit = (data) => {
    resetPasswordMutation({
      reset_token: parentData.reset_token,
      code: parentData.otp,
      email: parentData.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
  };

  const progressColor =
    strength <= 1
      ? "#ef4444"
      : strength === 2
        ? "#fbbf24"
        : strength === 3
          ? "#84cc16"
          : "#22c55e";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {error && (
        <FormError
          errorMsg={error.response?.data?.message || "Something went wrong"}
        />
      )}

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            type="password"
            label="New Password"
            placeholder="************"
            icon={<FaLock size={18} />}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        name="password_confirmation"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            type="password"
            label="Confirm Password"
            placeholder="************"
            icon={<FaLock size={18} />}
            error={errors.password_confirmation?.message}
          />
        )}
      />

      {/* Password Strength */}
      <div className="space-y-1">
        <Progress
          value={(strength / 4) * 100}
          indicatorColor={progressColor}
          className="bg-accent"
        />

        {strength > 0 && (
          <p className="text-sm text-muted-foreground">
            Password strength:
            <span
              className="font-semibold ms-1"
              style={{ color: progressColor }}
            >
              {strengthLabel(strength)}
            </span>
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Resetting..." : "Save New Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordPage;

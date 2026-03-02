import { useState } from "react";
import AuthContainer from "@/components/form/AuthContainer";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MainInput from "@/components/form/MainInput";
import { Button } from "@/components/ui/button";
import { FiMail, FiPhone, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import PhoneInputField from "@/components/form/PhoneInputField";
import { isValidPhoneNumber } from "react-phone-number-input";
import FormError from "@/components/form/FormError";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/authServices";

// Dynamic Schema
const loginSchema = (type) => {
  return z.object({
    email:
      type === "email"
        ? z.string().email("Invalid email address")
        : z.string().optional(),

    phone:
      type === "phone"
        ? z.string().refine((value) => isValidPhoneNumber(value || ""), {
            message: "Invalid phone number",
          })
        : z.string().optional(),

    password: z.string().min(6, "Password must be at least 6 characters"),
  });
};

const Login = () => {
  const [loginType, setLoginType] = useState("email");

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema(loginType)),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  const {
    mutate: loginMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login Success:", data);
      navigate("/"); // روح للهوم بعد النجاح
    },
    onError: (err) => {
      console.log("Login Error:", err);
    },
  });

  const onSubmit = (data) => {
    console.log("form login:", data);

    loginMutate(data);
  };

  const handleTabChange = (type) => {
    setLoginType(type);
    reset(); // يمسح القيم لما يغير التاب
  };

  return (
    <AuthContainer
      title="Welcome Back"
      description="Please enter your details to access your account"
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
        <button
          type="button"
          onClick={() => handleTabChange("email")}
          className={`flex-1 p-2 rounded-md transition cursor-pointer text-sm
            ${loginType === "email" ? "bg-primary text-white" : "hover:bg-primary/10"}`}
        >
          Email Address
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("phone")}
          className={`flex-1 p-2 rounded-md transition cursor-pointer text-sm
            ${loginType === "phone" ? "bg-primary text-white" : "hover:bg-primary/10"}`}
        >
          Phone Number
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email / Phone */}
        {loginType === "email" ? (
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                type="email"
                label="Email Address"
                placeholder="example@example.com"
                icon={<FiMail size={18} />}
                error={errors.email?.message}
              />
            )}
          />
        ) : (
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInputField
                {...field}
                label="Phone Number"
                placeholder="Enter your phone number"
                icon={<FiPhone size={18} />}
                error={errors.phone?.message}
              />
            )}
          />
        )}

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              type="password"
              label="Password"
              placeholder="************"
              icon={<FiLock size={18} />}
              error={errors.password?.message}
            />
          )}
        />

        <Link
          to={"/forgot-password"}
          className="inline-block ms-auto text-xs text-primary cursor-pointer hover:underline"
        >
          Forget Password?
        </Link>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Logging in..." : "Login Your Account"}
        </Button>
      </form>

      {error && (
        <FormError
          errorMsg={error?.response?.data?.message || "Something went wrong"}
        />
      )}

      <hr className="" />

      <div className="text-center text-xs text-muted-foreground">
        Dont have an account?
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate("/register")}
      >
        Create an Account
      </Button>
    </AuthContainer>
  );
};

export default Login;

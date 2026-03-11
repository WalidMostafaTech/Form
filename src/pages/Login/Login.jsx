import { useState } from "react";
import AuthContainer from "@/components/form/AuthContainer";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MainInput from "@/components/form/MainInput";
import { Button } from "@/components/ui/button";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import PhoneInputField from "@/components/form/PhoneInputField";
import { isValidPhoneNumber } from "react-phone-number-input";
import FormError from "@/components/form/FormError";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/authServices";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/user/userSlice";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [loginType, setLoginType] = useState("email");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Dynamic Schema
  const loginSchema = (type) => {
    return z.object({
      email:
        type === "email"
          ? z.string().email(t("login.invalidEmail"))
          : z.string().optional(),

      phone:
        type === "phone"
          ? z.string().refine((value) => isValidPhoneNumber(value || ""), {
              message: t("login.invalidPhone"),
            })
          : z.string().optional(),

      password: z.string().min(6, t("login.passwordMin")),
    });
  };

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
      navigate("/");
      dispatch(addUser({ ...data?.user, image: data?.user?.image_url }));
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Login failed!");
      console.log("Login Error:", err);
    },
  });

  const onSubmit = (data) => {
    loginMutate(data);
  };

  const handleTabChange = (type) => {
    setLoginType(type);
    reset(); // يمسح القيم لما يغير التاب
  };

  return (
    <AuthContainer
      title={t("login.title")}
      description={t("login.description")}
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
        <button
          type="button"
          onClick={() => handleTabChange("email")}
          className={`flex-1 p-2 rounded-md transition cursor-pointer text-sm
            ${loginType === "email" ? "bg-primary text-white" : "hover:bg-primary/10"}`}
        >
          {t("login.tabs.email")}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("phone")}
          className={`flex-1 p-2 rounded-md transition cursor-pointer text-sm
            ${loginType === "phone" ? "bg-primary text-white" : "hover:bg-primary/10"}`}
        >
          {t("login.tabs.phone")}
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        {/* Email / Phone */}
        {loginType === "email" ? (
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                type="email"
                label={t("login.labels.email")}
                placeholder={t("login.placeholders.email")}
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
                label={t("login.labels.phone")}
                placeholder={t("login.placeholders.phone")}
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
              label={t("login.labels.password")}
              placeholder={t("login.placeholders.password")}
              icon={<FiLock size={18} />}
              error={errors.password?.message}
            />
          )}
        />

        <Link
          to={"/forgot-password"}
          className="inline-block ms-auto text-xs text-primary cursor-pointer hover:underline"
        >
          {t("login.forgotPassword")}
        </Link>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? t("login.loggingIn") : t("login.loginButton")}
        </Button>
      </form>

      {error && (
        <FormError
          errorMsg={error?.response?.data?.message || "Something went wrong"}
        />
      )}

      <hr className="my-4" />

      <div className="text-center text-sm text-muted-foreground mb-2">
        {t("login.noAccount")}
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate("/register")}
      >
        {t("login.createAccount")}
      </Button>
    </AuthContainer>
  );
};

export default Login;

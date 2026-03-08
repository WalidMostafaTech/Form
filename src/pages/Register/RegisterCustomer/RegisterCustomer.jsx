import AuthContainer from "@/components/form/AuthContainer";
import MainInput from "@/components/form/MainInput";
import PhoneInputField from "@/components/form/PhoneInputField";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router";
import { IoImageOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/authServices";
import FormError from "@/components/form/FormError";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/store/user/userActions";
import { openModal } from "@/store/modals/modalsSlice";
import { useTranslation } from "react-i18next";

const RegisterCustomer = () => {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const registerSchema = z
    .object({
      name: z.string().min(3, t("registerCustomer.nameTooShort")),
      email: z.string().email(t("registerCustomer.invalidEmail")),
      phone: z.string().refine((value) => isValidPhoneNumber(value || ""), {
        message: t("registerCustomer.invalidPhone"),
      }),
      emirate_id: z.string().min(1, t("registerCustomer.selectEmirate")),
      password: z.string().min(6, t("registerCustomer.passwordMin")),
      password_confirmation: z
        .string()
        .min(6, t("registerCustomer.confirmPassword")),
      terms_accepted: z.boolean().refine((val) => val === true, {
        message: t("registerCustomer.termsRequired"),
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("registerCustomer.passwordsMismatch"),
      path: ["password_confirmation"],
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      emirate_id: "",
      password: "",
      password_confirmation: "",
      terms_accepted: false,
    },
  });
  const dispatch = useDispatch();

  const {
    mutate: registerMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      dispatch(getUser())
        .unwrap()
        .then(() => {
          navigate("/verify-email", { replace: true });
        });
    },
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-unused-vars
    const { terms_accepted, ...payload } = data;

    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    formData.append("terms_accepted", 1);
    formData.append("type", "user");
    formData.append("source", "web");

    if (imageFile) {
      formData.append("image", imageFile);
    }

    registerMutate(formData);
  };

  const { emirates } = useSelector((state) => state.emirates);

  return (
    <AuthContainer
      title={t("registerCustomer.createAccount")}
      description={t("registerCustomer.enterDetails")}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            id="image"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />

          <div
            onClick={() => fileInputRef.current.click()}
            className="w-20 aspect-square bg-muted rounded-full cursor-pointer 
            flex items-center justify-center border-2 border-primary overflow-hidden"
          >
            {imagePreview ? (
              <img
                loading="lazy"
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <IoImageOutline className="text-muted-foreground text-4xl" />
            )}
          </div>

          <label
            htmlFor="image"
            className="font-semibold text-sm mt-1 cursor-pointer"
          >
            {t("registerCustomer.uploadImage")}
          </label>
        </div>

        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              label={t("registerCustomer.fullName")}
              placeholder={t("registerCustomer.fullNamePlaceholder")}
              icon={<FiUser size={18} />}
              error={errors.name?.message}
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              type="email"
              label={t("registerCustomer.email")}
              placeholder={t("registerCustomer.emailPlaceholder")}
              icon={<FiMail size={18} />}
              error={errors.email?.message}
            />
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInputField
              {...field}
              label={t("registerCustomer.phone")}
              placeholder={t("registerCustomer.phonePlaceholder")}
              error={errors.phone?.message}
            />
          )}
        />

        {/* Emirate Select */}
        <Controller
          name="emirate_id"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              options={emirates.map((item) => ({
                value: String(item.id),
                label: item.name,
              }))}
              type="select"
              label={t("registerCustomer.emirate")}
              placeholder={t("registerCustomer.selectEmirate")}
              error={errors.emirate_id?.message}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              type="password"
              label={t("registerCustomer.password")}
              placeholder="************"
              icon={<FiLock size={18} />}
              error={errors.password?.message}
            />
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="password_confirmation"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              type="password"
              label={t("registerCustomer.confirmPassword")}
              placeholder="************"
              icon={<FiLock size={18} />}
              error={errors.password_confirmation?.message}
            />
          )}
        />

        {/* Terms */}
        <div>
          <Controller
            name="terms_accepted"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none flex items-center gap-1"
                >
                  {t("registerCustomer.agreeTo")}{" "}
                  <span
                    className="text-primary cursor-pointer hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(openModal({ modalName: "termsModal" }));
                    }}
                  >
                    {t("registerCustomer.termsAndConditions")}
                  </span>
                </label>
              </div>
            )}
          />

          {errors.terms_accepted && (
            <p className="text-sm text-red-600 mt-1">
              {errors.terms_accepted.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending
            ? t("registerCustomer.creating")
            : t("registerCustomer.createAccount")}
        </Button>

        {error && (
          <FormError
            errorMsg={
              error?.response?.data?.message ||
              t("registerCustomer.somethingWentWrong")
            }
          />
        )}
      </form>
    </AuthContainer>
  );
};

export default RegisterCustomer;

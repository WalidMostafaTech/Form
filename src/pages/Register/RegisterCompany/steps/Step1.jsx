import MainInput from "@/components/form/MainInput";
import PhoneInputField from "@/components/form/PhoneInputField";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/store/modals/modalsSlice";
import { useTranslation } from "react-i18next";
import { BsBuildings } from "react-icons/bs";

const Step1 = ({ setParentData, parentData, goNext }) => {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const schema = z
    .object({
      name: z.string().min(3, t("registerCompanyStep1.nameTooShort")),
      email: z.string().email(t("registerCompanyStep1.invalidEmail")),
      phone: z.string().refine((value) => isValidPhoneNumber(value || ""), {
        message: t("registerCompanyStep1.invalidPhone"),
      }),
      emirate_id: z.string().min(1, t("registerCompanyStep1.selectCountry")),
      city: z.string().min(1, t("registerCompanyStep1.cityRequired")),
      password: z.string().min(6, t("registerCompanyStep1.passwordMin")),
      password_confirmation: z
        .string()
        .min(6, t("registerCompanyStep1.confirmPassword")),
      terms_accepted: z.boolean().refine((val) => val === true, {
        message: t("registerCompanyStep1.termsRequired"),
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("registerCompanyStep1.passwordsMismatch"),
      path: ["password_confirmation"],
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: parentData.name || "",
      email: parentData.email || "",
      phone: parentData.phone || "",
      emirate_id: parentData.emirate_id || "",
      city: parentData.city || "",
      password: parentData.password || "",
      password_confirmation: parentData.password_confirmation || "",
      terms_accepted: parentData.terms_accepted ? true : false,
    },
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-unused-vars
    const { terms_accepted, ...rest } = data;

    setParentData({
      ...parentData,
      ...rest,
      terms_accepted: 1,
      type: "company",
      image: imageFile,
    });

    goNext();
  };

  const { emirates } = useSelector((state) => state.emirates);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Image Upload */}
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
          {t("registerCompanyStep1.uploadImage")}
        </label>
      </div>

      {/* Name */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            label={t("registerCompanyStep1.fullName")}
            placeholder={t("registerCompanyStep1.fullNamePlaceholder")}
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
            label={t("registerCompanyStep1.email")}
            placeholder={t("registerCompanyStep1.emailPlaceholder")}
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
            label={t("registerCompanyStep1.phone")}
            placeholder={t("registerCompanyStep1.phonePlaceholder")}
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
            label={t("registerCompanyStep1.emirate")}
            placeholder={t("registerCompanyStep1.selectCountry")}
            error={errors.emirate_id?.message}
          />
        )}
      />

      {/* City */}
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            label={t("registerCompanyStep1.city")}
            placeholder={t("registerCompanyStep1.cityPlaceholder")}
            icon={<BsBuildings size={18} />}
            error={errors.city?.message}
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
            label={t("registerCompanyStep1.password")}
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
            label={t("registerCompanyStep1.confirmPassword")}
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
                className="text-sm  leading-none flex items-center gap-1"
              >
                {t("registerCompanyStep1.agreeTo")}{" "}
                <span
                  className="text-primary cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(openModal({ modalName: "termsModal" }));
                  }}
                >
                  {t("registerCompanyStep1.termsAndConditions")}
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

      <Button type="submit" className="w-full">
        {t("registerCompanyStep1.continueNextStep")}
      </Button>
    </form>
  );
};

export default Step1;

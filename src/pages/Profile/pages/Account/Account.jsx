import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import MainInput from "@/components/form/MainInput";
import PhoneInputField from "@/components/form/PhoneInputField";
import FormError from "@/components/form/FormError";

import { BsChatLeftText } from "react-icons/bs";
import { FaUser, FaEnvelope, FaPen } from "react-icons/fa";
import { isValidPhoneNumber } from "react-phone-number-input";

import ChangePasswordModal from "./sections/ChangePasswordModal";

import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/api/authServices";

import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { addProfile } from "@/store/profile/profileSlice";
import { Link } from "react-router";
import { toast } from "sonner";

const Account = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [avatar, setAvatar] = useState(profile?.image || null);

  const fileInputRef = useRef(null);

  /* ---------------- schema ---------------- */
  const accountSchema = z.object({
    name: z.string().min(2, t("account.form.name.validation.min")),
    email: z.string().email(t("account.form.email.validation.invalid")),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || isValidPhoneNumber(val),
        t("account.form.phone.validation.invalid"),
      ),
  });

  /* ---------------- form ---------------- */
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    },
    mode: "onChange",
  });

  /* ---------------- mutation ---------------- */
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      dispatch(addProfile(data));
      setErrorMsg("");
      toast.success(t("account.messages.success"));
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.message);
    },
  });

  /* ---------------- submit ---------------- */
  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone || "");

    if (fileInputRef.current?.files?.[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    updateProfileMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      {/* ===== Form Card ===== */}
      <div
        style={{
          pointerEvents: updateProfileMutation.isPending ? "none" : "auto",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div
              className="absolute bottom-0 start-0 w-8 h-8 bg-primary rounded-full z-10 cursor-pointer flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <FaPen size={16} className="text-white" />
            </div>

            <UserAvatar name={profile?.name} image={avatar} size={100} />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setAvatar(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <h3 className="text-2xl font-bold">{t("account.personalInfo")}</h3>
        </div>

        {/* ===== Form ===== */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md mx-auto"
        >
          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                label={t("account.form.name.label")}
                placeholder={t("account.form.name.placeholder")}
                icon={<FaUser size={18} />}
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
                label={t("account.form.email.label")}
                placeholder={t("account.form.email.placeholder")}
                icon={<FaEnvelope size={18} />}
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
                label={t("account.form.phone.label")}
                error={errors.phone?.message}
              />
            )}
          />

          {/* Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <Button
              type="submit"
              className={`flex-1`}
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending
                ? t("account.buttons.saving")
                : t("account.buttons.save")}
            </Button>

            <Button
              className={`flex-1`}
              type="button"
              variant="outline"
              onClick={() => setOpenChangePassword(true)}
            >
              {t("account.buttons.changePassword")}
            </Button>
          </div>

          {errorMsg && <FormError errorMsg={errorMsg} />}
        </form>
      </div>

      <ChangePasswordModal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
    </div>
  );
};

export default Account;

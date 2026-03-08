import MainInput from "@/components/form/MainInput";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdFormatListNumbered } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/authServices";
import { useDispatch } from "react-redux";
import FormError from "@/components/form/FormError";
import { getUser } from "@/store/user/userActions";
import { useTranslation } from "react-i18next";

const Step3 = ({ setParentData, parentData }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const schema = z.object({
    trade_license_name: z
      .string()
      .min(3, t("registerCompanyStep3.tradeLicenseNameShort")),
    trade_license_number: z
      .string()
      .min(3, t("registerCompanyStep3.tradeLicenseNumberShort")),
    trn_number: z.string().min(3, t("registerCompanyStep3.trnNumberShort")),
    trade_license_file: z
      .instanceof(FileList)
      .refine(
        (files) => files.length > 0,
        t("registerCompanyStep3.tradeLicenseFileRequired"),
      ),
    trn_certificate_file: z
      .instanceof(FileList)
      .refine(
        (files) => files.length > 0,
        t("registerCompanyStep3.trnCertificateRequired"),
      ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      trade_license_name: parentData.trade_license_name || "",
      trade_license_number: parentData.trade_license_number || "",
      trn_number: parentData.trn_number || "",
      trade_license_file: parentData.trade_license_file || null,
      trn_certificate_file: parentData.trn_certificate_file || null,
    },
  });

  const dispatch = useDispatch();

  const { mutate, isPending, error } = useMutation({
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
    const finalData = { ...parentData, ...data };

    setParentData(finalData);

    const formData = new FormData();

    Object.keys(finalData).forEach((key) => {
      if (key === "trade_license_file" || key === "trn_certificate_file") {
        if (finalData[key] && finalData[key][0]) {
          formData.append(key, finalData[key][0]);
        }
      } else if (key === "image") {
        if (finalData.image) {
          formData.append("image", finalData.image);
        }
      } else {
        formData.append(key, finalData[key]);
      }
    });

    formData.append("terms_accepted", 1);
    formData.append("type", "company");
    formData.append("source", "web");

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* trade license name */}
      <Controller
        name="trade_license_name"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            label={t("registerCompanyStep3.tradeLicenseName")}
            placeholder={t("registerCompanyStep3.tradeLicensePlaceholder")}
            icon={<BsBuildings size={18} />}
            error={errors.trade_license_name?.message}
          />
        )}
      />

      {/* trade license number */}
      <Controller
        name="trade_license_number"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            label={t("registerCompanyStep3.tradeLicenseNumber")}
            placeholder="123456789"
            icon={<BsBuildings size={18} />}
            error={errors.trade_license_number?.message}
          />
        )}
      />

      {/* TRN number */}
      <Controller
        name="trn_number"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            label={t("registerCompanyStep3.trnNumber")}
            placeholder="123456789"
            icon={<MdFormatListNumbered size={18} />}
            error={errors.trn_number?.message}
          />
        )}
      />

      {/* Upload Trade license */}
      <Controller
        name="trade_license_file"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            type="file"
            label={t("registerCompanyStep3.uploadTradeLicense")}
            error={errors.trade_license_file?.message}
          />
        )}
      />

      {/* Upload TRN certificate */}
      <Controller
        name="trn_certificate_file"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            type="file"
            label={t("registerCompanyStep3.uploadTrnCertificate")}
            error={errors.trn_certificate_file?.message}
          />
        )}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending
          ? t("registerCompanyStep3.creating")
          : t("registerCompanyStep3.completeRegistration")}
      </Button>

      {error && (
        <FormError
          errorMsg={
            error?.response?.data?.message ||
            t("registerCompanyStep3.somethingWentWrong")
          }
        />
      )}
    </form>
  );
};

export default Step3;

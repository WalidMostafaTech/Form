import MainInput from "@/components/form/MainInput";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";

const Step2 = ({ setParentData, parentData, goNext }) => {
  const { t } = useTranslation();

  const schema = z.object({
    coffee_volumes: z
      .string()
      .min(10, t("registerCompanyStep2.provideMoreDetails")),
    coffee_usage: z
      .string()
      .min(10, t("registerCompanyStep2.provideMoreDetails")),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      coffee_volumes: parentData.coffee_volumes || "",
      coffee_usage: parentData.coffee_usage || "",
    },
  });

  const onSubmit = (data) => {
    setParentData({ ...parentData, ...data });
    goNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Volumes */}
      <Controller
        name="coffee_volumes"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            type="textarea"
            label={t("registerCompanyStep2.coffeeVolumes")}
            placeholder={t("registerCompanyStep2.textAreaPlaceholder")}
            error={errors.coffee_volumes?.message}
          />
        )}
      />

      {/* Use Case */}
      <Controller
        name="coffee_usage"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            type="textarea"
            label={t("registerCompanyStep2.coffeeUsage")}
            placeholder={t("registerCompanyStep2.textAreaPlaceholder")}
            error={errors.coffee_usage?.message}
          />
        )}
      />

      <Button type="submit" className="w-full">
        {t("registerCompanyStep2.continueNextStep")}
      </Button>
    </form>
  );
};

export default Step2;

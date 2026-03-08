import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import MainInput from "@/components/form/MainInput";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form/FormError";
import { sendContactUs } from "@/api/mainServices";
import { toast } from "sonner";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInputField from "@/components/form/PhoneInputField";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();

  const contactSchema = z.object({
    first_name: z.string().min(2, t("ContactForm.firstNameRequired")),
    last_name: z.string().min(2, t("ContactForm.lastNameRequired")),
    email: z.string().email(t("ContactForm.invalidEmail")),
    message: z.string().min(10, t("ContactForm.messageMin")),
    phone: z.string().refine((value) => isValidPhoneNumber(value || ""), {
      message: t("ContactForm.invalidPhone"),
    }),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      message: "",
      phone: "",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: sendContactUs,
    onSuccess: () => {
      reset();
      toast.success(t("ContactForm.successMessage"));
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div>
      <h3 className="text-xl tracking-widest uppercase mb-6">
        {t("ContactForm.heading")}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              label={t("ContactForm.firstName")}
              placeholder={t("ContactForm.firstNamePlaceholder")}
              error={errors.first_name?.message}
            />
          )}
        />

        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              label={t("ContactForm.lastName")}
              placeholder={t("ContactForm.lastNamePlaceholder")}
              error={errors.last_name?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInputField
              {...field}
              label={t("ContactForm.phone")}
              placeholder={t("ContactForm.phonePlaceholder")}
              error={errors.phone?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              type="email"
              label={t("ContactForm.email")}
              placeholder={t("ContactForm.emailPlaceholder")}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              type="textarea"
              label={t("ContactForm.message")}
              placeholder={t("ContactForm.messagePlaceholder")}
              error={errors.message?.message}
            />
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? t("ContactForm.sending") : t("ContactForm.send")}
        </Button>

        {error && (
          <FormError
            errorMsg={
              error?.response?.data?.message || t("ContactForm.somethingWrong")
            }
          />
        )}
      </form>
    </div>
  );
};

export default ContactForm;

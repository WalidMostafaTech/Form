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

const contactSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().refine((value) => isValidPhoneNumber(value || ""), {
    message: "Invalid phone number",
  }),
});

const ContactForm = () => {
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

  // ✅ React Query Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: sendContactUs,
    onSuccess: () => {
      reset();
      toast.success("Message sent successfully! We will get back to you soon.");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div>
      <h3 className="text-xl tracking-widest uppercase mb-6">
        Send Your Message
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* First Name */}
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              label="Name"
              placeholder="first name"
              error={errors.first_name?.message}
            />
          )}
        />

        {/* Last Name */}
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              label="Last Name"
              placeholder="last name"
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
              label="Phone"
              placeholder="Enter your phone number"
              error={errors.phone?.message}
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
              label="Email Address"
              placeholder="example@example.com"
              error={errors.email?.message}
            />
          )}
        />

        {/* Message */}
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              type="textarea"
              label="Message"
              placeholder="Write your message..."
              error={errors.message?.message}
            />
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </Button>

        {error && (
          <FormError
            errorMsg={error?.response?.data?.message || "Something went wrong"}
          />
        )}
      </form>
    </div>
  );
};

export default ContactForm;

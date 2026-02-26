import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MainInput from "@/components/form/MainInput";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="">
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
              placeholder="Hassan"
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
              placeholder="Hassan"
              error={errors.last_name?.message}
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
              placeholder="example@example.com"
              error={errors.message?.message}
            />
          )}
        />

        {/* Submit Button */}
        <Button type="submit">send</Button>
      </form>
    </div>
  );
};

export default ContactForm;

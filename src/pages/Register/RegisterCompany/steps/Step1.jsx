import MainInput from "@/components/form/MainInput";
import PhoneInputField from "@/components/form/PhoneInputField";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin } from "react-icons/fi";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z
  .object({
    name: z.string().min(3, "Name is too short"),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((value) => isValidPhoneNumber(value || ""), {
      message: "Invalid phone number",
    }),
    emirate: z.string().min(1, "Please select your emirate"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Confirm your password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

const emirates = [
  { label: "Abu Dhabi", value: "abu_dhabi" },
  { label: "Dubai", value: "dubai" },
  { label: "Sharjah", value: "sharjah" },
  { label: "Ajman", value: "ajman" },
  { label: "Umm Al Quwain", value: "uaq" },
  { label: "Ras Al Khaimah", value: "rak" },
  { label: "Fujairah", value: "fujairah" },
];

const Step1 = ({ setParentData, parentData, goNext }) => {
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
      emirate: parentData.emirate || "",
      password: parentData.password || "",
      password_confirmation: parentData.password_confirmation || "",
      terms: parentData.terms || false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setParentData({ ...parentData, ...data });
    goNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Name */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            label="Full Name"
            placeholder="Enter your full name"
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
            label="Email Address"
            placeholder="example@example.com"
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
            label="Phone"
            placeholder="Enter phone number"
            icon={<FiPhone size={18} />}
            error={errors.phone?.message}
          />
        )}
      />

      {/* Emirate Select */}
      <Controller
        name="emirate"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            type="select"
            label="Your Emirate"
            placeholder="Select your emirate"
            icon={<FiMapPin size={18} />}
            options={emirates}
            error={errors.emirate?.message}
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
            label="Password"
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
            label="Confirm Password"
            placeholder="************"
            icon={<FiLock size={18} />}
            error={errors.password_confirmation?.message}
          />
        )}
      />

      {/* Terms */}
      <div>
        <Controller
          name="terms"
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
                className="text-sm font-medium leading-none"
              >
                I agree to the{" "}
                <span
                  className="text-primary cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Terms and Conditions");
                  }}
                >
                  Terms and Conditions
                </span>
              </label>
            </div>
          )}
        />
        {errors.terms && (
          <p className="text-sm text-red-600 mt-1">{errors.terms.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Continue Next Step
      </Button>
    </form>
  );
};

export default Step1;

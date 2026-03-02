import AuthContainer from "@/components/form/AuthContainer";
import MainInput from "@/components/form/MainInput";
import PhoneInputField from "@/components/form/PhoneInputField";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin } from "react-icons/fi";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router";
import { IoImageOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/authServices";
import FormError from "@/components/form/FormError";

const registerSchema = z
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

const RegisterCustomer = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

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
      emirate: "",
      password: "",
      password_confirmation: "",
      terms: false,
    },
  });

  const {
    mutate: registerMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/verify-email");
    },
  });

  const onSubmit = (data) => {
    const { terms, ...payload } = data;

    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    registerMutate(formData);
  };

  return (
    <AuthContainer
      title="Create Customer Account"
      description="Please enter your details to access your account"
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
            Upload your image
          </label>
        </div>

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

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating..." : "Create Account"}
        </Button>

        {error && (
          <FormError
            errorMsg={error?.response?.data?.message || "Something went wrong"}
          />
        )}
      </form>
    </AuthContainer>
  );
};

export default RegisterCustomer;

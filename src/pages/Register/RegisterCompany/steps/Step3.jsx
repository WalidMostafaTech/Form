import MainInput from "@/components/form/MainInput";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdFormatListNumbered } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { useNavigate } from "react-router";

const schema = z.object({
  trade_license_name: z.string().min(3, "Trade license name is too short"),
  trade_license_number: z.string().min(3, "Trade license number is too short"),
  trn_number: z.string().min(3, "TRN number is too short"),
  trade_license_file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Trade license file is required"),
  trn_certificate_file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "TRN certificate file is required"),
});

const Step3 = ({ setParentData, parentData }) => {
const navigate = useNavigate();

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

  const onSubmit = (data) => {
    setParentData({ ...parentData, ...data });
    console.log(parentData);
    navigate("/verify-email");
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
            label="Trade license name"
            placeholder="trade"
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
            label="Trade license number"
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
            label="TRN number"
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
            label="Upload Trade license"
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
            label="Upload TRN certificate"
            error={errors.trn_certificate_file?.message}
          />
        )}
      />

      <Button type="submit" className="w-full">
        Complete Registration
      </Button>
    </form>
  );
};

export default Step3;

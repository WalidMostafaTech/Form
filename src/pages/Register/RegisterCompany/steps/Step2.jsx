import MainInput from "@/components/form/MainInput";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  volumes: z.string().min(10, "Please provide more details"),
  use_case: z.string().min(10, "Please provide more details"),
});

const Step2 = ({ setParentData, parentData, goNext }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      volumes: parentData.volumes || "",
      use_case: parentData.use_case || "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setParentData({ ...parentData, ...data });
    goNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Volumes */}
      <Controller
        name="volumes"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            type="textarea"
            label="What volumes of coffee are you interested in ordering?"
            placeholder="text area to answer"
            error={errors.volumes?.message}
          />
        )}
      />

      {/* use_case */}
      <Controller
        name="use_case"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            type="textarea"
            label="What would you like to use our coffees for?"
            placeholder="text area to answer"
            error={errors.use_case?.message}
          />
        )}
      />

      <Button type="submit" className="w-full">
        Continue Next Step
      </Button>
    </form>
  );
};

export default Step2;

import MainInput from "@/components/form/MainInput";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  coffee_volumes: z.string().min(10, "Please provide more details"),
  coffee_usage: z.string().min(10, "Please provide more details"),
});

const Step2 = ({ setParentData, parentData, goNext }) => {
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
            label="What volumes of coffee are you interested in ordering?"
            placeholder="text area to answer"
            error={errors.coffee_volumes?.message}
          />
        )}
      />

      {/* use_case */}
      <Controller
        name="coffee_usage"
        control={control}
        render={({ field }) => (
          <MainInput
            {...field}
            type="textarea"
            label="What would you like to use our coffees for?"
            placeholder="text area to answer"
            error={errors.coffee_usage?.message}
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

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import MainInput from "@/components/form/MainInput";
import FormError from "@/components/form/FormError";
import { createEvent, getEventTypes } from "@/api/eventServices";
import { MdLocalFireDepartment } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { HiMiniUserGroup } from "react-icons/hi2";
import { LuUserRoundSearch } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { useSelector } from "react-redux";

const EventForm = () => {
  const { t } = useTranslation();

  const today = new Date().toISOString().split("T")[0];

  const eventSchema = z.object({
    event_type_id: z
      .string()
      .min(1, t("EventForm.validation.eventTypeRequired")),
    date: z
      .string()
      .min(1, t("EventForm.validation.dateRequired"))
      .refine((value) => value >= today, {
        message: t("EventForm.validation.noPastDate"),
      }),
    start_time: z.string().min(1, t("EventForm.validation.startTimeRequired")),
    end_time: z.string().min(1, t("EventForm.validation.endTimeRequired")),
    emirate_id: z.string().min(1, t("EventForm.validation.emirateRequired")),
    location: z.string().min(1, t("EventForm.validation.locationRequired")),
    location_link: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-\.\?\=\&\#]*)*\/?$/.test(
            val,
          ),
        {
          message: t("EventForm.validation.invalidLocationLink"),
        },
      ),
    people_number: z
      .string()
      .min(1, t("EventForm.validation.peopleRequired"))
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: t("EventForm.validation.peoplePositive"),
      }),
    attendees_gender: z
      .string()
      .min(1, t("EventForm.validation.attendeesRequired")),
  });

  const ATTENDEE_TYPES = [
    { value: "men", name: t("EventForm.men") },
    { value: "women", name: t("EventForm.women") },
    { value: "mixed", name: t("EventForm.mixed") },
  ];

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      event_type_id: "",
      date: "",
      start_time: "",
      end_time: "",
      emirate_id: "",
      location: "",
      location_link: "",
      people_number: "",
      attendees_gender: "",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      reset();
      toast.success(t("EventForm.successMessage"));
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const { data: eventTypes, isLoading: eventTypesLoading } = useQuery({
    queryKey: ["eventTypes"],
    queryFn: getEventTypes,
  });

  const { emirates } = useSelector((state) => state.emirates);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Event Type */}
          <Controller
            name="event_type_id"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                type="select"
                label={t("EventForm.eventType")}
                placeholder={t("EventForm.eventTypePlaceholder")}
                options={eventTypes?.map((item) => ({
                  value: String(item.id),
                  label: item.name,
                }))}
                disabled={eventTypesLoading}
                error={errors.event_type_id?.message}
                icon={<MdLocalFireDepartment />}
              />
            )}
          />

          {/* Event Date */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                type="date"
                label={t("EventForm.eventDate")}
                min={today}
                error={errors.date?.message}
              />
            )}
          />

          {/* Start Time */}
          <Controller
            name="start_time"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                type="time"
                label={t("EventForm.startTime")}
                placeholder="10 : 30 AM"
                error={errors.start_time?.message}
              />
            )}
          />

          {/* End Time */}
          <Controller
            name="end_time"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                type="time"
                label={t("EventForm.endTime")}
                placeholder="10 : 30 AM"
                error={errors.end_time?.message}
              />
            )}
          />

          {/* Emirate */}
          <Controller
            name="emirate_id"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                options={emirates?.map((item) => ({
                  value: String(item.id),
                  label: item.name,
                }))}
                type="select"
                label={t("EventForm.emirate")}
                placeholder={t("EventForm.emiratePlaceholder")}
                error={errors.emirate_id?.message}
                icon={<SlLocationPin />}
              />
            )}
          />

          {/* Event Location */}
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                label={t("EventForm.eventLocation")}
                placeholder={t("EventForm.eventLocationPlaceholder")}
                error={errors.location?.message}
                icon={<SlLocationPin />}
              />
            )}
          />

          {/* Event Location Link */}
          <Controller
            name="location_link"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                label={t("EventForm.eventLocationLink")}
                placeholder={t("EventForm.eventLocationLinkPlaceholder")}
                error={errors.location_link?.message}
                icon={<GrMapLocation />}
              />
            )}
          />

          {/* Expected Number of People */}
          <Controller
            name="people_number"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                type="number"
                label={t("EventForm.expectedNumberOfPeople")}
                placeholder={t("EventForm.expectedNumberOfPeoplePlaceholder")}
                error={errors.people_number?.message}
                icon={<HiMiniUserGroup />}
              />
            )}
          />

          {/* Type of Event Attendees */}
          <Controller
            name="attendees_gender"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                type="select"
                label={t("EventForm.typeOfEventAttendees")}
                placeholder={t("EventForm.typeOfEventAttendeesPlaceholder")}
                options={ATTENDEE_TYPES.map((item) => ({
                  value: item.value,
                  label: item.name,
                }))}
                error={errors.attendees_gender?.message}
                icon={<LuUserRoundSearch />}
              />
            )}
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full mt-2">
          {isPending ? t("EventForm.sending") : t("EventForm.send")}
        </Button>

        {error && (
          <FormError
            errorMsg={
              error?.response?.data?.message || t("EventForm.somethingWrong")
            }
          />
        )}
      </form>
    </div>
  );
};

export default EventForm;

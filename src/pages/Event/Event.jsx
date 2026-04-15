import PageBanner from "@/components/commonSections/PageBanner";
import EventSteps from "./sections/EventSteps";
import EventForm from "./sections/EventForm";
import { getEventSteps } from "@/api/eventServices";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import EventPageSkeleton from "@/components/Loading/SkeletonLoading/EventPageSkeleton";
import { Button } from "@/components/ui/button";
import { FaClipboardList } from "react-icons/fa";
import { useSelector } from "react-redux";

const Event = () => {
  const { t } = useTranslation();

  const { user } = useSelector((state) => state.user);

  const { data: eventSteps, isLoading } = useQuery({
    queryKey: ["eventSteps"],
    queryFn: getEventSteps,
  });

  return (
    <main>
      <PageBanner
        image={eventSteps?.image}
        title={t("event")}
        description={eventSteps?.description}
        html={true}
        loading={isLoading}
      />

      <section className="container lg:max-w-5xl pagePadding space-y-4 lg:space-y-8">
        {isLoading ? (
          <EventPageSkeleton />
        ) : (
          <>
            <EventSteps steps={eventSteps?.items} />

            <div className="space-y-2">
              <h3 className="text-3xl font-semibold">{eventSteps?.title}</h3>
              <p className="text-muted-foreground font-medium">
                {eventSteps?.second_description}
              </p>
              {user && eventSteps?.menu_link && (
                <Button
                  onClick={() => {
                    window.open(eventSteps?.menu_link, "_blank");
                  }}
                >
                  {t("download_menu")} <FaClipboardList />
                </Button>
              )}
            </div>
          </>
        )}

        <EventForm />
      </section>
    </main>
  );
};

export default Event;

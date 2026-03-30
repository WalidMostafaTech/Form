import SectionTitle from "@/components/common/SectionTitle";
import VisionAndMissionSkeleton from "@/components/Loading/SkeletonLoading/VisionAndMissionSkeleton";
import { useTranslation } from "react-i18next";

const VisionAndMission = ({
  vision = {},
  mission = {},
  trainings = {},
  loading,
}) => {
  const { t } = useTranslation();

  if (loading) return <VisionAndMissionSkeleton />;

  if (!vision || !mission) return null;

  const list = [
    {
      id: 1,
      title: vision?.title,
      description: vision?.description,
      icon: vision?.icon,
      value: vision,
    },
    {
      id: 2,
      title: mission?.title,
      description: mission?.description,
      icon: mission?.icon,
      value: mission,
    },
    {
      id: 3,
      title: trainings?.title,
      description: trainings?.description,
      icon: trainings?.icon,
      value: trainings,
    },
  ];

  return (
    <section className="sectionPadding">
      <div className="container">
        {/* <SectionTitle title={t("VisionAndMission")} /> */}

        <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-8">
          {list
            ?.filter((item) => item.value)
            .map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border flex-1 min-w-62 md:min-w-75
              flex flex-col items-center text-center md:text-start md:items-start gap-2"
              >
                <div className="bg-primary-foreground w-full aspect-5/3 rounded-lg overflow-hidden">
                  <img
                    loading="lazy"
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-medium">{item.title}</h3>

                <p className="">{item.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default VisionAndMission;

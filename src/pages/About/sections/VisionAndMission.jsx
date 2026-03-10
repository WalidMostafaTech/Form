import SectionTitle from "@/components/common/SectionTitle";
import VisionAndMissionSkeleton from "@/components/Loading/SkeletonLoading/VisionAndMissionSkeleton";
import { useTranslation } from "react-i18next";

const VisionAndMission = ({ vision, mission, loading }) => {
  const { t } = useTranslation();

  if (loading) return <VisionAndMissionSkeleton />;

  if (!vision || !mission) return null;

  const list = [
    {
      id: 1,
      title: vision?.title,
      description: vision?.description,
      icon: vision?.icon,
    },
    {
      id: 2,
      title: mission?.title,
      description: mission?.description,
      icon: mission?.icon,
    },
  ];

  return (
    <section className="sectionPadding">
      <div className="container">
        <SectionTitle title={t("VisionAndMission")} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-8">
          {list.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border  
            flex flex-col items-center text-center md:text-start md:items-start gap-2"
            >
              <div
                className="text-3xl text-primary bg-primary-foreground w-14 aspect-square p-4
              flex items-center justify-center rounded-full"
              >
                <img
                  loading="lazy"
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-xl font-bold">{item.title}</h3>

              <p className="">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionAndMission;

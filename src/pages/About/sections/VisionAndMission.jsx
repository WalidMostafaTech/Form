import SectionTitle from "@/components/common/SectionTitle";
import VisionAndMissionSkeleton from "@/components/Loading/SkeletonLoading/VisionAndMissionSkeleton";

const VisionAndMission = ({ data, loading }) => {
  if (loading) return <VisionAndMissionSkeleton />;
  if (!data) return null;

  const list = [
    {
      id: 1,
      title: data?.vision?.title,
      description: data?.vision?.description,
      icon: data?.vision?.icon,
    },
    {
      id: 2,
      title: data?.mission?.title,
      description: data?.mission?.description,
      icon: data?.mission?.icon,
    },
  ];

  return (
    <section className="sectionPadding">
      <div className="container">
        <SectionTitle title="Vision & Mission" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-8">
          {list.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border  
            flex flex-col items-center text-center md:text-start md:items-start gap-2"
            >
              <div
                className="text-3xl text-primary bg-primary-foreground w-14 h-14 p-2
              flex items-center justify-center rounded-full"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-xl font-semibold">{item.title}</h3>

              <p className="text-sm text-muted-foreground">
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

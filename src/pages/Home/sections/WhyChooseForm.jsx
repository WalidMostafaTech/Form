import WhyChooseFormSkeleton from "@/components/Loading/SkeletonLoading/WhyChooseFormSkeleton";

const WhyChooseForm = ({ data, loading }) => {
  if (loading) return <WhyChooseFormSkeleton />;
  if (!data || !data?.items.length) return null;

  return (
    <section
      className="sectionPadding bg-center bg-cover relative"
      style={{ backgroundImage: `url(${data?.image})` }}
    >
      <div className="absolute inset-0 bg-primary/80" />

      <div className="container relative z-10">
        <hgroup className="text-center mb-12  max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {data?.title}
          </h2>

          {data?.description && (
            <p className="text-muted/80 text-sm">{data?.description}</p>
          )}
        </hgroup>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {data?.items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-14 h-14 bg-white/10 rounded-xl p-2
              flex items-center justify-center mb-4 text-secondary text-3xl"
              >
                <img
                  loading="lazy"
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-muted/80">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseForm;

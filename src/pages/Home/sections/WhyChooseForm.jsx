import WhyChooseFormSkeleton from "@/components/Loading/SkeletonLoading/WhyChooseFormSkeleton";

const WhyChooseForm = ({ data, loading }) => {
  if (loading) return <WhyChooseFormSkeleton />;
  if (!data || !data?.items.length) return null;

  const highlightFormWord = (text) => {
    if (!text) return text;

    const words = text.split(" ");

    return words.map((word, index) => {
      const cleanWord = word.replace(/[^\w\u0600-\u06FF]/g, "");
      const punctuation = word.replace(/[\w\u0600-\u06FF]/g, "");
      const lowerWord = cleanWord.toLowerCase();

      if (lowerWord === "form" || cleanWord === "فورم") {
        return (
          <span key={index}>
            <span className="text-secondary">{cleanWord}</span>
            {punctuation}{" "}
          </span>
        );
      }

      return word + " ";
    });
  };

  return (
    <section
      className="sectionPadding bg-center bg-cover relative"
      style={{ backgroundImage: `url(${data?.image})` }}
    >
      <div className="absolute inset-0 bg-primary/90" />

      <div className="container relative z-10 py-8">
        <hgroup className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 lg:mb-10">
            {highlightFormWord(data?.title)}
          </h2>

          {data?.description && (
            <p className="text-muted/80">{data?.description}</p>
          )}
        </hgroup>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data?.items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div
                className="w-20 aspect-square bg-white/10 rounded-3xl p-5
              flex items-center justify-center text-secondary text-3xl"
              >
                <img
                  loading="lazy"
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-muted/80 max-w-56">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseForm;

import { useTranslation } from "react-i18next";
import { getOurStory } from "@/api/homeServices";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import OurStorySkeleton from "../Loading/SkeletonLoading/OurStorySkeleton";

const OurStory = () => {
  const { t } = useTranslation();

  const { data: ourStory, isLoading } = useQuery({
    queryKey: ["ourStory"],
    queryFn: getOurStory,
  });

  if (isLoading) return <OurStorySkeleton />;

  if (!ourStory || !ourStory?.title) return null;

  return (
    <section className="container sectionPadding">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 content-center">
          <p className="text-secondary text-lg font-semibold uppercase flex items-center gap-2">
            <span className="h-0.5 w-12 bg-secondary"></span>
            {t("OurStory.title")}
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl">
            {ourStory?.title}
          </h1>

          <p className="text-muted-foreground lg:text-lg">
            {ourStory?.description}
          </p>

          <ul className="flex gap-8">
            {ourStory?.statistics?.map((item) => (
              <li key={item.label} className="not-last:border-e not-last:pe-8">
                <p className="text-5xl text-primary leading-none">
                  {item.number}
                </p>
                <p className=":text-sm text-muted-foreground font-semibold uppercase">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>

          {ourStory?.button.url && (
            <Link
              to={ourStory?.button?.url}
              className="text-primary text-center  py-3 px-4 border-2 rounded-full min-w-40
            border-primary hover:bg-primary hover:text-background duration-300 inline-block"
            >
              {ourStory?.button?.text}
            </Link>
          )}
        </div>

        <div className="hidden md:block w-full aspect-4/5 min-h-100 relative">
          <div className="w-full h-full overflow-hidden rounded-xl shadow-lg">
            <img
              loading="lazy"
              src={ourStory?.image}
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>

          {ourStory?.established_year && (
            <div className="absolute -bottom-4 -inset-e-2 bg-primary p-4 rounded-lg shadow-lg">
              <p className="text-white text-lg  text-center min-w-24">
                {ourStory?.established_year}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurStory;

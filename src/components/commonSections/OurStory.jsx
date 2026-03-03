import { getOurStory } from "@/api/homeServices";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const OurStory = () => {
  const { data: ourStory, isLoading } = useQuery({
    queryKey: ["ourStory"],
    queryFn: getOurStory,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!ourStory || !ourStory?.our_story) return null;

  // const list = [
  //   {
  //     id: 1,
  //     value: "+12",
  //     label: "Origins",
  //   },
  //   {
  //     id: 2,
  //     value: "50k",
  //     label: "Happy Cups",
  //   },
  // ];

  return (
    <section className="container sectionPadding">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-secondary flex items-center gap-2">
            <span className="h-0.5 w-12 bg-secondary"></span> Our Story
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {ourStory?.title}
          </h1>

          <p className="text-muted-foreground text-sm">
            {ourStory?.description}
          </p>

          {/* <ul className="flex gap-8">
            {ourStory?.statistics?.map((item) => (
              <li
                key={item.label}
                className="not-last:border-e border-muted not-last:pe-8"
              >
                <p className="text-2xl font-bold text-primary leading-none mb-1">
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground font-semibold uppercase">
                  {item.label}
                </p>
              </li>
            ))}
          </ul> */}

          {ourStory?.button.url && (
            <Link
              to={ourStory?.button?.url}
              className="text-primary font-bold py-2 px-4 border-2 rounded-full
            border-primary hover:bg-primary hover:text-background duration-300 inline-block"
            >
              {ourStory?.button?.text}
            </Link>
          )}
        </div>

        <div className="hidden md:block w-full h-full min-h-100 relative">
          <div className="w-full h-full overflow-hidden rounded-lg shadow-lg">
            <img
              src={ourStory?.image}
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>

          {ourStory?.established_year && (
            <div className="absolute -bottom-4 -inset-e-2 bg-primary p-4 rounded-lg shadow-lg">
              <p className="text-white text-sm font-bold">
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

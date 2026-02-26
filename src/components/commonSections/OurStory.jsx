import image from "@/assets/images/product-img.png";
import { Link } from "react-router";

const OurStory = () => {
  const list = [
    {
      id: 1,
      value: "+12",
      label: "Origins",
    },
    {
      id: 2,
      value: "50k",
      label: "Happy Cups",
    },
  ];

  return (
    <section className="container sectionPadding">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-secondary flex items-center gap-2">
            <span className="h-0.5 w-12 bg-secondary"></span> Our Story
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="block text-primary">
              More than just a roastery,
            </span>{" "}
            a coffee obsession
          </h1>

          <p className="text-muted-foreground text-sm">
            From the high-altitude hills of Ethiopia to the sun-drenched
            plantations of Brazil, FORM Coffee travels the globe to find the 1%
            of beans that meet our standards. Based in the heart of Dubai, we
            bridge the gap between artisan farmers and the discerning modern
            palate.
          </p>

          <ul className="flex gap-8">
            {list.map((item) => (
              <li
                key={item.id}
                className="not-last:border-e border-muted not-last:pe-8"
              >
                <p className="text-2xl font-bold text-primary leading-none mb-1">
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground font-semibold uppercase">{item.label}</p>
              </li>
            ))}
          </ul>

          <Link
            to="/our-story"
            className="text-primary font-bold py-2 px-4 border-2 rounded-full
            border-primary hover:bg-primary hover:text-background duration-300 inline-block"
          >
            Explore More
          </Link>
        </div>

        <div className="hidden md:block w-full h-full relative">
          <div className="w-full h-full overflow-hidden rounded-lg shadow-lg">
            <img
              src={image}
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-4 -inset-e-2 bg-primary p-4 rounded-lg shadow-lg">
            <p className="text-white text-sm font-bold">Est. 2018</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;

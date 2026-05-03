import HeroSkeleton from "@/components/Loading/SkeletonLoading/HeroSkeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Hero = ({ data, loading }) => {
  if (loading) return <HeroSkeleton />;

  if (!data) return null;

  return (
    <section className="w-full h-[calc(100dvh-28px)] relative">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={data?.introduction_video}
        autoPlay
        loop
        muted
      />

      <div className="absolute inset-0 z-10 bg-black/50">
        <div className="container h-full flex flex-col justify-end items-start text-white gap-4 py-6 lg:py-14">
          {/* <h1 className="text-5xl md:text-7xl ">{data?.introduction_title}</h1> */}
          <p className="text- raleway-light">
            {data?.introduction_description}
          </p>

          {data?.introduction_link && (
            <Link to={data?.introduction_link}>
              <Button
                variant="secondary"
                size="lg"
                className={`mt-2 text-lg min-w-36 py-6 rounded-full`}
              >
                {data?.introduction_button_title}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;

import HeroSkeleton from "@/components/Loading/SkeletonLoading/HeroSkeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Hero = ({ data, loading }) => {
  if (loading) return <HeroSkeleton />;

  if (!data) return null;

  return (
    <section className="w-full h-screen relative">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={data?.introduction_video}
        autoPlay
        loop
        muted
      />

      <div className="absolute inset-0 z-10 bg-primary/30">
        <div className="container h-full flex flex-col justify-center items-center text-center text-white gap-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            {data?.introduction_title}
          </h1>
          <p className="text-lg md:text-2xl">
            {data?.introduction_description}
          </p>

          {data?.introduction_link && (
            <Link to={data?.introduction_link}>
              <Button variant="outline" className={`mt-2`}>
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

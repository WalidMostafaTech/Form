import HeroSkeleton from "@/components/Loading/SkeletonLoading/HeroSkeleton";

const Hero = ({ video, loading }) => {
  if (loading) return <HeroSkeleton />;

  if (!video) return null;

  return (
    <section className="w-full h-screen relative">
    {/* <section className="w-full aspect-video relative"> */}
      <div className="absolute inset-0 z-10 bg-primary/40" />

      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
      />
    </section>
  );
};

export default Hero;

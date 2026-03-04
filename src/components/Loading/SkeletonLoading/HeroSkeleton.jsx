import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="relative h-screen w-full">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-primary/40" />

      {/* Video Placeholder */}
      <Skeleton className="absolute top-0 left-0 w-full h-full" />
    </section>
  );
};

export default HeroSkeleton;

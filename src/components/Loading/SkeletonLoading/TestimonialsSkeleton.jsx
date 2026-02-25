import { Skeleton } from "@/components/ui/skeleton";

const TestimonialsSkeleton = () => {
  return (
    <section className="sectionPadding container">
      {/* Section Title Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-48" />
      </div>

      {/* Cards Skeleton */}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[260px] md:min-w-[300px] lg:min-w-[340px]"
          >
            <Skeleton className="h-[220px] rounded-2xl" />
          </div>
        ))}
      </div>

      {/* Navigation Skeleton */}
      <div className="flex justify-center gap-3 mt-6">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    </section>
  );
};

export default TestimonialsSkeleton;

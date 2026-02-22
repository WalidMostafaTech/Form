import { Skeleton } from "@/components/ui/skeleton";

const OrderMethodSkeleton = () => {
  return (
    <section className="container sectionPadding">
      {/* Section Title Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-40" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center gap-2 card"
          >
            {/* Number Circle */}
            <Skeleton className="w-16 h-16 rounded-xl mb-4" />

            {/* Title */}
            <Skeleton className="h-6 w-32" />

            {/* Description */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderMethodSkeleton;

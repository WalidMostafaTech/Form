import { Skeleton } from "@/components/ui/skeleton";

const GamesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 mt-6 lg:mt-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 card">
          {/* Image */}
          <Skeleton className="w-full h-60 rounded-lg" />

          {/* Title */}
          <Skeleton className="h-5 w-3/4 mx-auto" />
        </div>
      ))}
    </div>
  );
};

export default GamesSkeleton;

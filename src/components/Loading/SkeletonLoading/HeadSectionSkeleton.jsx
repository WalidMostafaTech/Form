import { Skeleton } from "@/components/ui/skeleton";

const HeadSectionSkeleton = () => {
  return (
    <div className="card lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      <div className="h-[300px] md:h-[400px] bg-accent overflow-hidden rounded-2xl">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="flex flex-col gap-4 lg:gap-6">
        <Skeleton className="h-8 w-3/4" />

        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="p-4 bg-accent rounded-2xl">
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4 gap-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
};

export default HeadSectionSkeleton;

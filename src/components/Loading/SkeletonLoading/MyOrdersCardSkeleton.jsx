import { Skeleton } from "@/components/ui/skeleton";

const MyOrdersCardSkeleton = () => {
  return (
    <div className="card flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="w-24 lg:w-36 aspect-square overflow-hidden rounded-2xl">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="flex flex-col gap-2 max-w-sm flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-10 w-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default MyOrdersCardSkeleton;

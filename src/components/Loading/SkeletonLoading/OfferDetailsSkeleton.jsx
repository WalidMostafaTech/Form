import { Skeleton } from "@/components/ui/skeleton";

const OfferDetailsSkeleton = () => {
  return (
    <div className="card lg:p-8 space-y-4 lg:space-y-8">
      <Skeleton className="h-8 w-1/4" />

      <div className="p-4 bg-accent rounded-2xl">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="p-4 bg-accent rounded-2xl">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};

export default OfferDetailsSkeleton;

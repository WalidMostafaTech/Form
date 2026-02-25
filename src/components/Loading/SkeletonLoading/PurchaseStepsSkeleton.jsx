import { Skeleton } from "@/components/ui/skeleton";

const PurchaseStepsSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4 lg:gap-8">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center gap-2 card relative flex-1 min-w-[200px]"
        >
          <Skeleton className="w-8 h-8 rounded-full mb-2" />
          <Skeleton className="w-16 h-16 rounded-xl mb-4" />
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
      ))}
    </div>
  );
};

export default PurchaseStepsSkeleton;

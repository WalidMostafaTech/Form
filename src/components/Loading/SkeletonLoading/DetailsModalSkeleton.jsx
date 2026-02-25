import { Skeleton } from "@/components/ui/skeleton";

const DetailsModalSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full h-[200px] md:h-[300px] rounded-xl" />

      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx}>
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
};

export default DetailsModalSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

const PageBannerSkeleton = () => {
  return (
    <div className="relative h-72 w-full">
      <Skeleton className="absolute inset-0 h-full w-full bg-primary/20" />
      <div className="absolute bottom-6 left-6 flex flex-col gap-2 w-2/3">
        <Skeleton className="h-8 w-1/2 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
      </div>
    </div>
  );
};

export default PageBannerSkeleton;

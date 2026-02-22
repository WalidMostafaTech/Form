import { Skeleton } from "@/components/ui/skeleton";

const AccountsSkeleton = () => {
  return (
    <article className="container py-6 lg:py-10 space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-fit">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="card flex flex-col items-center text-center gap-2"
          >
            <Skeleton className="w-full max-h-[70px] h-24" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </article>
  );
};

export default AccountsSkeleton;

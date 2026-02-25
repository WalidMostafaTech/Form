import { Skeleton } from "@/components/ui/skeleton";

const PaymentListSkeleton = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-center">
        <Skeleton className="w-40 h-8 mx-auto" />
      </h3>

      <div className="grid grid-cols-2 gap-4 h-fit">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="card flex flex-col items-center text-center gap-2"
          >
            <Skeleton className="w-full h-[70px] rounded-lg" />
            <Skeleton className="w-24 h-5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentListSkeleton;

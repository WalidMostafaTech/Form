import { Skeleton } from "@/components/ui/skeleton";
import logo from "@/assets/images/logo.png";

const FooterSkeleton = () => {
  return (
    <footer className="bg-background container">
      <section className="flex flex-col items-center gap-6 py-4">
        {/* Payment Platforms */}
        <div className="flex items-center gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-12 h-8 rounded" />
          ))}
        </div>

        <img loading="lazy" src={logo} alt="Logo" />

        {/* Footer Text */}
        <div className="space-y-2 max-w-3xl w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-6 h-6 rounded-full" />
          ))}
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="py-4 border-t w-full">
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>
    </footer>
  );
};

export default FooterSkeleton;

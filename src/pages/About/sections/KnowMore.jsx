import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import KnowMoreSkeleton from "@/components/Loading/SkeletonLoading/KnowMoreSkeleton";
import { useTranslation } from "react-i18next";

const KnowMore = ({ data, loading }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  if (loading) return <KnowMoreSkeleton />;

  if (!data) return null;

  return (
    <section
      className="sectionPadding bg-center bg-cover relative bg-primary"
      style={{ backgroundImage: `url(${data?.image})` }}
    >
      <div className="absolute inset-0 bg-primary/80" />

      <div className="w-full max-w-3xl p-4 mx-auto relative z-10 flex flex-col items-center text-center gap-6 lg:gap-10 text-white">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold">
          {data?.title}
        </h2>

        <p className="text-muted/80 text-sm">{data?.description}</p>

        <Button
          size="lg"
          onClick={() => navigate("/contact")}
          variant="outline"
          className={"rounded-full font-bold min-w-38 text-lg"}
        >
          {t("call_us")}
        </Button>
      </div>
    </section>
  );
};

export default KnowMore;

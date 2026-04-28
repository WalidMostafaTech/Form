import { useTranslation } from "react-i18next";
import SectionTitle from "@/components/common/SectionTitle";
import ProductCard from "@/components/cards/ProductCard";
import MainSlider from "./MainSlider";
import BestSellersSkeleton from "../Loading/SkeletonLoading/BestSellersSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getBestSelling } from "@/api/mainServices";

const BestSellers = () => {
  const { t } = useTranslation();

  const { data: bestSellers, isLoading } = useQuery({
    queryKey: ["bestSellers"],
    queryFn: getBestSelling,
  });

  if (isLoading) return <BestSellersSkeleton />;

  if (!bestSellers || bestSellers?.length === 0) return null;

  return (
    <section className="sectionPadding">
      <div className="container">
        <SectionTitle
          title={t("BestSellers.title")}
          spanTitle={t("BestSellers.spanTitle")}
          link={"/shop"}
          linkText={t("BestSellers.viewAll")}
        />

        <MainSlider
          data={bestSellers || []}
          renderItem={(product) => <ProductCard product={product} />}
        />
      </div>
    </section>
  );
};

export default BestSellers;

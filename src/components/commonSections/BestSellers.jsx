import SectionTitle from "@/components/common/SectionTitle";
import ProductCard from "@/components/cards/ProductCard";
import MainSlider from "./MainSlider";
import BestSellersSkeleton from "../Loading/SkeletonLoading/BestSellersSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productsServices";

const BestSellers = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", 0],
    queryFn: () => getProducts({ category_id: 0, sale_type: "retail" }),
  });

  if (isLoading) return <BestSellersSkeleton />;

  return (
    <section className="sectionPadding">
      <div className="container">
        <SectionTitle
          title="best"
          spanTitle="sellers"
          link={"/shop"}
          linkText={"view all products"}
        />

        <MainSlider
          data={products?.items || []}
          breakpoints={{
            0: { slidesPerView: 2 },
            560: { slidesPerView: 2.8 },
            640: { slidesPerView: 3.3 },
            1024: { slidesPerView: 4.2 },
          }}
          renderItem={(product) => <ProductCard product={product} />}
        />
      </div>
    </section>
  );
};
export default BestSellers;

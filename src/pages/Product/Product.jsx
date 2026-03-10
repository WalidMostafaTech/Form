import ProductDetails from "./sections/ProductDetails";
import ProductImages from "./sections/ProductImages";
import PageBanner from "@/components/commonSections/PageBanner";
import BestSellers from "@/components/commonSections/BestSellers";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { getProduct, getProductsHero } from "@/api/productsServices";
import ProductDetailsSkeleton from "@/components/Loading/SkeletonLoading/ProductDetailsSkeleton";

const Product = () => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sale_type = searchParams.get("sale_type") || "retail";

  const { data: product, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProduct({ slug, sale_type }),
  });

  const { data: productHero, isLoading: isLoadingHero } = useQuery({
    queryKey: ["productHero"],
    queryFn: getProductsHero,
  });

  return (
    <main>
      <PageBanner
        image={productHero?.image}
        title={product?.name}
        description={productHero?.description}
        html={true}
        loading={isLoadingHero}
      />

      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <section className="container w-full lg:max-w-5xl pagePadding grid grid-cols-1 sm:grid-cols-2 gap-10">
          <ProductImages images={product?.images} />
          <ProductDetails product={product} />
        </section>
      )}

      <BestSellers />
    </main>
  );
};

export default Product;

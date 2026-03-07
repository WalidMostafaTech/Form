import { getCategoriesHero, getProducts } from "@/api/productsServices";
import ProductCard from "@/components/cards/ProductCard";
import OptionSelector from "@/components/common/OptionSelector";
import SectionTitle from "@/components/common/SectionTitle";
import EmptyDataSection from "@/components/commonSections/EmptyDataSection";
import PageBanner from "@/components/commonSections/PageBanner";
import ProductsSkeleton from "@/components/Loading/SkeletonLoading/ProductsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";

const ProductsPage = ({ saleType, title = "Shop" }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = Number(searchParams.get("category")) || 0;

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", saleType, selectedCategory],
    queryFn: () =>
      getProducts({ category_id: selectedCategory, sale_type: saleType }),
  });

  const { data: categoryHero, isLoading: isLoadingHero } = useQuery({
    queryKey: ["categoryHero"],
    queryFn: getCategoriesHero,
  });

  const { categories } = useSelector((state) => state.categories);

  const isEmpty = !isLoading && (products?.items?.length === 0 || !products);

  return (
    <main>
      <PageBanner
        image={categoryHero?.image}
        title={title}
        description={categoryHero?.description}
        html={true}
        loading={isLoadingHero}
      />

      <section className="container pagePadding">
        <SectionTitle
          title={
            categories?.find((c) => c.id === selectedCategory)?.name || "All"
          }
        />

        <OptionSelector
          options={categories}
          selected={selectedCategory}
          className="mb-8"
          onSelect={(category) => {
            if (category.id === "0") {
              setSearchParams({});
            } else {
              setSearchParams({ category: category.id });
            }
          }}
        />

        {isLoading ? (
          <ProductsSkeleton />
        ) : isEmpty ? (
          <EmptyDataSection msg={"no products found"} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.items?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                sale_type={saleType}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductsPage;

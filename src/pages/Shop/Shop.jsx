import { getCategoriesHero, getProducts } from "@/api/productsServices";
import ProductCard from "@/components/cards/ProductCard";
import SectionTitle from "@/components/common/SectionTitle";
import EmptyDataSection from "@/components/commonSections/EmptyDataSection";
import PageBanner from "@/components/commonSections/PageBanner";
import ProductsSkeleton from "@/components/Loading/SkeletonLoading/ProductsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = Number(searchParams.get("category")) || 0;

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      getProducts({ category_id: selectedCategory, sale_type: "retail" }),
  });

  const { data: categoryHero, isLoading: isLoadingHero } = useQuery({
    queryKey: ["categoryHero"],
    queryFn: getCategoriesHero,
  });

  const { categories } = useSelector((state) => state.categories);

  return (
    <main>
      <PageBanner
        image={categoryHero?.image}
        title="Shop"
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

        <ul className="flex items-center flex-wrap gap-2 mb-8">
          {categories?.map((category) => (
            <li
              key={category.id}
              className={`text-sm px-4 py-2 cursor-pointer rounded-md border transition ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-primary-foreground hover:bg-primary/10"
              }`}
              onClick={() => {
                if (category.id === "0") {
                  setSearchParams({});
                } else {
                  setSearchParams({ category: category.id });
                }
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>

        {isLoading ? (
          <ProductsSkeleton />
        ) : products?.items?.length === 0 ? (
          <EmptyDataSection msg={"Products not found"} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.items?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                sale_type="retail"
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Shop;

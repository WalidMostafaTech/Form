import { getCategoriesHero, getProducts } from "@/api/productsServices";
import ProductCard from "@/components/cards/ProductCard";
import MainPagination from "@/components/common/MainPagination";
import OptionSelector from "@/components/common/OptionSelector";
import SectionTitle from "@/components/common/SectionTitle";
import EmptyDataSection from "@/components/commonSections/EmptyDataSection";
import PageBanner from "@/components/commonSections/PageBanner";
import ProductsSkeleton from "@/components/Loading/SkeletonLoading/ProductsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

const ProductsPage = ({ saleType, title }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = Number(searchParams.get("category")) || 0;
  const page = Number(searchParams.get("page")) || 1;

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", saleType, selectedCategory, page],
    queryFn: () =>
      getProducts({
        category_id: selectedCategory,
        sale_type: saleType,
        page,
      }),
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
        title={title || t("productsPage.shopTitle")}
        description={categoryHero?.description}
        html={true}
        loading={isLoadingHero}
      />

      <section className="container pagePadding">
        <SectionTitle
          title={
            categories?.find((c) => c.id === selectedCategory)?.name ||
            t("productsPage.allCategories")
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
              setSearchParams({ category: category.id, page: 1 });
            }
          }}
        />

        {isLoading ? (
          <ProductsSkeleton />
        ) : isEmpty ? (
          <EmptyDataSection msg={t("productsPage.noProducts")} />
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

        <MainPagination
          totalPages={products?.meta?.last_page}
          currentPage={page}
          onPageChange={(newPage) => {
            const params = {};
            if (selectedCategory) params.category = selectedCategory;
            params.page = newPage;

            setSearchParams(params);
          }}
        />
      </section>
    </main>
  );
};

export default ProductsPage;

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
import ProductsFilter from "./section/ProductsFilter";
import SeoManager from "@/utils/SeoManager";
import { Button } from "@/components/ui/button";
import { HiOutlineClipboardList } from "react-icons/hi";

const ProductsPage = ({ saleType, title }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const subCategory = searchParams.get("sub_category") || "";
  const search = searchParams.get("search") || "";
  const sortPrice = searchParams.get("sort_price") || "";

  const selectedCategory = Number(searchParams.get("category")) || 0;
  const page = Number(searchParams.get("page")) || 1;

  const { data: products, isLoading } = useQuery({
    queryKey: [
      "products",
      saleType,
      selectedCategory,
      subCategory,
      search,
      sortPrice,
      page,
    ],
    queryFn: () =>
      getProducts({
        category_id: selectedCategory,
        sub_category_id: subCategory,
        sale_type: saleType,
        page,
        search,
        sort_price: sortPrice,
      }),
  });

  const { data: categoryHero, isLoading: isLoadingHero } = useQuery({
    queryKey: ["categoryHero"],
    queryFn: getCategoriesHero,
  });

  const { categories } = useSelector((state) => state.categories);
  const { settings } = useSelector((state) => state.settings);

  const isEmpty = !isLoading && (products?.items?.length === 0 || !products);

  return (
    <>
      <SeoManager
        title={products?.meta?.seo?.meta_title}
        description={products?.meta?.seo?.meta_description}
        keywords={products?.meta?.seo?.keywords}
        canonical={products?.meta?.seo?.canonical_url}
        ogImage={products?.meta?.seo?.og_image}
      />

      <main>
        <PageBanner
          image={categoryHero?.image}
          title={title || t("productsPage.shopTitle")}
          description={categoryHero?.description}
          html={true}
          loading={isLoadingHero}
        />

        <section className="container pagePadding space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <SectionTitle
              title={
                categories?.find((c) => c.id === selectedCategory)?.name ||
                t("productsPage.allCategories")
              }
              margin={false}
            />

            {saleType === "wholesale" && settings?.prices_file && (
              <Button
                size="sm"
                onClick={() => window.open(settings?.prices_file, "_blank")}
              >
                {t("productsPage.downloadPricesFile")}{" "}
                <HiOutlineClipboardList />
              </Button>
            )}
          </div>

          <OptionSelector
            options={categories}
            selected={selectedCategory}
            onSelect={(category) => {
              if (category.id === "0") {
                setSearchParams({});
              } else {
                setSearchParams({ category: category.id, page: 1 });
              }
            }}
          />

          <ProductsFilter selectedCategory={selectedCategory} />

          {isLoading ? (
            <ProductsSkeleton />
          ) : isEmpty ? (
            <EmptyDataSection msg={t("productsPage.noProducts")} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
    </>
  );
};

export default ProductsPage;

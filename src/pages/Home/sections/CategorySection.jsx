import SectionTitle from "@/components/common/SectionTitle";
import CategoryCard from "@/components/cards/CategoryCard";
import MainSlider from "@/components/commonSections/MainSlider";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/homeServices";
import CategorySectionSkeleton from "@/components/Loading/SkeletonLoading/CategorySectionSkeleton";

const CategorySection = () => {
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <CategorySectionSkeleton />;

  if (!categoriesData || categoriesData.length === 0) return null;

  return (
    <section className="bg-primary-foreground sectionPadding">
      <div className="container">
        <SectionTitle title="shop by" spanTitle="category" />

        <MainSlider
          data={categoriesData}
          renderItem={(category) => <CategoryCard category={category} />}
        />
      </div>
    </section>
  );
};

export default CategorySection;

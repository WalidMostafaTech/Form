import SectionTitle from "@/components/common/SectionTitle";
import image from "@/assets/images/product-img.png";
import CategoryCard from "@/components/cards/CategoryCard";
import MainSlider from "@/components/commonSections/MainSlider";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/homeServices";

const CategorySection = () => {
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!categoriesData || categoriesData.length === 0) return null;

  // const categories = [
  //   {
  //     id: 1,
  //     title: "Specialty Beans",
  //     short_description: "Single origin & boutique blends.",
  //     long_description:
  //       "Single origin & boutique blends. Single origin & boutique blends.",
  //     image: image,
  //   },
  //   {
  //     id: 2,
  //     title: "Specialty Beans",
  //     short_description: "Single origin & boutique blends.",
  //     long_description:
  //       "Single origin & boutique blends. Single origin & boutique blends.",
  //     image: image,
  //   },
  //   {
  //     id: 3,
  //     title: "Specialty Beans",
  //     short_description: "Single origin & boutique blends.",
  //     long_description:
  //       "Single origin & boutique blends. Single origin & boutique blends.",
  //     image: image,
  //   },
  //   {
  //     id: 4,
  //     title: "Specialty Beans",
  //     short_description: "Single origin & boutique blends.",
  //     long_description:
  //       "Single origin & boutique blends. Single origin & boutique blends.",
  //     image: image,
  //   },
  // ];

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

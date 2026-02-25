import PageBanner from "@/components/commonSections/PageBanner";
import image from "@/assets/images/bg-img.jpg";
import CategoryCard from "@/components/cards/CategoryCard";
import SectionTitle from "@/components/common/SectionTitle";

const Shop = () => {
  const categories = [
    {
      id: 1,
      title: "Specialty Beans",
      short_description: "Single origin & boutique blends.",
      long_description:
        "Single origin & boutique blends. Single origin & boutique blends.",
      image: image,
    },
    {
      id: 2,
      title: "Specialty Beans",
      short_description: "Single origin & boutique blends.",
      long_description:
        "Single origin & boutique blends. Single origin & boutique blends.",
      image: image,
    },
    {
      id: 3,
      title: "Specialty Beans",
      short_description: "Single origin & boutique blends.",
      long_description:
        "Single origin & boutique blends. Single origin & boutique blends.",
      image: image,
    },
    {
      id: 4,
      title: "Specialty Beans",
      short_description: "Single origin & boutique blends.",
      long_description:
        "Single origin & boutique blends. Single origin & boutique blends.",
      image: image,
    },
  ];
  return (
    <main>
      <PageBanner
        image={image}
        title={"shop"}
        description={
          "Explore our wide range of products and find the perfect items for your needs."
        }
      />

      <section className="container pagePadding">
        <SectionTitle title="shop by" spanTitle="category" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard category={category} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Shop;

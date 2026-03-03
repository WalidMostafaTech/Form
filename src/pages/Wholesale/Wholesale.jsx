import image from "@/assets/images/product-img.png";
import ProductCard from "@/components/cards/ProductCard";
import SectionTitle from "@/components/common/SectionTitle";
import PageBanner from "@/components/commonSections/PageBanner";
import { useSearchParams } from "react-router";

const Wholesale = () => {
  const products = [
    {
      id: 1,
      title: "Copper Brew Kit",
      description:
        "Sourced from carefully selected farms and roasted with precision, every cup",
      price: 29.99,
      min_weight: "250",
      max_weight: "500",
      image: image,
    },
    {
      id: 2,
      title: "Copper Brew Kit",
      description:
        "Sourced from carefully selected farms and roasted with precision, every cup",
      price: 29.99,
      min_weight: "250",
      max_weight: "500",
      image: image,
    },
    {
      id: 3,
      title: "Copper Brew Kit",
      description:
        "Sourced from carefully selected farms and roasted with precision, every cup",
      price: 29.99,
      min_weight: "250",
      max_weight: "500",
      image: image,
    },
    {
      id: 4,
      title: "Copper Brew Kit",
      description:
        "Sourced from carefully selected farms and roasted with precision, every cup",
      price: 29.99,
      min_weight: "250",
      max_weight: "500",
      image: image,
    },
    {
      id: 5,
      title: "Copper Brew Kit",
      description:
        "Sourced from carefully selected farms and roasted with precision, every cup",
      price: 29.99,
      min_weight: "250",
      max_weight: "500",
      image: image,
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";

  const categories = [
    { id: 1, name: "All", value: "all" },
    { id: 2, name: "Coffee Menu", value: "coffee-menu" },
    { id: 3, name: "Coffee Beans", value: "coffee-beans" },
    { id: 4, name: "Accessories", value: "accessories" },
  ];

  return (
    <main>
      <PageBanner
        image={image}
        title="Shop"
        description="Explore our wide range of products and find the perfect items for your needs."
      />

      <section className="container pagePadding">
        <SectionTitle
          title={selectedCategory === "all" ? "Shop" : selectedCategory}
        />

        <ul className="flex items-center flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`text-sm px-4 py-2 cursor-pointer rounded-md border ${
                selectedCategory === category.value
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-gray-300"
              }`}
              onClick={() => {
                if (category.value === "all") {
                  setSearchParams({});
                } else {
                  setSearchParams({ category: category.value });
                }
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Wholesale;

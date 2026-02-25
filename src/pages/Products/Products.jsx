import image from "@/assets/images/product-img.png";
import ProductCard from "@/components/cards/ProductCard";
import SectionTitle from "@/components/common/SectionTitle";
import PageBanner from "@/components/commonSections/PageBanner";

const Products = () => {
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
  return (
    <main>
      <PageBanner
        image={image}
        title="Shop"
        description="Explore our wide range of products and find the perfect items for your needs."
      />

      <section className="container pagePadding">
        <SectionTitle title="Coffee Beans" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      </section>
    </main>
  );
};

export default Products;

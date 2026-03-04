import SectionTitle from "@/components/common/SectionTitle";
import image from "@/assets/images/product-img.png";
import ProductCard from "@/components/cards/ProductCard";

const Favourites = () => {
  const products = [
    {
      id: 1,
      title: "Copper Brew Kit",
      slug: "copper-brew-kit",
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
      slug: "copper-brew-kit",
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
      slug: "copper-brew-kit",
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
      slug: "copper-brew-kit",
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
      slug: "copper-brew-kit",
      description:
        "Sourced from carefully selected farms and roasted with precision, every cup",
      price: 29.99,
      min_weight: "250",
      max_weight: "500",
      image: image,
    },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="Favourites" />

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;

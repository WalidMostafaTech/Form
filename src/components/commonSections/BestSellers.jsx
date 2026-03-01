import SectionTitle from "@/components/common/SectionTitle";
import image from "@/assets/images/product-img.png";
import ProductCard from "@/components/cards/ProductCard";
import MainSlider from "./MainSlider";

const BestSellers = () => {
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
    <section className="sectionPadding">
      <div className="container">
        <SectionTitle
          title="best"
          spanTitle="sellers"
          link={"/shop"}
          linkText={"view all products"}
        />

        <MainSlider
          data={products}
          breakpoints={{
            0: { slidesPerView: 2 },
            560: { slidesPerView: 2.8 },
            640: { slidesPerView: 3.3 },
            1024: { slidesPerView: 4.2 },
          }}
          renderItem={(product) => <ProductCard product={product} />}
        />
      </div>
    </section>
  );
};
export default BestSellers;

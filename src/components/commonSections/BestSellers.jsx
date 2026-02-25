import SectionTitle from "@/components/common/SectionTitle";
import image from "@/assets/images/product-img.png";
import ProductCard from "@/components/cards/ProductCard";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

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

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          navigation
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            560: {
              slidesPerView: 2.8,
            },
            640: {
              slidesPerView: 3.3,
            },
            1024: {
              slidesPerView: 4.2,
            },
          }}
          className="categorySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default BestSellers;

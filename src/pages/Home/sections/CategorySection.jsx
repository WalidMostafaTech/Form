import SectionTitle from "@/components/common/SectionTitle";
import image from "@/assets/images/product-img.png";
import CategoryCard from "@/components/cards/CategoryCard";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const CategorySection = () => {
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
    <section className="bg-primary-foreground sectionPadding">
      <div className="container">
        <SectionTitle title="shop by" spanTitle="category" />

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          navigation
          breakpoints={{
            0: {
              slidesPerView: 1.2,
            },
            560: {
              slidesPerView: 1.8,
            },
            640: {
              slidesPerView: 2.3,
            },
            1024: {
              slidesPerView: 3.2,
            },
          }}
          className="categorySwiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySection;

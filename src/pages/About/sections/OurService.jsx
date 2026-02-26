import SectionTitle from "@/components/common/SectionTitle";
import image from "@/assets/images/product-img.png";
import ServiceCard from "@/components/cards/ServiceCard";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const OurService = () => {
  const services = [
    {
      id: 1,
      title: "Specialty Coffee Roasting",
      description:
        "We carefully roast premium coffee beans in small batches to ensure balanced flavor, rich aroma, and consistent quality",
      image: image,
    },
    {
      id: 2,
      title: "Specialty Coffee Roasting",
      description:
        "We carefully roast premium coffee beans in small batches to ensure balanced flavor, rich aroma, and consistent quality",
      image: image,
    },
    {
      id: 3,
      title: "Specialty Coffee Roasting",
      description:
        "We carefully roast premium coffee beans in small batches to ensure balanced flavor, rich aroma, and consistent quality",
      image: image,
    },
    {
      id: 4,
      title: "Specialty Coffee Roasting",
      description:
        "We carefully roast premium coffee beans in small batches to ensure balanced flavor, rich aroma, and consistent quality",
      image: image,
    },
  ];

  return (
    <section className="bg-primary-foreground sectionPadding">
      <div className="container">
        <SectionTitle title="Our" spanTitle="Services" />

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
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <ServiceCard service={service} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurService;

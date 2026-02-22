import SectionTitle from "@/components/common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import SwiperNavigation from "@/components/common/SwiperNavigation";
import TestimonialsCard from "@/components/cards/TestimonialsCard";
import { useSelector } from "react-redux";
import TestimonialsSkeleton from "@/components/Loading/SkeletonLoading/TestimonialsSkeleton";
import { useTranslation } from "react-i18next";

const Testimonials = ({ data = [], isLoading }) => {
  const { lang } = useSelector((state) => state.language);
  const { t } = useTranslation();

  if (isLoading) {
    return <TestimonialsSkeleton />;
  }

  if (!data || data.length === 0) return null;

  return (
    <section className="sectionPadding container">
      <SectionTitle title={t("testimonials.title")} />

      <Swiper
        dir={lang === "ar" ? "rtl" : "ltr"}
        modules={[Navigation]}
        spaceBetween={16}
        navigation={{
          prevEl: ".testimonials-prev",
          nextEl: ".testimonials-next",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2.3,
          },
          1024: {
            slidesPerView: 3.5,
          },
        }}
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <TestimonialsCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <SwiperNavigation name="testimonials" />
    </section>
  );
};

export default Testimonials;

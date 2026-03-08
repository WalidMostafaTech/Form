import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import { useSelector } from "react-redux";

const ProductImages = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { lang } = useSelector((state) => state.language);

  return (
    <section>
      {/* Main Image */}
      <Swiper
        dir={lang === "ar" ? "rtl" : "ltr"}
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="rounded-2xl overflow-hidden"
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              loading="lazy"
              src={img}
              alt="product"
              className="w-full aspect-square object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        dir={lang === "ar" ? "rtl" : "ltr"}
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        className="mt-4"
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              loading="lazy"
              src={img}
              alt="thumb"
              className={`w-full aspect-square object-cover rounded-xl cursor-pointer border transition-all ${
                index === activeIndex
                  ? "border-2 border-primary"
                  : "border-gray-200 opacity-70"
              }`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductImages;

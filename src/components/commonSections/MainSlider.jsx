import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useRef, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";

const MainSlider = ({
  data = [],
  renderItem,
  breakpoints = {
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
  },
  spaceBetween = 24,
  className = "",
}) => {
  const swiperRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const { lang } = useSelector((state) => state.language);

  return (
    <div className="flex items-center gap-2">
      {/* Prev */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={isBeginning}
        className={`main_slider_btn transition ${
          isBeginning ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <FaArrowLeftLong className="rtl:rotate-180" />
      </button>

      <Swiper
        dir={lang === "ar" ? "rtl" : "ltr"}
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className={`${className} flex-1`}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={item?.id || index}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>

      {/* Next */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd}
        className={`main_slider_btn transition ${
          isEnd ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <FaArrowRightLong className="rtl:rotate-180" />
      </button>
    </div>
  );
};

export default MainSlider;

import { getLocationSliders } from "@/api/mainServices";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import LocationSkeleton from "@/components/Loading/SkeletonLoading/LocationSkeleton";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Location = () => {
  const { t } = useTranslation();


  const {settings} = useSelector(state => state.settings)

  const { data: locationSliders = [], isLoading } = useQuery({
    queryKey: ["locationSliders"],
    queryFn: getLocationSliders,
  });

  if (isLoading) return <LocationSkeleton />;

  return (
    <main>
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="h-[calc(100vh-30px)] location-swiper"
      >
        {locationSliders.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="sectionPadding bg-center bg-cover relative h-[calc(100vh-30px)]"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-primary/40" />

              <div className="w-full p-4 max-w-2xl mx-auto text-center h-full flex flex-col items-center justify-center gap-6 relative z-10 text-white">
                <p className="tracking-widest uppercase text-lg">
                  {item.title}
                </p>

                <img
                  loading="lazy"
                  src={settings?.header_logo || logo}
                  alt="logo"
                  className="w-60 lg:w-80"
                />

                <p className="text-lg">{item.description}</p>

                <a href={item.link} target="_blank" rel="noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-w-32 font-bold text-lg"
                  >
                    {t("Visit")}
                  </Button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Location;

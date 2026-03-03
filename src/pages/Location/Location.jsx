import { getLocationSliders } from "@/api/mainServices";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Location = () => {
  const { data: locationSliders = [], isLoading } = useQuery({
    queryKey: ["locationSliders"],
    queryFn: getLocationSliders,
  });

  if (isLoading) return <div>Loading...</div>;

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
        className="h-dvh location-swiper"
      >
        {locationSliders.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="sectionPadding bg-center bg-cover relative h-dvh"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-primary/60" />

              <div className="w-full p-4 max-w-2xl mx-auto text-center h-full flex flex-col items-center justify-center gap-6 relative z-10 text-white">
                <p className="text-xs tracking-widest uppercase">
                  {item.title}
                </p>

                <img src={logo} alt="logo" />

                <p>{item.description}</p>

                <a href={item.link} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="min-w-32">
                    Visit
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

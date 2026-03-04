import Hero from "./sections/Hero";
import OurStory from "../../components/commonSections/OurStory";
import CategorySection from "./sections/CategorySection";
import BestSellers from "../../components/commonSections/BestSellers";
import WhyChooseForm from "./sections/WhyChooseForm";
import WhatTheySay from "../../components/commonSections/WhatTheySay";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "@/api/homeServices";
import OurService from "@/components/commonSections/OurService";

const Home = () => {
  const { data: homeData, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
  });

  return (
    <main>
      <Hero video={homeData?.introduction_video} loading={isLoading} />
      <OurStory />
      <CategorySection />
      <BestSellers />
      <WhyChooseForm data={homeData?.why_choose_us} loading={isLoading} />
      <OurService />
      <WhatTheySay />
    </main>
  );
};

export default Home;

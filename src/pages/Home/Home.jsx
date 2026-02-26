import Hero from "./sections/Hero";
import OurStory from "../../components/commonSections/OurStory";
import CategorySection from "./sections/CategorySection";
import BestSellers from "../../components/commonSections/BestSellers";
import WhyChooseForm from "./sections/WhyChooseForm";
import WhatTheySay from "../../components/commonSections/WhatTheySay";

const Home = () => {
  return (
    <main>
      <Hero />
      <OurStory />
      <CategorySection />
      <BestSellers />
      <WhyChooseForm />
      <WhatTheySay />
    </main>
  );
};

export default Home;

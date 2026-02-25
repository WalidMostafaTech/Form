import Hero from "./sections/Hero";
import OurStory from "./sections/OurStory";
import CategorySection from "./sections/CategorySection";
import BestSellers from "../../components/commonSections/BestSellers";
import WhyChooseForm from "./sections/WhyChooseForm";
import WhatTheySay from "./sections/WhatTheySay";

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

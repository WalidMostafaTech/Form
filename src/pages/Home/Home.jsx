import Hero from "./sections/Hero";
import OurStory from "./sections/OurStory";
import CategorySection from "./sections/CategorySection";
import BestSellers from "./sections/BestSellers";
import WhyChooseForm from "./sections/WhyChooseForm";
import WhatTheySay from "./sections/WhatTheySay";

const Home = () => {
  return (
    <article>
      <Hero />
      <OurStory />
      <CategorySection />
      <BestSellers />
      <WhyChooseForm />
      <WhatTheySay />
    </article>
  );
};

export default Home;

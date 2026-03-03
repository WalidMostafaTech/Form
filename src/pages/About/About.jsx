import PageBanner from "@/components/commonSections/PageBanner";
import image from "@/assets/images/bg-img.jpg";
import VisionAndMission from "./sections/VisionAndMission";
import KnowMore from "./sections/KnowMore";
import OurService from "../../components/commonSections/OurService";
import OurStory from "@/components/commonSections/OurStory";
import WhatTheySay from "@/components/commonSections/WhatTheySay";

const About = () => {
  return (
    <main>
      <PageBanner
        image={image}
        title={"about us"}
        description={
          "Learn more about our company and our mission to provide the best products and services."
        }
      />

      <OurStory />
      <VisionAndMission />
      <KnowMore />
      <OurService />
      <WhatTheySay />
    </main>
  );
};

export default About;

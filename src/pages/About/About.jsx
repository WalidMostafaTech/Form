import PageBanner from "@/components/commonSections/PageBanner";
import VisionAndMission from "./sections/VisionAndMission";
import KnowMore from "./sections/KnowMore";
import OurService from "../../components/commonSections/OurService";
import OurStory from "@/components/commonSections/OurStory";
import WhatTheySay from "@/components/commonSections/WhatTheySay";
import { useQuery } from "@tanstack/react-query";
import { getAboutPage } from "@/api/mainServices";

const About = () => {
  const { data: aboutPage, isLoading } = useQuery({
    queryKey: ["aboutPage"],
    queryFn: getAboutPage,
  });

  return (
    <main>
      <PageBanner
        image={aboutPage?.image}
        title={"about us"}
        description={aboutPage?.description}
        html={true}
        loading={isLoading}
      />

      <OurStory />
      <VisionAndMission data={aboutPage} loading={isLoading} />
      <KnowMore />
      <OurService />
      <WhatTheySay />
    </main>
  );
};

export default About;

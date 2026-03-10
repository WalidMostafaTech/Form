import PageBanner from "@/components/commonSections/PageBanner";
import VisionAndMission from "./sections/VisionAndMission";
import KnowMore from "./sections/KnowMore";
import OurService from "../../components/commonSections/OurService";
import OurStory from "@/components/commonSections/OurStory";
import WhatTheySay from "@/components/commonSections/WhatTheySay";
import { useQuery } from "@tanstack/react-query";
import { getAboutPage } from "@/api/mainServices";
import { useTranslation } from "react-i18next";
import SeoManager from "@/utils/SeoManager";

const About = () => {
  const { data: aboutPage, isLoading } = useQuery({
    queryKey: ["aboutPage"],
    queryFn: getAboutPage,
  });

  const { t } = useTranslation();

  return (
    <>
      <SeoManager
        title={aboutPage?.seo?.meta_title}
        description={aboutPage?.seo?.meta_description}
        keywords={aboutPage?.seo?.keywords}
        canonical={aboutPage?.seo?.canonical_url}
        ogImage={aboutPage?.seo?.og_image}
      />

      <main>
        <PageBanner
          image={aboutPage?.image}
          title={t("About_Us")}
          description={aboutPage?.description}
          html={true}
          loading={isLoading}
        />

        <OurStory />
        <VisionAndMission
          vision={aboutPage?.vision}
          mission={aboutPage?.mission}
          loading={isLoading}
        />
        <KnowMore data={aboutPage?.to_know_more} loading={isLoading} />
        <OurService />
        <WhatTheySay />
      </main>
    </>
  );
};

export default About;

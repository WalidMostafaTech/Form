import SectionTitle from "@/components/common/SectionTitle";
import image from "@/assets/images/product-img.png";
import ServiceCard from "@/components/cards/ServiceCard";
import MainSlider from "@/components/commonSections/MainSlider";

const OurService = () => {
  const services = [
    {
      id: 1,
      title: "Specialty Coffee Roasting",
      description:
        "We carefully roast premium coffee beans in small batches to ensure balanced flavor, rich aroma, and consistent quality",
      image: image,
    },
    {
      id: 2,
      title: "Specialty Coffee Roasting",
      description:
        "We carefully roast premium coffee beans in small batches to ensure balanced flavor, rich aroma, and consistent quality",
      image: image,
    },
    {
      id: 3,
      title: "Specialty Coffee Roasting",
      description:
        "We carefully roast premium coffee beans in small batches to ensure balanced flavor, rich aroma, and consistent quality",
      image: image,
    },
    {
      id: 4,
      title: "Specialty Coffee Roasting",
      description:
        "We carefully roast premium coffee beans in small batches to ensure balanced flavor, rich aroma, and consistent quality",
      image: image,
    },
  ];

  return (
    <section className="bg-primary-foreground sectionPadding">
      <div className="container">
        <SectionTitle title="Our" spanTitle="Services" />

        <MainSlider
          data={services}
          renderItem={(service) => <ServiceCard service={service} />}
        />
      </div>
    </section>
  );
};

export default OurService;

import SectionTitle from "@/components/common/SectionTitle";
import image from "@/assets/images/product-img.png";
import TestimonialCard from "@/components/cards/TestimonialCard";
import MainSlider from "./MainSlider";

const WhatTheySay = () => {
  const testimonials = [
    {
      id: 1,
      name: "Mohamed Ahmed",
      job: "CEO for form company",
      image: image,
      feedback:
        "At FORM, we believe coffee is more than a drink — it’s a daily ritual crafted to slow you down and reconnect you with what truly matters.",
    },
    {
      id: 2,
      name: "Mohamed Ahmed",
      job: "CEO for form company",
      image: image,
      feedback:
        "At FORM, we believe coffee is more than a drink — it’s a daily ritual crafted to slow you down and reconnect you with what truly matters.",
    },
    {
      id: 3,
      name: "Mohamed Ahmed",
      job: "CEO for form company",
      image: image,
      feedback:
        "At FORM, we believe coffee is more than a drink — it’s a daily ritual crafted to slow you down and reconnect you with what truly matters.",
    },
    {
      id: 4,
      name: "Mohamed Ahmed",
      job: "CEO for form company",
      image: image,
      feedback:
        "At FORM, we believe coffee is more than a drink — it’s a daily ritual crafted to slow you down and reconnect you with what truly matters.",
    },
    {
      id: 5,
      name: "Mohamed Ahmed",
      job: "CEO for form company",
      image: image,
      feedback:
        "At FORM, we believe coffee is more than a drink — it’s a daily ritual crafted to slow you down and reconnect you with what truly matters.",
    },
  ];

  return (
    <section className="sectionPadding">
      <div className="container">
        <SectionTitle title="what they" spanTitle="say" />

        <p className="text-muted-foreground text-sm mb-4">
          We honor the journey from soil to sip, ensuring every bean carries the
          richness of its origin and the care of expert roasting.We honor the
          journey from soil to sip, ensuring every bean carries the richness of
          its origin and the
        </p>

        <MainSlider
          data={testimonials}
          renderItem={(testimonial) => (
            <TestimonialCard testimonial={testimonial} />
          )}
        />
      </div>
    </section>
  );
};

export default WhatTheySay;

import SectionTitle from "@/components/common/SectionTitle";
import image from "@/assets/images/product-img.png";
import TestimonialCard from "@/components/cards/TestimonialCard";
import MainSlider from "./MainSlider";
import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/api/homeServices";

const WhatTheySay = () => {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!testimonials || testimonials?.items?.length === 0) return null;

  // const testimonials = [
  //   {
  //     id: 1,
  //     name: "Mohamed Ahmed",
  //     job: "CEO for form company",
  //     image: image,
  //     feedback:
  //       "At FORM, we believe coffee is more than a drink — it’s a daily ritual crafted to slow you down and reconnect you with what truly matters.",
  //   },
  //   {
  //     id: 2,
  //     name: "Mohamed Ahmed",
  //     job: "CEO for form company",
  //     image: image,
  //     feedback:
  //       "At FORM, we believe coffee is more than a drink — it’s a daily ritual crafted to slow you down and reconnect you with what truly matters.",
  //   },
  //   {
  //     id: 3,
  //     name: "Mohamed Ahmed",
  //     job: "CEO for form company",
  //     image: image,
  //     feedback:
  //       "At FORM, we believe coffee is more than a drink — it’s a daily ritual crafted to slow you down and reconnect you with what truly matters.",
  //   },
  //   {
  //     id: 4,
  //     name: "Mohamed Ahmed",
  //     job: "CEO for form company",
  //     image: image,
  //     feedback:
  //       "At FORM, we believe coffee is more than a drink — it’s a daily ritual crafted to slow you down and reconnect you with what truly matters.",
  //   },
  //   {
  //     id: 5,
  //     name: "Mohamed Ahmed",
  //     job: "CEO for form company",
  //     image: image,
  //     feedback:
  //       "At FORM, we believe coffee is more than a drink — it’s a daily ritual crafted to slow you down and reconnect you with what truly matters.",
  //   },
  // ];

  return (
    <section className="sectionPadding">
      <div className="container">
        <SectionTitle title={testimonials?.title} />

        <p className="text-muted-foreground text-sm mb-4">
          {testimonials?.description}
        </p>

        <MainSlider
          data={testimonials?.items || []}
          renderItem={(testimonial) => (
            <TestimonialCard testimonial={testimonial} />
          )}
        />
      </div>
    </section>
  );
};

export default WhatTheySay;

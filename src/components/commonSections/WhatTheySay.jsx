import SectionTitle from "@/components/common/SectionTitle";
import TestimonialCard from "@/components/cards/TestimonialCard";
import MainSlider from "./MainSlider";
import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/api/homeServices";
import WhatTheySaySkeleton from "../Loading/SkeletonLoading/WhatTheySaySkeleton";

const WhatTheySay = () => {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  if (isLoading) return <WhatTheySaySkeleton />;

  if (!testimonials || testimonials?.items?.length === 0) return null;

  return (
    <section className="sectionPadding">
      <div className="container">
        <SectionTitle title={testimonials?.title} />

        <p className="text-muted-foreground font-semibold mb-6 -mt-4 max-w-4xl">
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

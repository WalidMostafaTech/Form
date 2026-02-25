import PageBanner from "@/components/commonSections/PageBanner";
import image from "@/assets/images/bg-img.jpg";

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

      <div
        className="container pagePadding"
        dangerouslySetInnerHTML={{
          __html:
            "We started our journey in 2010 with a vision to revolutionize the industry. Our team is dedicated to delivering high-quality products that meet the needs of our customers.",
        }}
      />
    </main>
  );
};

export default About;

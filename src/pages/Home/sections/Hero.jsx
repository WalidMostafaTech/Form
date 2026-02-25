import bgImg from "@/assets/images/bg-img.jpg";

const Hero = () => {
  return (
    <section
      className="h-[90dvh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    ></section>
  );
};

export default Hero;

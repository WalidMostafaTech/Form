import { Button } from "@/components/ui/button";
import bgImage from "@/assets/images/bg-img.jpg";
import { useNavigate } from "react-router";

const KnowMore = () => {
  const navigate = useNavigate();
  return (
    <section
      className="sectionPadding bg-center bg-cover relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-primary/80" />

      <div className="w-full max-w-3xl p-4 mx-auto relative z-10 flex flex-col items-center text-center gap-6 text-white">
        <h2 className="text-2xl md:text-4xl font-bold">
          TO KNOW MORE ABOUT US
        </h2>

        <p className="text-muted/80 text-sm">
          We honor the journey from soil to sip, ensuring every bean carries the
          richness of its origin and the care of expert roasting. Our coffee is
          designed for those who appreciate subtle notes, smooth finishes, and
          the quiet luxury of a perfectly brewed cup.
        </p>

        <Button
          onClick={() => navigate("/contact")}
          variant="outline"
          className={"rounded-full font-bold min-w-38"}
        >
          Call Us
        </Button>
      </div>
    </section>
  );
};

export default KnowMore;

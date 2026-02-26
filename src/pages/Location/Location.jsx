import bgImage from "@/assets/images/bg-img.jpg";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";

const Location = () => {
  return (
    <main
      className="sectionPadding bg-center bg-cover relative h-dvh"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-primary/60" />

      <div className="w-full p-4 max-w-2xl mx-auto text-center h-full flex flex-col items-center justify-center gap-6 relative z-10 text-white">
        <p className="text-xs tracking-widest uppercase">our Cafe</p>
        <img src={logo} alt="logo" />
        <p>
          We honor the journey from soil to sip, ensuring every bean carries the
          richness of its origin and the care of expert roasting.We honor the
          journey from soil to sip, ensuring every bean carries the richness of
          its origin and the care of expert roasting.
        </p>
        <Button variant="outline" className={"min-w-32"}>Visit</Button>
      </div>
    </main>
  );
};

export default Location;

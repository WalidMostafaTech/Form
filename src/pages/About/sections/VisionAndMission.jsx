import SectionTitle from "@/components/common/SectionTitle";
import { FiEye } from "react-icons/fi";
import { GiCoffeeBeans } from "react-icons/gi";

const VisionAndMission = () => {
  const list = [
    {
      id: 1,
      title: "Vision",
      description:
        "To redefine the everyday coffee ritual by creating refined, natural, and memorable experiences in every cup.At FORM, we envision a world where coffee is not rushed, but appreciated — where every brew reflects craftsmanship, balance, and quiet luxury.",
      icon: <FiEye />,
    },
    {
      id: 2,
      title: "Mission",
      description:
        "To source exceptional beans, roast with precision, and deliver a seamless coffee experience that blends tradition with modern refinement.We are committed to quality, sustainability, and thoughtful design — ensuring that every detail, from origin to packaging.",
      icon: <GiCoffeeBeans />,
    },
  ];

  return (
    <section className="sectionPadding">
      <div className="container">
        <SectionTitle title="Vision & Mission" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-8">
          {list.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border  
            flex flex-col items-center text-center md:text-start md:items-start gap-4"
            >
              <div
                className="text-3xl text-primary bg-primary-foreground w-14 h-14 
              flex items-center justify-center rounded-full"
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold">{item.title}</h3>

              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionAndMission;

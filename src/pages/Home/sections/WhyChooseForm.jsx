import bgImage from "@/assets/images/bg-img.jpg";
import { BiSupport } from "react-icons/bi";

const WhyChooseForm = () => {
  const list = [
    {
      id: 1,
      title: "Expert Support",
      description:
        "Professional baristas ready to help you choose the right blend.",
      icon: <BiSupport />,
    },
    {
      id: 2,
      title: "Expert Support",
      description:
        "Professional baristas ready to help you choose the right blend.",
      icon: <BiSupport />,
    },
    {
      id: 3,
      title: "Expert Support",
      description:
        "Professional baristas ready to help you choose the right blend.",
      icon: <BiSupport />,
    },
    {
      id: 4,
      title: "Expert Support",
      description:
        "Professional baristas ready to help you choose the right blend.",
      icon: <BiSupport />,
    },
  ];
  return (
    <section
      className="sectionPadding bg-center bg-cover relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-primary/80" />

      <div className="container relative z-10">
        <hgroup className="text-center mb-12  max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose <span className="text-secondary">Form</span>?
          </h2>

          <p className="text-muted/80 text-sm">
            Excellence in every single detail.
          </p>
        </hgroup>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {list.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-secondary text-3xl">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-muted/80">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseForm;

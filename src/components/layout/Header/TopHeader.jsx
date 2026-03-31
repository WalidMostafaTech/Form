import { getStrips } from "@/api/mainServices";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

const TopHeader = () => {
  const { lang } = useSelector((state) => state.language);

  const { data: strips, isLoading } = useQuery({
    queryKey: ["strips"],
    queryFn: getStrips,
  });

  if (isLoading) return <div className="bg-black text-white h-7" />;

  if (!strips || !strips?.length)
    return <div className="bg-black text-white h-7" />;

  return (
    <div className="bg-black text-white py-1 overflow-hidden relative">
      {/* shadow left */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-linear-to-r from-black to-transparent z-10" />

      {/* shadow right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-black to-transparent z-10" />

      <Marquee
        pauseOnHover
        speed={50}
        gradient={false}
        direction={lang === "ar" ? "right" : "left"}
        style={{ direction: "ltr" }}
      >
        {strips.map((item) => (
          <span key={item.id} className="mx-10 text-sm">
            {item.title}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default TopHeader;

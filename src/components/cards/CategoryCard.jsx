import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const CategoryCard = ({ category }) => {
  const { t } = useTranslation();

  return (
    <div
      key={category.id}
      className="relative w-full h-110 lg:h-120 rounded-3xl overflow-hidden group cursor-pointer bg-cover bg-center"
      style={{ backgroundImage: `url(${category.image})` }}
    >
      {/* Overlay */}
      <div
        className="absolute h-[200%] top-0 left-0 w-full 
                transition-all duration-500 group-hover:translate-y-[-50%]"
        style={{
          background:
            "linear-gradient(0deg,var(--primary) 50%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0 z-10 h-full flex flex-col justify-end p-6 text-white
        transition-all duration-500 group-hover:-translate-y-6"
      >
        <h3 className="text-2xl lg:text-3xl font-extrabold mb-2">
          {category.name}
        </h3>

        <p
          className="text-sm opacity-90 max-h-30 transition-all duration-500 
        group-hover:opacity-0 group-hover:max-h-0 mb-2 group-hover:mb-0"
        >
          {category.first_description}
        </p>

        <p
          className="text-sm opacity-0 max-h-0 overflow-hidden transition-all duration-500 
        group-hover:opacity-100 group-hover:max-h-40 group-hover:mb-2"
        >
          {category.second_description}
        </p>

        <Link
          to={`/shop?category=${category.id}`}
          className="inline-block w-max border-b-2 border-secondary text-sm tracking-wide line-clamp-10 hover:opacity-85 transition-all duration-500
                    group-hover:bg-white group-hover:text-primary group-hover:font-bold group-hover:border-transparent group-hover:px-2 group-hover:py-1 group-hover:rounded"
        >
          {t("exploreCollection")}
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;

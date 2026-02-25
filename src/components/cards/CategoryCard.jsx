import { Link } from "react-router";

const CategoryCard = ({ category }) => {
  return (
    <div
      key={category.id}
      className="relative h-[400px] rounded-xl overflow-hidden group cursor-pointer bg-cover bg-center"
      style={{ backgroundImage: `url(${category.image})` }}
    >
      {/* Overlay */}
      <div
        className="absolute h-[200%] top-0 left-0 w-full bg-linear-to-t from-primary via-primary/60 to-transparent 
                transition-all duration-500 group-hover:translate-y-[-50%]"
      />

      {/* Content */}
      <div
        className="absolute inset-0 z-10 h-full flex flex-col justify-end p-6 text-white
                transition-all duration-500 group-hover:-translate-y-6"
      >
        <h3 className="text-2xl font-bold mb-2">{category.title}</h3>

        {/* Short Description */}
        <p className="text-sm opacity-90 max-h-10 transition-all duration-500 group-hover:opacity-0 group-hover:max-h-0">
          {category.short_description}
        </p>

        {/* Long Description */}
        <p className="text-sm opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-40 my-2">
          {category.long_description}
        </p>

        <Link
          to={`/products/${category.id}`}
          className="inline-block w-max border-b-2 border-secondary text-sm tracking-wide hover:opacity-80 transition-all duration-500
                    group-hover:bg-white group-hover:text-primary group-hover:border-transparent group-hover:px-2 group-hover:py-1 group-hover:rounded"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;

import { NavLink } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

const GamesNav = ({ links, game = null, isLoading }) => {
  return (
    <nav className="bg-input">
      <div className="container py-2 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 overflow-hidden rounded">
              <Skeleton className="w-full h-full" />
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
        ) : (
          game && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 overflow-hidden rounded">
                <img
                  loading="lazy"
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-bold capitalize">{game.name}</h2>
            </div>
          )
        )}

        <ul className="flex flex-wrap items-center justify-center gap-4 py-2">
          {links.map((item) => (
            <li key={item.id}>
              <NavLink to={item.link} className={`services_nav_links`}>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default GamesNav;

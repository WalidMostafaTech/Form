import { NavLink, Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import useNavigationLinks from "@/hooks/useNavigationLinks";

const NavBar = () => {
  const links = useNavigationLinks();

  return (
    <nav className="hidden lg:flex items-center justify-between gap-6 flex-1 px-16">
      {links.map((link) => {
        // لو مفيش items
        if (!link.items || link.items.length === 0) {
          return (
            <NavLink key={link.name} to={link.href} className="nav_link">
              {link.name}
            </NavLink>
          );
        }

        // لو فيه items
        return (
          <DropdownMenu key={link.name} modal={false}>
            <DropdownMenuTrigger className="nav_link flex items-center gap-1 outline-none">
              {link.name}
              <ChevronDown size={16} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-48 bg-primary text-white border-primary"
            >
              {link.items.map((item) => (
                <DropdownMenuItem asChild key={item.name}>
                  <Link to={item.href} className="w-full">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </nav>
  );
};

export default NavBar;

import logo from "@/assets/images/logo.png";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import HeaderActions from "./HeaderActions/HeaderActions";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  let wholesaleLink = null;

  if (!user) {
    wholesaleLink = {
      name: "Wholesale",
      href: "/register/company",
      items: [],
    };
  } else if (user.user_type === "company") {
    wholesaleLink = {
      name: "Wholesale",
      href: "/wholesale",
      items: [],
    };
  }

  const links = [
    { name: "Home", href: "/", items: [] },
    { name: "About", href: "/about", items: [] },
    {
      name: "Shop",
      href: "/shop",
      items: [
        { name: "All", href: "/shop" },
        { name: "Coffee Menu", href: "/shop?category=coffee-menu" },
        { name: "Coffee Beans", href: "/shop?category=coffee-beans" },
        { name: "Accessories", href: "/shop?category=accessories" },
      ],
    },

    ...(wholesaleLink ? [wholesaleLink] : []),

    { name: "Location", href: "/location", items: [] },
    { name: "Contact Us", href: "/contact", items: [] },
  ];

  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const coloredPages = ["/login", "/verify-email", "/forgot-password"];
  const isProfilePage = location.pathname.startsWith("/profile");
  const isRegisterPage = location.pathname.startsWith("/register");

  const isColoredPage =
    coloredPages.includes(location.pathname) || isProfilePage || isRegisterPage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 py-4 z-50 transition-all duration-500 ${
        scrolled || isColoredPage
          ? "bg-primary/90 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="w-22">
          <img src={logo} alt="Company Logo" className="w-full" />
        </Link>

        <NavBar links={links} />
        <MobileNav
          links={links}
          open={mobileNavOpen}
          setOpen={setMobileNavOpen}
        />

        <HeaderActions setMobileNavOpen={setMobileNavOpen} />
      </div>
    </header>
  );
};

export default Header;

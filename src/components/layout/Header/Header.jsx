import logo from "@/assets/images/logo.png";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import HeaderActions from "./HeaderActions/HeaderActions";
import { useSelector } from "react-redux";

const Header = () => {
  const { settings } = useSelector((state) => state.settings);

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
      }
        hover:bg-primary/90 hover:backdrop-blur-sm hover:shadow-lg
      `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="w-28">
          <img
            loading="lazy"
            src={settings?.header_logo || logo}
            alt="Company Logo"
            className="w-full h-full object-contain"
          />
        </Link>

        <NavBar />

        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;

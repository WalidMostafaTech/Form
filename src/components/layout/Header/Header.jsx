import logo from "@/assets/images/logo.png";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import HeaderActions from "./HeaderActions/HeaderActions";
import { useSelector } from "react-redux";
import TopHeader from "./TopHeader";

const Header = () => {
  const { settings } = useSelector((state) => state.settings);

  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const coloredPages = ["/login", "/verify-email", "/forgot-password"];
  const isProfilePage = location.pathname.startsWith("/profile");
  const isRegisterPage = location.pathname.startsWith("/register");
  const isSitePages = location.pathname.startsWith("/pages");
  const isPaymentPage = location.pathname.startsWith("/payment");
  const isProductPage = location.pathname.startsWith("/product");

  const isColoredPage =
    coloredPages.includes(location.pathname) ||
    isProfilePage ||
    isRegisterPage ||
    isSitePages ||
    isPaymentPage;

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
    <header className={`fixed top-0 left-0 right-0 z-50`}>
      <TopHeader />

      <div
        className={`py-4 transition-all duration-500 ${
          (scrolled && !isProductPage) || isColoredPage
            ? "bg-primary/90 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }
        hover:bg-primary/90 hover:backdrop-blur-sm hover:shadow-lg
      `}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="w-30 md:w-38">
            <img
              loading="lazy"
              src={settings?.header_logo || logo}
              alt="Company Logo"
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <NavBar />

          <HeaderActions />
        </div>
      </div>
    </header>
  );
};

export default Header;

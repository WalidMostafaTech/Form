import logo from "@/assets/images/logo.png";
import { Link } from "react-router";
import { SlHandbag } from "react-icons/sl";
import LanguageSwitcher from "./LanguageSwitcher";
import { useEffect, useState } from "react";

const Header = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shope", href: "/shop" },
    { name: "Wholesale", href: "/wholesale" },
    { name: "Location", href: "/location" },
    { name: "Contact Us", href: "/contact" },
  ];

  const [scrolled, setScrolled] = useState(false);

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
        scrolled
          ? // ? "bg-linear-to-b from-primary via-primary/60 to-primary/10"
            "bg-primary/80 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="w-22">
          <img src={logo} alt="Company Logo" className="w-full" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm text-white hover:text-secondary transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to="/login"
            className="bg-white px-4 py-1 rounded-md text-primary 
            hover:text-white hover:bg-primary transition-all duration-300"
          >
            Login
          </Link>

          <LanguageSwitcher />

          <Link
            to="/cart"
            className="text-white text-xl hover:text-secondary transition-colors duration-300 cursor-pointer"
          >
            <SlHandbag />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

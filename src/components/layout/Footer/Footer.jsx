import React from "react";
import bgImage from "@/assets/images/bg-img.jpg";
import logo from "@/assets/images/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shope", href: "/shop" },
    { name: "Wholesale", href: "/wholesale" },
    { name: "Location", href: "/location" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <FaFacebookF />, url: "/" },
    { name: "Twitter", icon: <FaTwitter />, url: "/" },
    { name: "Instagram", icon: <FaInstagram />, url: "/" },
    { name: "LinkedIn", icon: <FaLinkedinIn />, url: "/" },
  ];

  return (
    <footer
      className="sectionPadding bg-center bg-cover relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-primary/90" />

      <div className="container relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <img src={logo} alt="Company Logo" className="w-32" />
          <p className="text-xs">
            We are a leading company in providing top-notch services to our
            clients. Our mission is to deliver excellence and exceed
            expectations.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-lg font-semibold uppercase">Links</h3>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-sm text-muted hover:text-secondary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-lg font-semibold uppercase">Social Media</h3>
          <div className="grid grid-cols-4 gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                className="hover:text-secondary transition-colors p-1 border rounded"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

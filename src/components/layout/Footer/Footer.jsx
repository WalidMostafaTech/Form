import React from "react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/images/logo.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaTelegramPlane,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io5";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getFooter } from "@/api/mainServices";
import FooterSkeleton from "@/components/Loading/SkeletonLoading/FooterSkeleton";
import useNavigationLinks from "@/hooks/useNavigationLinks";

const Footer = () => {
  const { t } = useTranslation();

  const { data: footerData, isLoading } = useQuery({
    queryKey: ["footer"],
    queryFn: getFooter,
  });

  const links = useNavigationLinks();

  if (isLoading) return <FooterSkeleton />;

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: footerData?.facebook || "/",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: footerData?.linkedin || "/",
    },
    { name: "Twitter", icon: <FaXTwitter />, url: footerData?.x || "/" },
    { name: "Youtube", icon: <FaYoutube />, url: footerData?.youtube || "/" },
    {
      name: "Instagram",
      icon: <RiInstagramFill />,
      url: footerData?.instagram || "/",
    },
    { name: "Tiktok", icon: <FaTiktok />, url: footerData?.tiktok || "/" },
    {
      name: "Telegram",
      icon: <FaTelegramPlane />,
      url: footerData?.telegram || "/",
    },
    {
      name: "Whatsapp",
      icon: <IoLogoWhatsapp />,
      url: footerData?.whatsapp || "/",
    },
  ];

  return (
    <footer
      className="sectionPadding bg-center bg-cover relative"
      style={{ backgroundImage: `url(${footerData?.footer_image})` }}
    >
      <div className="absolute inset-0 bg-primary/90" />

      <div className="container relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-36 overflow-hidden">
            <img
              loading="lazy"
              src={footerData?.footer_logo || logo}
              alt={t("Footer.companyLogo")}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-xs">{footerData?.footer_text}</p>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-lg font-semibold uppercase">
            {t("Footer.links")}
          </h3>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.name} title={link.name}>
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
          <h3 className="text-lg font-semibold uppercase">
            {t("Footer.socialMedia")}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                className="hover:text-secondary hover:border-secondary transition-colors p-1 border rounded"
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

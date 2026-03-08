import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const useNavigationLinks = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.categories);

  let wholesaleLink = null;

  if (!user) {
    wholesaleLink = {
      name: t("NavigationLinks.wholesale"),
      href: "/register/company",
      items: [],
    };
  } else if (user.type === "company") {
    wholesaleLink = {
      name: t("NavigationLinks.wholesale"),
      href: "/wholesale",
      items: [],
    };
  }

  const links = [
    { name: t("NavigationLinks.home"), href: "/", items: [] },
    { name: t("NavigationLinks.about"), href: "/about", items: [] },
    {
      name: t("NavigationLinks.shop"),
      href: "/shop",
      items:
        categories?.map((c) => ({
          name: c.name, // لو عندك ترجمة للفئات، ممكن تحل هنا
          href: `/shop?category=${c.id}`,
        })) || [],
    },
    ...(wholesaleLink ? [wholesaleLink] : []),
    { name: t("NavigationLinks.location"), href: "/location", items: [] },
    { name: t("NavigationLinks.contact"), href: "/contact", items: [] },
  ];

  return links;
};

export default useNavigationLinks;

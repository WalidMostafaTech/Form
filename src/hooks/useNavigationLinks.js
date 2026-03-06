import { useSelector } from "react-redux";

const useNavigationLinks = () => {
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.categories);

  let wholesaleLink = null;

  if (!user) {
    wholesaleLink = {
      name: "Wholesale",
      href: "/register/company",
      items: [],
    };
  } else if (user.type === "company") {
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
      items:
        categories?.map((c) => ({
          name: c.name,
          href: `/shop?category=${c.id}`,
        })) || [],
    },
    ...(wholesaleLink ? [wholesaleLink] : []),
    { name: "Location", href: "/location", items: [] },
    { name: "Contact Us", href: "/contact", items: [] },
  ];

  return links;
};

export default useNavigationLinks;

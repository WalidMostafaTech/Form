import { Link } from "react-router";
import logo from "@/assets/images/logo.png";
import HeaderActions from "./HeaderActions/HeaderActions";
import { useSelector } from "react-redux";

const Header = () => {
  const { setting } = useSelector((state) => state.setting);

  return (
    <header className="border-b py-4 sticky top-0 z-50 bg-background">
      <div className="container flex items-center justify-between gap-2">
        <Link to={"/"} className="w-20 h-12 sm:w-24 overflow-hidden">
          <img
            loading="lazy"
            src={setting?.header_logo || logo}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </Link>

        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;

import LanguageSwitcher from "./LanguageSwitcher";
import { useSelector } from "react-redux";
import ProfileSide from "./ProfileSide";
import { Link } from "react-router";
import { SlHandbag } from "react-icons/sl";
import { FaRegBell } from "react-icons/fa";

const HeaderActions = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Link
        to="/login"
        className="bg-white px-4 py-1 rounded-md text-primary 
            hover:text-white hover:bg-primary transition-all duration-300"
      >
        Login
      </Link>

      <LanguageSwitcher />

      <ProfileSide />

      <Link to="/cart">
        <SlHandbag className="text-white text-xl hover:text-secondary transition-colors duration-300 cursor-pointer" />
      </Link>

      <div>
        <FaRegBell className="text-white text-xl hover:text-secondary transition-colors duration-300 cursor-pointer" />
      </div>
    </div>
  );
};

export default HeaderActions;

import LanguageSwitcher from "./LanguageSwitcher";
import { useSelector } from "react-redux";
import ProfileSide from "./ProfileSide";
import { Link } from "react-router";
import { SlHandbag } from "react-icons/sl";
import { FaRegBell } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
// import NotificationsPopUp from "./NotificationsPopUp";

const HeaderActions = ({ setMobileNavOpen }) => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {user && (
        <>
          <Link to="/cart">
            <SlHandbag className="header_icon" />
          </Link>

          <div>
            <FaRegBell className="header_icon" />
          </div>

          {/* <NotificationsPopUp /> */}
        </>
      )}

      <LanguageSwitcher />

      <ProfileSide user={user} loading={loading} />

      <HiMenuAlt3
        className="header_icon lg:hidden"
        onClick={() => setMobileNavOpen(true)}
      />
    </div>
  );
};

export default HeaderActions;
